#!/usr/bin/env python3
"""Rewrite the stats badges in README.md from the public contribution calendar.

ponytail: this exists because streak-stats.demolab.com documents
hide_longest_streak but no public instance actually honours it, so there is no
URL that renders total-contributions + current-streak alone. Scraping the same
public page streak-stats scrapes needs no token and no service.

Run `python3 scripts/stats.py --test` for the self-check.
"""

import datetime as dt
import re
import sys
import urllib.request

USER = "that-Gui"
JOINED = 2021
README = "README.md"
UA = {"User-Agent": "that-Gui-profile-stats"}


def fetch_year(user, year):
    """Return (year_total, {date: level}) from the public contributions page."""
    url = f"https://github.com/users/{user}/contributions?from={year}-01-01&to={year}-12-31"
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        html = r.read().decode()
    total = re.search(r"([\d,]+)\s+contributions\s+in\s+" + str(year), html)
    days = {d: int(lv) for d, lv in re.findall(r'data-date="([\d-]+)"[^>]*data-level="(\d)"', html)}
    return (int(total.group(1).replace(",", "")) if total else 0), days


def current_streak(days, today):
    """Consecutive days with activity ending today, or yesterday if today is idle.

    Today counts as a grace day: an unfinished day should not read as a broken
    streak at 09:00.
    """
    cursor = today if days.get(today.isoformat(), 0) > 0 else today - dt.timedelta(days=1)
    streak = 0
    while days.get(cursor.isoformat(), 0) > 0:
        streak += 1
        cursor -= dt.timedelta(days=1)
    return streak


def badges(total, streak):
    days = "day" if streak == 1 else "days"
    return (
        f"![total contributions](https://img.shields.io/badge/total_contributions-{total:,}-3178C6"
        "?style=for-the-badge&labelColor=0d1117)\n"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n"
        f"![current streak](https://img.shields.io/badge/current_streak-{streak}_{days}-F05138"
        "?style=for-the-badge&labelColor=0d1117)"
    ).replace(",", "%2C")


def test():
    d = lambda s: s  # noqa: E731 - dates are plain ISO strings here
    today = dt.date(2026, 7, 26)
    live = {d("2026-07-26"): 3, d("2026-07-25"): 1, d("2026-07-24"): 2}
    assert current_streak(live, today) == 3, "counts back through active days"

    idle_today = {d("2026-07-25"): 1, d("2026-07-24"): 2}
    assert current_streak(idle_today, today) == 2, "today idle is a grace day, not a break"

    broken = {d("2026-07-24"): 5}
    assert current_streak(broken, today) == 0, "a gap at yesterday ends the streak"

    assert current_streak({}, today) == 0, "no data is not a streak"
    assert "1_day" in badges(1, 1) and "2_days" in badges(2, 2), "singular vs plural"
    assert "1%2C234" in badges(1234, 0), "thousands separator survives the URL"
    print("ok")


def main():
    today = dt.datetime.now(dt.timezone.utc).date()
    total, days = 0, {}
    for year in range(JOINED, today.year + 1):
        year_total, year_days = fetch_year(USER, year)
        total += year_total
        days.update(year_days)

    block = f"<!--stats-->\n{badges(total, current_streak(days, today))}\n<!--/stats-->"
    readme = open(README).read()
    updated = re.sub(r"<!--stats-->.*?<!--/stats-->", lambda _: block, readme, flags=re.S)
    if updated == readme:
        print("no change")
        return
    open(README, "w").write(updated)
    print(f"total={total} streak={current_streak(days, today)}")


if __name__ == "__main__":
    test() if "--test" in sys.argv else main()
