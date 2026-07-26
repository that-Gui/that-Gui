```
 ████████╗██╗  ██╗ █████╗ ████████╗ ██████╗ ██╗   ██╗██╗
 ╚══██╔══╝██║  ██║██╔══██╗╚══██╔══╝██╔════╝ ██║   ██║██║
    ██║   ███████║███████║   ██║   ██║  ███╗██║   ██║██║
    ██║   ██╔══██║██╔══██║   ██║   ██║   ██║██║   ██║██║
    ██║   ██║  ██║██║  ██║   ██║   ╚██████╔╝╚██████╔╝██║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝
```

<!--
  ponytail: this card is hand-written on purpose.
  Numbers measured 2026-07-26 from the GitHub API across owned, non-fork repos
  (534,946 bytes total). The mix moves about a percent a year, so regenerating
  it nightly would be machinery in service of nothing. Re-run this when it
  starts to feel wrong:

    gh api graphql -f query='{ user(login:"that-Gui") { repositories(first:100,
      ownerAffiliations:OWNER, isFork:false) { nodes { languages(first:15,
      orderBy:{field:SIZE,direction:DESC}) { edges { size node { name } } } } } } }' \
      --jq '.data.user.repositories.nodes[].languages.edges[] | "\(.node.name)\t\(.size)"' \
      | awk -F'\t' '{s[$1]+=$2; t+=$2} END {for (l in s) printf "%-12s %5.1f%%\n", l, 100*s[l]/t}'
-->

```
thatgui
──────────────────────────────────────────────────────
OS ........ macOS · zsh · nvim when nobody is watching
Uptime .... 5 yrs, 4 mos (booted 21 Mar 2021)
Repos ..... 24 owned · 55 public · 0 finished
Code ...... 535 KB, a worrying amount of it CSS
Langs ..... TypeScript  ████████░░░░░░░░░░░░  40%
            JavaScript  █████░░░░░░░░░░░░░░░  27%
            HTML + CSS  █████░░░░░░░░░░░░░░░  23%
            Swift       ██░░░░░░░░░░░░░░░░░░  10%
Origin .... HTML → JavaScript → shipping things
Now ....... an ETL that argues with Google Sheets,
            and an iOS app nobody has seen yet
Coffee .... yes
```

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![Swift](https://img.shields.io/badge/Swift-F05138?style=flat-square&logo=swift&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonwebservices&logoColor=white)

### the snake eats my commits

![snake](https://raw.githubusercontent.com/that-Gui/that-Gui/output/github-snake-dark.svg)

### the charts, such as they are

<!-- ponytail: generated into this repo by the nightly Action, so it renders even when
     the free stats hosts are rate-limiting. The two below are remote URLs and are not. -->
![metrics](./github-metrics.svg)

![activity](https://github-readme-activity-graph.vercel.app/graph?username=that-Gui&bg_color=00000000&color=8b949e&line=3178c6&point=8b949e&area=true&hide_border=true)

![streak](https://streak-stats.demolab.com/?user=that-Gui&background=00000000&hide_border=true&ring=3178C6&fire=3178C6&currStreakLabel=8B949E&sideLabels=8B949E&dates=8B949E)

---

<sub>`0 finished` is a joke. Mostly. Say hi if you want to change that.</sub>
