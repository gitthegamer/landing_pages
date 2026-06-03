export const EDNEX_CONTACT = {
  location:
    "LG1-2, Seri Gembira Avenue, No.6, Jalan Senang Ria, Kuchai Lama, 58200 Kuala Lumpur",
  email: "ednex888@gmail.com",
  hours: "Mon – Sat: 9:00 AM – 6:00 PM",
  phone: "+60 3-7890 2530",
  phoneTel: "+60378902530",
  whatsapp: "+60 17-693 1955",
  whatsappLink: "https://wa.me/60176931955",
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
    titleHtml: "<strong>HEAVY TRANSPORT</strong><br>PARTS SPECIALIST",
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
  "Clutch Assemblies",
  "Engine Blocks",
  "Engines & Powertrains",
  "Gearboxes & Transmissions",
  "Axles & Chassis",
  "Cylinder Heads",
  "Torque Converters",
  "Cooling Components",
  "Fuel System Parts",
  "Suspension Parts",
  "Brake System",
  "Differential Units",
];

export const EDNEX_BRANDS = [
  "IVECO",
  "ISUZU",
  "VOLVO",
  "FUSO",
  "MAN",
  "DAF",
  "HINO",
  "SCANIA",
  "MERCEDES-BENZ",
  "UD TRUCKS",

  "FAW",
  "SINOTRUK",
];

export const EDNEX_SERVICES = [
  {
    image: "/assets/image/ednex/svc-1.jpg",
    num: "Service — 01",
    title: "Parts Supply & Distribution",
    desc: "We provide reliable nationwide supply and distribution of heavy commercial vehicle parts across Malaysia. Our range includes engines, transmissions, axles, chassis components, and precision spare parts for all major brands. With strict quality control, efficient inventory management, and a strong logistics network, we ensure consistent availability, competitive pricing, and timely delivery to support your operations.",
    cta: "Enquire Now",
    reverse: false,
  },
  {
    image: "/assets/image/ednex/svc-2.jpg",
    num: "Service — 02",
    title: "Technical Consultation",
    desc: "Our experienced specialists offer professional consultation to accurately identify and recommend the right parts based on your vehicle specifications and operating requirements. We provide expert guidance on component selection, compatibility, repairs, and maintenance, ensuring optimal performance. Initial consultation is provided free of charge to support informed and cost-effective decisions.",
    cta: "Contact Us",
    reverse: true,
  }
];

export const EDNEX_WHY = [
  {
    icon: "💰",
    title: "Competitive Pricing",
    desc: "We offer market-competitive pricing across all product categories, with full transparency—no hidden charges, and all quotations are confirmed upfront.",
  },
  {
    icon: "🚚",
    title: "Nationwide Delivery",
    desc: "Reliable and prompt delivery across all 13 states, including Sabah and Sarawak, through our trusted logistics network.",
  },
  {
    icon: "🛡️",
    title: "Verified Quality",
    desc: "Every part is thoroughly inspected prior to dispatch to guarantee compatibility and performance. We only supply products we confidently stand behind.",
  },

  {
    icon: "🤝",
    title: "After-Sales Support",
    desc: "Our commitment continues beyond the sale, with ongoing support for installation guidance, technical inquiries, and follow-up assistance.",
  },
  {
    icon: "⚙️",
    title: "Expert Consultation",
    desc: "Our specialists accurately identify the right parts based on your vehicle’s make, model, and engine specifications—minimizing costly ordering mistakes.",
  },
  {
    icon: "📦",
    title: "Large Inventory",
    desc: "With over 1,000 parts readily available, from complete engines to individual components, we ensure fast and efficient order fulfillment.",
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
