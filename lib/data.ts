export type VerificationState = "checked" | "reviewed" | "reported";

export type VerificationCheck = {
  label: string;
  state: VerificationState;
  detail: string;
  checkedAt?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  material: string;
  moq: number;
  supplierId: string;
  tags: string[];
};

export type Supplier = {
  id: string;
  name: string;
  shortName: string;
  location: string;
  countryCode: string;
  type: "Manufacturer" | "Trading company";
  years: number;
  employees: string;
  responseTime: string;
  responseRate: number;
  moq: number;
  about: string;
  categories: string[];
  capabilities: string[];
  materials: string[];
  markets: string[];
  heroImage: string;
  logoColor: string;
  verification: VerificationCheck[];
  productIds: string[];
  featured?: boolean;
};

export type RFQ = {
  id: string;
  title: string;
  buyerLabel: string;
  buyerLocation: string;
  buyerVerified: boolean;
  category: string;
  quantity: string;
  deadline: string;
  delivery: string;
  material: string;
  description: string;
  requirements: string[];
  responses: number;
  status: "Open" | "Under review" | "Shortlisting" | "Draft";
  posted: string;
  fit: number;
  visibility: string;
  order?: { units: number; styles: number; colors: number };
  capabilities?: string[];
  techPack?: string;
  documentation?: string;
  invitedSupplierId?: string;
  preview?: boolean;
};

export type RFQResponse = {
  id: string;
  rfqId: string;
  supplierId: string;
  fit: number;
  priceRange: string;
  leadTime: string;
  moq: string;
  note: string;
  status: "New" | "Shortlisted" | "Reviewing";
  samplingTime?: string;
  consideration?: string;
  question?: string;
};

export const products: Product[] = [
  {
    id: "p-performance-tee",
    name: "Bonded performance tee",
    category: "Training tops",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
    material: "Recycled polyester / elastane",
    moq: 300,
    supplierId: "pearl-river",
    tags: ["Bonded seams", "Recycled", "Quick dry"],
  },
  {
    id: "p-compression-set",
    name: "Four-way stretch set",
    category: "Activewear sets",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1200&q=85",
    material: "Nylon / spandex",
    moq: 500,
    supplierId: "pearl-river",
    tags: ["Four-way stretch", "Flatlock", "Private label"],
  },
  {
    id: "p-team-jersey",
    name: "Sublimated team jersey",
    category: "Teamwear",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85",
    material: "Bird-eye polyester",
    moq: 100,
    supplierId: "apex-teamwear",
    tags: ["Sublimation", "Low MOQ", "Club kits"],
  },
  {
    id: "p-running-shell",
    name: "Packable running shell",
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
    material: "20D recycled nylon",
    moq: 600,
    supplierId: "summit-outerwear",
    tags: ["DWR finish", "Laser cut", "Recycled"],
  },
  {
    id: "p-seamless-legging",
    name: "Seamless contour legging",
    category: "Seamless",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
    material: "Nylon 6.6 / elastane",
    moq: 800,
    supplierId: "motionlab",
    tags: ["Santoni", "Engineered rib", "Moisture wicking"],
  },
  {
    id: "p-heavy-hoodie",
    name: "Heavyweight recovery hoodie",
    category: "Athleisure",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
    material: "460gsm cotton blend",
    moq: 250,
    supplierId: "northstar-cut-sew",
    tags: ["Garment dye", "Embroidery", "Heavyweight"],
  },
  {
    id: "p-cycling-jersey",
    name: "Pro-fit cycling jersey",
    category: "Cycling",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=85",
    material: "Italian mesh / polyester",
    moq: 150,
    supplierId: "harbor-stitch",
    tags: ["YKK zip", "Silicone grip", "Custom print"],
  },
  {
    id: "p-tennis-dress",
    name: "Technical tennis dress",
    category: "Racquet sports",
    image:
      "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=1200&q=85",
    material: "Double-knit nylon",
    moq: 400,
    supplierId: "eastline-apparel",
    tags: ["Built-in short", "Bonded hem", "UPF 40"],
  },
];

export const suppliers: Supplier[] = [
  {
    id: "pearl-river",
    name: "Pearl River Performance Wear",
    shortName: "PR",
    location: "Dongguan, China",
    countryCode: "CN",
    type: "Manufacturer",
    years: 14,
    employees: "120–180",
    responseTime: "< 4 hours",
    responseRate: 96,
    moq: 300,
    about:
      "A cut-and-sew performance apparel manufacturer focused on technical training wear, recycled fabrics, and private-label activewear programs.",
    categories: ["Activewear", "Training tops", "Running"],
    capabilities: [
      "Pattern development",
      "Flatlock stitching",
      "Bonded seams",
      "Sublimation",
      "Private labeling",
    ],
    materials: [
      "Recycled polyester",
      "Nylon 6.6",
      "Elastane blends",
      "Performance mesh",
    ],
    markets: ["Northern Europe", "Australia", "Japan"],
    heroImage:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1800&q=85",
    logoColor: "#193c35",
    productIds: ["p-performance-tee", "p-compression-set"],
    featured: true,
    verification: [
      {
        label: "Business registration",
        state: "checked",
        detail: "Registration number and legal entity matched",
        checkedAt: "12 Aug 2026",
      },
      {
        label: "Representative identity",
        state: "checked",
        detail: "Identity and company relationship reviewed",
        checkedAt: "12 Aug 2026",
      },
      {
        label: "Factory evidence",
        state: "reviewed",
        detail: "Live video walkthrough and timestamped media reviewed",
        checkedAt: "14 Aug 2026",
      },
      {
        label: "Production capacity",
        state: "reported",
        detail: "35,000–50,000 units/month, supplier-reported",
      },
    ],
  },
  {
    id: "apex-teamwear",
    name: "Apex Teamwear Works",
    shortName: "AT",
    location: "Guangzhou, China",
    countryCode: "CN",
    type: "Manufacturer",
    years: 9,
    employees: "80–120",
    responseTime: "< 8 hours",
    responseRate: 93,
    moq: 100,
    about:
      "Specialist producer for custom football, basketball, and club teamwear with in-house sublimation and sampling.",
    categories: ["Teamwear", "Football", "Basketball"],
    capabilities: [
      "Full sublimation",
      "Digital pattern making",
      "Small-batch sampling",
      "Name and number personalization",
    ],
    materials: ["Bird-eye polyester", "Interlock knit", "Performance mesh"],
    markets: ["United Kingdom", "Middle East", "Southeast Asia"],
    heroImage:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1800&q=85",
    logoColor: "#7a2f20",
    productIds: ["p-team-jersey"],
    featured: true,
    verification: [
      {
        label: "Business registration",
        state: "checked",
        detail: "Legal entity and operating address matched",
        checkedAt: "08 Sep 2026",
      },
      {
        label: "Representative identity",
        state: "checked",
        detail: "Representative joined onboarding video call",
        checkedAt: "08 Sep 2026",
      },
      {
        label: "Factory evidence",
        state: "reviewed",
        detail: "Production-floor media reviewed",
        checkedAt: "10 Sep 2026",
      },
      {
        label: "Production capacity",
        state: "reported",
        detail: "20,000 teamwear units/month, supplier-reported",
      },
    ],
  },
  {
    id: "harbor-stitch",
    name: "Harbor Stitch Sourcing",
    shortName: "HS",
    location: "Kowloon, Hong Kong",
    countryCode: "HK",
    type: "Trading company",
    years: 11,
    employees: "20–35",
    responseTime: "< 2 hours",
    responseRate: 98,
    moq: 150,
    about:
      "Hong Kong product-development and export partner working with disclosed specialist factories across Guangdong and Fujian.",
    categories: ["Cycling", "Running", "Outdoor"],
    capabilities: [
      "Factory sourcing",
      "Technical development",
      "Quality coordination",
      "Consolidated export",
    ],
    materials: ["Technical mesh", "Recycled synthetics", "Merino blends"],
    markets: ["Europe", "United States", "Australia"],
    heroImage:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1800&q=85",
    logoColor: "#294066",
    productIds: ["p-cycling-jersey"],
    featured: true,
    verification: [
      {
        label: "Business registration",
        state: "checked",
        detail: "Hong Kong company registry record matched",
        checkedAt: "03 Sep 2026",
      },
      {
        label: "Representative identity",
        state: "checked",
        detail: "Director identity reviewed",
        checkedAt: "03 Sep 2026",
      },
      {
        label: "Factory relationships",
        state: "reviewed",
        detail: "Three partner-factory relationships evidenced",
        checkedAt: "05 Sep 2026",
      },
      {
        label: "Production capacity",
        state: "reported",
        detail: "Varies by disclosed production partner",
      },
    ],
  },
  {
    id: "motionlab",
    name: "MotionLab Seamless",
    shortName: "ML",
    location: "Yiwu, China",
    countryCode: "CN",
    type: "Manufacturer",
    years: 7,
    employees: "160–220",
    responseTime: "< 12 hours",
    responseRate: 89,
    moq: 800,
    about:
      "Seamless activewear manufacturer producing engineered leggings, bras, and base layers on circular knitting equipment.",
    categories: ["Seamless", "Yoga", "Base layers"],
    capabilities: [
      "Circular knitting",
      "Engineered compression",
      "Garment dyeing",
      "Seamless sampling",
    ],
    materials: ["Nylon 6.6", "Recycled nylon", "Polyamide elastane"],
    markets: ["United States", "Europe"],
    heroImage:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=85",
    logoColor: "#433358",
    productIds: ["p-seamless-legging"],
    verification: [
      {
        label: "Business registration",
        state: "checked",
        detail: "Registration and company name matched",
        checkedAt: "29 Aug 2026",
      },
      {
        label: "Representative identity",
        state: "checked",
        detail: "Export manager identity reviewed",
        checkedAt: "29 Aug 2026",
      },
      {
        label: "Machinery evidence",
        state: "reviewed",
        detail: "Circular knitting equipment media reviewed",
        checkedAt: "01 Sep 2026",
      },
      {
        label: "Production capacity",
        state: "reported",
        detail: "80,000 units/month, supplier-reported",
      },
    ],
  },
  {
    id: "summit-outerwear",
    name: "Summit Technical Outerwear",
    shortName: "ST",
    location: "Xiamen, China",
    countryCode: "CN",
    type: "Manufacturer",
    years: 16,
    employees: "200–300",
    responseTime: "< 1 day",
    responseRate: 91,
    moq: 600,
    about:
      "Technical outerwear factory specializing in lightweight running shells, waterproof construction, and performance insulation.",
    categories: ["Outerwear", "Running", "Outdoor"],
    capabilities: [
      "Seam taping",
      "Laser cutting",
      "DWR finishing",
      "Down and synthetic fill",
    ],
    materials: ["Recycled nylon", "Three-layer laminates", "Ripstop polyester"],
    markets: ["Canada", "Northern Europe", "South Korea"],
    heroImage:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1800&q=85",
    logoColor: "#3c4a2b",
    productIds: ["p-running-shell"],
    verification: [
      {
        label: "Business registration",
        state: "checked",
        detail: "Legal registration checked",
        checkedAt: "18 Aug 2026",
      },
      {
        label: "Representative identity",
        state: "checked",
        detail: "Company representative checked",
        checkedAt: "18 Aug 2026",
      },
      {
        label: "Factory evidence",
        state: "reviewed",
        detail: "Factory media and address evidence reviewed",
        checkedAt: "20 Aug 2026",
      },
      {
        label: "Production capacity",
        state: "reported",
        detail: "45,000 pieces/month, supplier-reported",
      },
    ],
  },
  {
    id: "northstar-cut-sew",
    name: "Northstar Cut & Sew",
    shortName: "NC",
    location: "Ningbo, China",
    countryCode: "CN",
    type: "Manufacturer",
    years: 12,
    employees: "90–140",
    responseTime: "< 8 hours",
    responseRate: 94,
    moq: 250,
    about:
      "Flexible cut-and-sew partner for premium jersey, fleece, heavyweight athleisure, and garment-dyed programs.",
    categories: ["Athleisure", "Fleece", "Training tops"],
    capabilities: [
      "Garment dye",
      "Embroidery",
      "Screen print",
      "Heavyweight jersey sewing",
    ],
    materials: ["Organic cotton", "Cotton fleece", "Cotton-modal blends"],
    markets: ["United Kingdom", "Benelux", "Australia"],
    heroImage:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1800&q=85",
    logoColor: "#6b4133",
    productIds: ["p-heavy-hoodie"],
    verification: [
      {
        label: "Business registration",
        state: "checked",
        detail: "Registration record matched",
        checkedAt: "26 Aug 2026",
      },
      {
        label: "Representative identity",
        state: "checked",
        detail: "Sales director identity reviewed",
        checkedAt: "26 Aug 2026",
      },
      {
        label: "Factory evidence",
        state: "reviewed",
        detail: "Cut-and-sew floor evidence reviewed",
        checkedAt: "28 Aug 2026",
      },
      {
        label: "Production capacity",
        state: "reported",
        detail: "30,000 pieces/month, supplier-reported",
      },
    ],
  },
  {
    id: "eastline-apparel",
    name: "Eastline Apparel Studio",
    shortName: "EA",
    location: "Shenzhen, China",
    countryCode: "CN",
    type: "Trading company",
    years: 6,
    employees: "12–20",
    responseTime: "< 3 hours",
    responseRate: 97,
    moq: 400,
    about:
      "Product-development studio connecting emerging racquet-sport and active lifestyle brands with disclosed production partners.",
    categories: ["Racquet sports", "Activewear", "Lifestyle"],
    capabilities: [
      "Design development",
      "Technical packs",
      "Factory coordination",
      "Quality inspection coordination",
    ],
    materials: ["Double-knit nylon", "Performance pique", "Recycled polyester"],
    markets: ["Southeast Asia", "Australia", "United States"],
    heroImage:
      "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=1800&q=85",
    logoColor: "#785f26",
    productIds: ["p-tennis-dress"],
    verification: [
      {
        label: "Business registration",
        state: "checked",
        detail: "Trading company registration matched",
        checkedAt: "11 Sep 2026",
      },
      {
        label: "Representative identity",
        state: "checked",
        detail: "Founder identity reviewed",
        checkedAt: "11 Sep 2026",
      },
      {
        label: "Factory relationships",
        state: "reviewed",
        detail: "Partner relationships reviewed",
        checkedAt: "13 Sep 2026",
      },
      {
        label: "Production capacity",
        state: "reported",
        detail: "Varies by production partner",
      },
    ],
  },
];

export const rfqs: RFQ[] = [
  {
    id: "rfq-recycled-running",
    order: { units: 5000, styles: 4, colors: 2 },
    capabilities: ["Flatlock stitching", "Bonded seams", "Private labeling"],
    title: "Recycled running collection — SS27",
    buyerLabel: "Verified performance-wear brand",
    buyerLocation: "Copenhagen, Denmark",
    buyerVerified: true,
    category: "Running apparel",
    quantity: "5,000 units across 4 styles",
    deadline: "23 Sep 2026",
    delivery: "Copenhagen, Feb 2027",
    material: "GRS recycled polyester / elastane",
    description:
      "Established Scandinavian running brand seeking a cut-and-sew partner for its Spring/Summer 2027 capsule. Technical packs are complete and available after mutual interest.",
    requirements: [
      "GRS material documentation",
      "Flatlock capability",
      "Bonded hem experience",
      "Pre-production sample",
      "EU export experience",
    ],
    responses: 3,
    status: "Shortlisting",
    posted: "2 days ago",
    fit: 96,
    visibility: "Matched performance apparel suppliers",
  },
  {
    id: "rfq-club-kits",
    order: { units: 2400, styles: 18, colors: 1 },
    capabilities: ["Full sublimation", "Name and number personalization"],
    title: "Custom football kits for 18 community clubs",
    buyerLabel: "Verified teamwear distributor",
    buyerLocation: "Manchester, United Kingdom",
    buyerVerified: true,
    category: "Teamwear",
    quantity: "2,400 complete kits",
    deadline: "27 Sep 2026",
    delivery: "Manchester, Jan 2027",
    material: "Sublimation-ready performance polyester",
    description:
      "Regional teamwear distributor sourcing full custom club kits with individual names and numbers, split across 18 club designs.",
    requirements: [
      "Full sublimation",
      "Low quantity per design",
      "Individual bagging",
      "UK export experience",
    ],
    responses: 5,
    status: "Open",
    posted: "5 hours ago",
    fit: 91,
    visibility: "Teamwear and sublimation suppliers",
  },
  {
    id: "rfq-pilates-set",
    order: { units: 800, styles: 2, colors: 2 },
    capabilities: ["Pattern development", "Private labeling"],
    title: "Premium private-label pilates sets",
    buyerLabel: "Verified multi-site studio",
    buyerLocation: "Melbourne, Australia",
    buyerVerified: true,
    category: "Activewear sets",
    quantity: "800 sets, initial order",
    deadline: "01 Oct 2026",
    delivery: "Melbourne, Mar 2027",
    material: "Matte nylon / elastane, squat-proof",
    description:
      "Pilates studio group developing its first retail collection. Looking for development support and a flexible first production run.",
    requirements: [
      "Pattern-development support",
      "Custom colors",
      "Private labels",
      "Low initial MOQ",
    ],
    responses: 2,
    status: "Open",
    posted: "1 day ago",
    fit: 84,
    visibility: "Activewear suppliers",
  },
];

export const rfqResponses: RFQResponse[] = [
  {
    id: "response-pr",
    consideration:
      "Reports comparable running tops. Coverage of all four styles still needs confirmation.",
    question:
      "Can you produce all four styles, and provide material documentation for this order?",
    rfqId: "rfq-recycled-running",
    supplierId: "pearl-river",
    fit: 96,
    priceRange: "$8.40–$16.80 / unit",
    leadTime: "75–90 days",
    moq: "300 / style-color",
    note: "We currently produce comparable bonded running tops for two Northern European brands and can source GRS-certified recycled fabrics from our existing mill partners.",
    status: "Shortlisted",
  },
  {
    id: "response-st",
    consideration:
      "Offers the shell and bonded styles, but suggests another factory for base layers.",
    question:
      "Which styles would you make, and who would own coordination with the other factory?",
    rfqId: "rfq-recycled-running",
    supplierId: "summit-outerwear",
    fit: 89,
    priceRange: "$10.20–$19.40 / unit",
    leadTime: "85–100 days",
    moq: "600 / style",
    note: "Strong fit for the packable shell and bonded styles. We suggest partnering with your selected jersey factory for the base-layer pieces.",
    status: "Reviewing",
  },
  {
    id: "response-hs",
    consideration:
      "A trading company proposing two specialist factories with one development contact.",
    question:
      "Which factories would make each style, and how would samples and quality checks be coordinated?",
    rfqId: "rfq-recycled-running",
    supplierId: "harbor-stitch",
    fit: 86,
    priceRange: "$9.10–$18.20 / unit",
    leadTime: "70–95 days",
    moq: "250 / style-color",
    note: "We can coordinate this capsule across two disclosed specialist factories while providing a single development and export contact in Hong Kong.",
    status: "New",
  },
];

export const conversations = [
  {
    id: "conv-pearl",
    supplierId: "pearl-river",
    counterpart: "Pearl River Performance Wear",
    initials: "PR",
    preview: "We can prepare the recycled fabric swatches this week.",
    time: "10:42",
    unread: 2,
    rfq: "Recycled running collection — SS27",
  },
  {
    id: "conv-apex",
    supplierId: "apex-teamwear",
    counterpart: "Apex Teamwear Works",
    initials: "AT",
    preview: "The individual club quantities are workable for us.",
    time: "Yesterday",
    unread: 0,
    rfq: "Custom football kits",
  },
  {
    id: "conv-harbor",
    supplierId: "harbor-stitch",
    counterpart: "Harbor Stitch Sourcing",
    initials: "HS",
    preview: "Thank you for reviewing our response.",
    time: "Mon",
    unread: 0,
    rfq: "Recycled running collection — SS27",
  },
];

export const verificationQueue = [
  {
    id: "v1",
    name: "Guangzhou Form Athletics Co.",
    type: "Supplier",
    country: "China",
    submitted: "18 min ago",
    checks: "3 of 5",
    risk: "Standard",
    status: "Ready for review",
  },
  {
    id: "v2",
    name: "Studio Pace GmbH",
    type: "Buyer",
    country: "Germany",
    submitted: "1 hour ago",
    checks: "4 of 4",
    risk: "Low",
    status: "Ready for review",
  },
  {
    id: "v3",
    name: "Novus Apparel Export Ltd.",
    type: "Supplier",
    country: "Hong Kong",
    submitted: "3 hours ago",
    checks: "2 of 5",
    risk: "Review",
    status: "Information requested",
  },
  {
    id: "v4",
    name: "East Coast Run Club Pty Ltd",
    type: "Buyer",
    country: "Australia",
    submitted: "Yesterday",
    checks: "3 of 4",
    risk: "Standard",
    status: "Ready for review",
  },
];

export const getSupplier = (id: string) =>
  suppliers.find((supplier) => supplier.id === id);
export const getRFQ = (id: string) => rfqs.find((rfq) => rfq.id === id);
export const getProductsForSupplier = (id: string) =>
  products.filter((product) => product.supplierId === id);
