export const EDNEX_CONTACT = {
  location: "Johor, Malaysia",
  email: "sales@ednex.com.my",
  hours: "Mon – Sat: 8:00 AM – 6:00 PM",
  phone: "+60 7-XXX XXXX",
  phoneTel: "+607XXXXXXX",
  whatsapp: "+60 1X-XXXXXXX",
  whatsappLink: "https://wa.me/60123456789",
};

export const EDNEX_NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "parts", label: "Parts Range" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact Us" },
];

export const EDNEX_SLIDES = [
  {
    image: "/assets/image/ednex/hero-1.jpg",
    eyebrow: "EDNEX SDN.BHD.",
    titleHtml:
      "<strong>HEAVY TRANSPORT</strong><br>PARTS SPECIALIST",
    actions: [
      { label: "Get a Quotation", href: "#contact", variant: "gold" },
      { label: "View Parts Range", href: "#parts", variant: "outline" },
    ],
  },
  {
    image: "/assets/image/ednex/hero-2.jpg",
    eyebrow: "EXTENSIVE INVENTORY",
    titleHtml:
      "ENGINES &amp; <strong>POWERTRAINS</strong><br><strong>ALWAYS IN STOCK</strong>",
    actions: [{ label: "Our Parts Range", href: "#parts", variant: "gold" }],
  },
  {
    image: "/assets/image/ednex/hero-3.jpg",
    eyebrow: "GEARBOXES · AXLES · COMPONENTS",
    titleHtml:
      "<strong>QUALITY PARTS</strong><br>&amp; SERVICES YOU<br><strong>CAN TRUST</strong>",
    actions: [
      { label: "Contact Us Today", href: "#contact", variant: "gold" },
      { label: "Our Services", href: "#services", variant: "outline" },
    ],
  },
];

export const EDNEX_STATS = [
  { num: "15+", lbl: "Years Experience" },
  { num: "1000+", lbl: "Parts in Stock" },
  { num: "100%", lbl: "Client Satisfaction" },
  { num: "13", lbl: "States Covered" },
];

export const EDNEX_PARTS = [
  "Engines & Powertrains",
  "Gearboxes & Transmissions",
  "Axles & Chassis",
  "Cylinder Heads",
  "Torque Converters",
  "Clutch Assemblies",
  "Engine Blocks",
  "Suspension Parts",
  "Cooling Components",
  "Fuel System Parts",
  "Brake System",
  "Differential Units",
];

export const EDNEX_BRANDS = [
  "VOLVO",
  "SCANIA",
  "MERCEDES-BENZ",
  "MAN",
  "DAF",
  "IVECO",
  "ISUZU",
  "HINO",
  "UD TRUCKS",
  "FUSO",
  "FAW",
  "SINOTRUK",
];

export const EDNEX_SERVICES = [
  {
    image: "/assets/image/ednex/svc-1.jpg",
    num: "Service — 01",
    title: "Parts Supply & Distribution",
    desc: "We supply and distribute heavy truck parts across Malaysia — from complete engine assemblies and axle units to individual precision components. Fast delivery with competitive pricing.",
    cta: "Enquire Now",
    reverse: false,
  },
  {
    image: "/assets/image/ednex/svc-2.jpg",
    num: "Service — 02",
    title: "Technical Consultation",
    desc: "Our experienced team provides professional consultation to identify the correct parts for your vehicle make, model, and engine code. Complimentary initial consultation available.",
    cta: "Speak to Our Team",
    reverse: true,
  },
];

export const EDNEX_WHY = [
  {
    icon: "⚙️",
    title: "Expert Consultation",
    desc: "Specialists identify exact parts for your vehicle make, model, and engine code — reducing costly ordering errors.",
  },
  {
    icon: "🛡️",
    title: "Verified Quality",
    desc: "All parts inspected before dispatch to ensure compatibility and performance. We only supply what we stand behind.",
  },
  {
    icon: "💰",
    title: "Competitive Pricing",
    desc: "Market-leading pricing across all categories. No hidden costs — all pricing quoted upfront and confirmed before commitment.",
  },
  {
    icon: "🚚",
    title: "Nationwide Delivery",
    desc: "Fast delivery to all 13 states including Sabah and Sarawak via trusted logistics partners.",
  },
  {
    icon: "📦",
    title: "Large Inventory",
    desc: "Over 1,000 parts in stock at any time — from complete engines to individual components ready for immediate dispatch.",
  },
  {
    icon: "🤝",
    title: "After-Sales Support",
    desc: "Our team remains available after purchase to assist with fitment queries, technical questions, and follow-up needs.",
  },
];

export const EDNEX_GALLERY = Array.from({ length: 8 }, (_, i) => ({
  src: `/assets/image/ednex/gal-${i + 1}.jpg`,
  alt: `EDNEX facility ${i + 1}`,
}));

export const EDNEX_PART_CATEGORIES = [
  "Engines & Powertrains",
  "Gearboxes & Transmissions",
  "Axles & Chassis",
  "Cylinder Heads & Engine Components",
  "Torque Converters",
  "Other / General Enquiry",
];
