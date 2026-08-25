export const TPS_NAV = [
  { id: "rankings", labelKey: "tps.nav.rankings" },
  { id: "methodology", labelKey: "tps.nav.methodology" },
  { id: "about", labelKey: "tps.nav.about" },
  { id: "responsible", labelKey: "tps.nav.responsible" },
];

export const TPS_LANGS = [
  { code: "en", label: "EN" },
  { code: "bm", label: "BM" },
  { code: "cn", label: "CN" },
];

export const TPS_SPONSORS = [
  {
    name: "LG",
    wordClass: "lg",
    logo: "https://logo.clearbit.com/lg.com",
  },
  {
    name: "Hisense",
    wordClass: "hisense",
    logo: "https://logo.clearbit.com/hisense.com",
  },
  {
    name: "Digi",
    wordClass: "digi",
    logo: "https://logo.clearbit.com/digi.com.my",
  },
  {
    name: "EcoWorld",
    wordClass: "eco",
    logo: "https://logo.clearbit.com/ecoworld.my",
  },
  {
    name: "PETRONAS",
    wordClass: "petronas",
    logo: "https://logo.clearbit.com/petronas.com",
  },
  {
    name: "SAMSUNG",
    wordClass: "",
    logo: "https://logo.clearbit.com/samsung.com",
  },
];

export const TPS_STATS = [
  { value: "18,429", labelKey: "tps.stats.votes", noteKey: "tps.stats.demo" },
  { value: "10", labelKey: "tps.stats.platforms", noteKey: "tps.stats.demo" },
  {
    value: "Monthly",
    labelKey: "tps.stats.update",
    noteKey: "tps.stats.concept",
  },
];

export const TPS_CHAMPIONS = [
  {
    id: "rewards",
    featured: false,
    icon: "★",
    labelKey: "tps.champ.rewards.label",
    nameKey: "tps.champ.rewards.name",
    descKey: "tps.champ.rewards.desc",
    tagKey: "tps.champ.rewards.tag",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/BK8_Official_Logo.png",
    logoAlt: "BK8 logo",
  },
  {
    id: "played",
    featured: true,
    icon: "♛",
    labelKey: "tps.champ.played.label",
    nameKey: "tps.champ.played.name",
    descKey: "tps.champ.played.desc",
    tagKey: "tps.champ.played.tag",
    logo: "https://cdn.allsquaregolf.com/pictures/pictures/001/433/832/large/user_74244_profile_picture.jpg",
    logoAlt: "Winbox Malaysia logo",
  },
  {
    id: "young",
    featured: false,
    icon: "⚡",
    labelKey: "tps.champ.young.label",
    nameKey: "tps.champ.young.name",
    descKey: "tps.champ.young.desc",
    tagKey: "tps.champ.young.tag",
    logo: "https://pbs.twimg.com/profile_images/1707343063981678592/IHza81X3_400x400.jpg",
    logoAlt: "sureWin logo",
  },
];

export const TPS_RANKINGS = [
  {
    rank: "01",
    titleKey: "tps.rank.hot.title",
    descKey: "tps.rank.hot.desc",
    image: "/assets/image/tps/rank-hot-index.jpg",
    alt: "Hot Index casino visual",
  },
  {
    rank: "02",
    titleKey: "tps.rank.payout.title",
    descKey: "tps.rank.payout.desc",
    image: "/assets/image/tps/rank-payout.jpg",
    alt: "Payout Experience visual",
  },
  {
    rank: "03",
    titleKey: "tps.rank.overall.title",
    descKey: "tps.rank.overall.desc",
    image: "/assets/image/tps/rank-overall.jpg",
    alt: "TPS Overall casino visual",
  },
];

export const TPS_FEATURE = {
  monthLabelKey: "tps.feature.month",
  monthRank: "#1",
  platformImage: "/assets/image/tps/feature-platform.jpg",
  platformAlt: "Platform A demo",
  score: 92,
  scoreMax: 100,
  stars: "★★★★★",
  scoreLabelKey: "tps.feature.scoreLabel",
  votesLabelKey: "tps.feature.votes",
  votesNoteKey: "tps.feature.votesNote",
  overallKey: "tps.feature.overall",
  move: "↑ 2",
  moveLabelKey: "tps.feature.moveLabel",
  ctaKey: "tps.feature.cta",
};

export const TPS_STEPS = [
  {
    icon: "●",
    num: "01",
    titleKey: "tps.how.1.title",
    descKey: "tps.how.1.desc",
  },
  {
    icon: "◈",
    num: "02",
    titleKey: "tps.how.2.title",
    descKey: "tps.how.2.desc",
  },
  {
    icon: "↗",
    num: "03",
    titleKey: "tps.how.3.title",
    descKey: "tps.how.3.desc",
  },
];

export const TPS_FOOTER = {
  rankings: [
    { labelKey: "tps.footer.hotIndex", href: "#rankings" },
    { labelKey: "tps.footer.payout", href: "#rankings" },
    { labelKey: "tps.footer.tpsOverall", href: "#rankings" },
    { labelKey: "tps.footer.allRankings", href: "#rankings" },
  ],
  information: [
    { labelKey: "tps.footer.methodology", href: "#methodology" },
    { labelKey: "tps.footer.votingRules", href: "#" },
    { labelKey: "tps.footer.aboutUs", href: "#" },
    { labelKey: "tps.footer.faq", href: "#" },
  ],
  legal: [
    { labelKey: "tps.footer.privacy", href: "#" },
    { labelKey: "tps.footer.terms", href: "#" },
    { labelKey: "tps.footer.responsible", href: "#" },
  ],
};
