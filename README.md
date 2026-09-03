<!--
  ponytail: this card is hand-written on purpose.
  Numbers measured 2026-08-04 from the GitHub API across owned, non-fork repos
  (275,789 bytes total). The mix moves about a percent a year, so regenerating
  it nightly would be machinery in service of nothing. Re-run this when it
  starts to feel wrong:

    gh api graphql -f query='{ user(login:"that-Gui") { repositories(first:100,
      ownerAffiliations:OWNER, isFork:false) { nodes { languages(first:15,
      orderBy:{field:SIZE,direction:DESC}) { edges { size node { name } } } } } } }' \
      --jq '.data.user.repositories.nodes[].languages.edges[] | "\(.node.name)\t\(.size)"' \
      | awk -F'\t' '{s[$1]+=$2; t+=$2} END {for (l in s) printf "%-12s %5.1f%%\n", l, 100*s[l]/t}'
-->

```
 ████████╗██╗  ██╗ █████╗ ████████╗ ██████╗ ██╗   ██╗██╗
 ╚══██╔══╝██║  ██║██╔══██╗╚══██╔══╝██╔════╝ ██║   ██║██║
    ██║   ███████║███████║   ██║   ██║  ███╗██║   ██║██║
    ██║   ██╔══██║██╔══██║   ██║   ██║   ██║██║   ██║██║
    ██║   ██║  ██║██║  ██║   ██║   ╚██████╔╝╚██████╔╝██║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝
 ───────────────────────────────────────────────────────
 OS ........ macOS · zsh · nvim when nobody is watching
 Uptime .... 5 yrs, 4 mos (booted 21 Mar 2021)
 Repos ..... 13 owned · 12 public · 0 finished
 Code ...... 269 KB, a worrying amount of it Swift
 Langs ..... TypeScript  ████████░░░░░░░░░░░░  38%
             JavaScript  ██████░░░░░░░░░░░░░░  29%
             Swift       ████░░░░░░░░░░░░░░░░  20%
             HTML + CSS  ██░░░░░░░░░░░░░░░░░░  12%
 Origin .... HTML → JavaScript → shipping things
 Now ....... automating vulnerability triage so the
             boring 90% never reaches a human
 Coffee .... yes
```

<!-- ponytail: C# and AWS render text-only — simple-icons dropped both logos, so
     every csharp/amazon*/aws slug on shields returns a badge with no icon. -->
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=flat-square)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![Swift](https://img.shields.io/badge/Swift-F05138?style=flat-square&logo=swift&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-844FBA?style=flat-square&logo=terraform&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/that-Gui/that-Gui/output/github-snake-dark.svg">
  <img alt="a snake eating my contribution graph" src="https://raw.githubusercontent.com/that-Gui/that-Gui/output/github-snake.svg">
</picture>

### the charts, such as they are

<!-- ponytail: this block is rewritten nightly by scripts/stats.ts. streak-stats
     documents hide_longest_streak but no public instance honours it, so the two
     numbers are scraped and rendered as badges instead of using that card.
     These URLs are static on purpose: routing them through shields dynamic/json
     meant camo cached an INACCESSIBLE badge every time demolab was slow. -->
<!--stats-->
![total contributions](https://img.shields.io/badge/total_contributions-902-3178C6?style=for-the-badge&labelColor=0d1117)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![current streak](https://img.shields.io/badge/current_streak-0_days-F05138?style=for-the-badge&labelColor=0d1117)
<!--/stats-->

![activity](https://github-readme-activity-graph.vercel.app/graph?username=that-Gui&bg_color=00000000&color=8b949e&line=3178c6&point=8b949e&area=true&hide_border=true)
