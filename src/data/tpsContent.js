export const TPS_NAV = [
  { id: "rankings", label: "RANKINGS⌄" },
  { id: "methodology", label: "METHODOLOGY" },
  { id: "about", label: "ABOUT" },
  { id: "responsible", label: "RESPONSIBLE GAMING" },
];

export const TPS_STATS = [
  { value: "18,429", label: "Player Votes", note: "Demo Data" },
  { value: "10", label: "Platforms", note: "Demo Data" },
  { value: "Monthly", label: "Ranking Update", note: "Concept" },
];

export const TPS_RANKINGS = [
  {
    rank: "01",
    title: "HOT INDEX",
    desc: "What players are choosing right now.",
    image: "/assets/image/tps/rank-hot-index.jpg",
    alt: "Hot Index casino visual",
  },
  {
    rank: "02",
    title: "PAYOUT EXPERIENCE",
    desc: "Rated by players based on their payout experience.",
    image: "/assets/image/tps/rank-payout.jpg",
    alt: "Payout Experience visual",
  },
  {
    rank: "03",
    title: "TPS OVERALL",
    desc: "The overall player choice across all factors.",
    image: "/assets/image/tps/rank-overall.jpg",
    alt: "TPS Overall casino visual",
  },
];

export const TPS_FEATURE = {
  monthLabel: "THIS MONTH'S",
  monthRank: "#1",
  platformImage: "/assets/image/tps/feature-platform.jpg",
  platformAlt: "Platform A demo",
  score: 92,
  scoreMax: 100,
  stars: "★★★★★",
  votesLabel: "12,482 verified votes",
  votesNote: "(Demo Data)",
  overall: "#01 Overall",
  move: "↑ 2",
  moveLabel: "positions this month",
};

export const TPS_STEPS = [
  {
    icon: "●",
    num: "01",
    title: "PLAYERS VOTE",
    desc: "Real players share their experience by voting for platforms they use.",
  },
  {
    icon: "◈",
    num: "02",
    title: "VOTES ARE CHECKED",
    desc: "Suspicious, duplicate, and automated voting patterns are flagged before inclusion.",
  },
  {
    icon: "↗",
    num: "03",
    title: "RANKINGS UPDATE",
    desc: "Rankings are recalculated on a published schedule using validated player votes.",
  },
];

export const TPS_FOOTER = {
  rankings: [
    { label: "Hot Index", href: "#rankings" },
    { label: "Payout Experience", href: "#rankings" },
    { label: "TPS Overall", href: "#rankings" },
    { label: "All Rankings", href: "#rankings" },
  ],
  information: [
    { label: "Methodology", href: "#methodology" },
    { label: "Voting Rules", href: "#" },
    { label: "About Us", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Responsible Gaming", href: "#" },
  ],
};
