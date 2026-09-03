import { strict as assert } from "node:assert";
import { readFileSync, writeFileSync } from "node:fs";

const USER = "that-Gui";
const JOINED = 2021;
const README = "README.md";

type Days = Record<string, number>;

const iso = (d: Date) => d.toISOString().slice(0, 10);
const shift = (d: Date, days: number) => new Date(d.getTime() + days * 86_400_000);

export function parseCalendar(html: string): Days {
  const counts = new Map(
    [...html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>(?:<[^>]*>)*\s*(No|[\d,]+) contribution/g)]
      .map((m) => [m[1], m[2]]),
  );
  const days: Days = {};
  for (const [, date, id] of html.matchAll(/data-date="([\d-]+)"\s+id="(contribution-day-component-[\d-]+)"/g)) {
    const n = counts.get(id);
    days[date] = !n || n === "No" ? 0 : Number(n.replace(/,/g, ""));
  }
  return days;
}

async function fetchYear(user: string, year: number): Promise<Days> {
  const url = `https://github.com/users/${user}/contributions?from=${year}-01-01&to=${year}-12-31`;
  const res = await fetch(url, { headers: { "User-Agent": "that-Gui-profile-stats" } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return parseCalendar(await res.text());
}

export function currentStreak(days: Days, today: Date): number {
  let cursor = days[iso(today)] > 0 ? today : shift(today, -1);
  let streak = 0;
  while (days[iso(cursor)] > 0) {
    streak++;
    cursor = shift(cursor, -1);
  }
  return streak;
}

export function badges(total: number, streak: number): string {
  const unit = streak === 1 ? "day" : "days";
  return [
    `![total contributions](https://img.shields.io/badge/total_contributions-${total.toLocaleString("en-US")}-3178C6?style=for-the-badge&labelColor=0d1117)`,
    "&nbsp;".repeat(8),
    `![current streak](https://img.shields.io/badge/current_streak-${streak}_${unit}-F05138?style=for-the-badge&labelColor=0d1117)`,
  ].join("\n").replace(/,/g, "%2C");
}

function test() {
  const today = new Date("2026-07-26T00:00:00Z");

  const live = { "2026-07-26": 3, "2026-07-25": 1, "2026-07-24": 2 };
  assert.equal(currentStreak(live, today), 3, "counts back through active days");

  const idleToday = { "2026-07-25": 1, "2026-07-24": 2 };
  assert.equal(currentStreak(idleToday, today), 2, "today idle is a grace day, not a break");

  assert.equal(currentStreak({ "2026-07-24": 5 }, today), 0, "a gap at yesterday ends the streak");
  assert.equal(currentStreak({}, today), 0, "no data is not a streak");

  assert.ok(badges(1, 1).includes("1_day"), "singular");
  assert.ok(badges(2, 2).includes("2_days"), "plural");
  assert.ok(badges(1234, 0).includes("1%2C234"), "thousands separator survives the URL");

  // the parse the python version got wrong: counts live in the tooltip, not the cell
  const html = `
    <td data-date="2024-08-13" id="contribution-day-component-2-32" data-level="1"></td>
    <td data-date="2024-08-14" id="contribution-day-component-2-33" data-level="0"></td>
    <td data-date="2024-08-15" id="contribution-day-component-2-34" data-level="4"></td>
    <tool-tip for="contribution-day-component-2-32" data-type="label">1 contribution on August 13th.</tool-tip>
    <tool-tip for="contribution-day-component-2-33" data-type="label">No contributions on August 14th.</tool-tip>
    <tool-tip for="contribution-day-component-2-34" data-type="label">1,024 contributions on August 15th.</tool-tip>`;
  assert.deepEqual(
    parseCalendar(html),
    { "2024-08-13": 1, "2024-08-14": 0, "2024-08-15": 1024 },
    "tooltip counts join to cells by id",
  );

  console.log("ok");
}

async function main() {
  const today = new Date();
  const days: Days = {};
  for (let year = JOINED; year <= today.getUTCFullYear(); year++) {
    Object.assign(days, await fetchYear(USER, year));
  }

  const total = Object.values(days).reduce((a, b) => a + b, 0);
  const streak = currentStreak(days, today);
  if (total === 0) throw new Error("parsed 0 contributions - the calendar markup moved again");

  const readme = readFileSync(README, "utf8");
  const block = `<!--stats-->\n${badges(total, streak)}\n<!--/stats-->`;
  const updated = readme.replace(/<!--stats-->[\s\S]*?<!--\/stats-->/, () => block);
  if (updated === readme) {
    console.log("no change");
    return;
  }
  writeFileSync(README, updated);
  console.log(`total=${total} streak=${streak}`);
}

if (process.argv.includes("--test")) test();
else main();
