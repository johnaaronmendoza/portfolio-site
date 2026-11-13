// One source for the Home project tiles, the case-study headers and the
// "Next project" band, so names, years and summaries can't drift apart.
// Order = Home tile order; the case-study "Next project" chain follows it.

// ── Card images (shown in grid) ───────────────────────────────────────────
import silverLinkImg    from '@assets/tile_silverlink.webp';
import scsImg           from '@assets/tile_scs.webp';
import fireSafetyImg    from '@assets/tile_firesafety.webp';
import uwbImg           from '@assets/tile_uwb.webp';
import greenloopImg     from '@assets/greenloop_hero.jpg';
import uatImg           from '@assets/tile_uat.webp';
import aiFinanceImg     from '@assets/tile_ai_finance.webp';

// ── Secondary images to preload on hover (detail-page screenshots) ─────────
import silverLink2      from '@assets/silverlink_p21_img0.png';
import silverLink3      from '@assets/silverlink_p22_img0.png';
import scs2             from '@assets/scs_p71_img1.png';
import scs3             from '@assets/scs_p72_img0.png';
import fireSafety2      from '@assets/firesafety_p29_img1.png';
import fireSafety3      from '@assets/firesafety_p29_img3.png';
import uwb2             from '@assets/da_p39_img2.png';
import uwb3             from '@assets/da_p35_img1.png';
import greenloop2       from '@assets/greenloop_tour.jpg';


/** Route segment of a case-study page: /projects/{slug} */
export type CaseSlug = 'silverlink' | 'scs' | 'ai-finance' | 'uwb' | 'uat' | 'firesafety';

export type Project = {
  num: number;
  name: string;
  /** Case-study pages only */
  slug?: CaseSlug;
  /** One line, ≤ 14 words: the Home tile text and the lead under the case-study
   *  h1 (one string, so they can't drift). No key terms:
   *  the tile's facts carry the emphasis. */
  description: string;
  /** Short facts shown as a list under the description */
  facts: string[];
  year: string;
  image: string | null;
  tags: string[];
  link: string;
  externalUrl?: string;
  preloadImages: string[];
  /** Grid width in the tile grid (sm: 2 cols, lg: 6 cols) */
  span: string;
  /** Lead tile: taller image, bigger title, always in colour */
  featured?: boolean;
  /** Comic sound-effect sticker on the tile image; true to what the project does, featured tiles only */
  sfx?: string;
};

export const PROJECTS: Project[] = [
  {
    num: 1,
    name: "SilverLink SG",
    slug: 'silverlink',
    description:
      "Connects seniors and youth through skill-sharing and live events, built to block double-bookings.",
    facts: ["8-node cluster", "4 services", "6-person team"],
    year: "2025",
    image: silverLinkImg,
    tags: ["React", "gRPC", "K8s", "PostgreSQL"],
    link: "/projects/silverlink",
    span: 'lg:col-span-3',
    preloadImages: [silverLink2, silverLink3],
    featured: true,
    sfx: 'Booked!',
  },
  {
    num: 2,
    name: "SCS Awareness Platform",
    slug: 'scs',
    description:
      "Teaches cancer awareness through a branching story at Singapore Cancer Society booths.",
    facts: ["4 languages", "4 question types", "4-person team"],
    year: "2025",
    image: scsImg,
    tags: ["React 19", "TypeScript", "Supabase", "Vercel"],
    link: "/projects/scs",
    span: 'lg:col-span-3',
    preloadImages: [scs2, scs3],
    featured: true,
    sfx: 'Plot twist!',
  },
  {
    num: 3,
    name: "AI Finance Insights Engine",
    slug: 'ai-finance',
    description:
      "Pulls market data into one Power BI-ready warehouse; NLP flags supply-chain risk.",
    facts: ["5 data sources", "star schema", "100% Pytest coverage"],
    year: "2024",
    image: aiFinanceImg,
    tags: ["Python", "Pandas", "ETL", "NLP", "Power BI"],
    link: "/projects/ai-finance",
    span: 'lg:col-span-2',
    preloadImages: [],
  },
  {
    num: 4,
    name: "UWB Indoor Localization",
    slug: 'uwb',
    description:
      "Tells clear UWB signals from blocked (NLOS) ones with an SVM-RBF model.",
    facts: ["89.61% accuracy", "0.9612 AUC", "41,996 samples"],
    year: "2025",
    image: uwbImg,
    tags: ["Python", "SVM", "PCA", "scikit-learn"],
    link: "/projects/uwb",
    span: 'lg:col-span-2',
    preloadImages: [uwb2, uwb3],
  },
  {
    num: 5,
    name: "UAT Testing Dashboard",
    slug: 'uat',
    description:
      "Course project: links each failed test to its defect to show what blocks go-live.",
    facts: ["25 sample defects", "8 modules", "4 roles"],
    year: "2024",
    image: uatImg,
    tags: ["React 18", "Node.js", "Express", "SQLite"],
    link: "/projects/uat",
    span: 'lg:col-span-2',
    preloadImages: [],
  },
  {
    num: 6,
    name: "Fire Safety Drill Companion",
    slug: 'firesafety',
    description:
      "Lets HDB residents rehearse fire evacuation in their own block with AR arrows.",
    facts: ["SUS 79/100", "~80% test coverage", "drill works offline"],
    year: "2025",
    image: fireSafetyImg,
    tags: ["Kotlin", "ARCore", "TFLite", "Jetpack Compose"],
    link: "/projects/firesafety",
    span: 'lg:col-span-3',
    preloadImages: [fireSafety2, fireSafety3],
  },
  {
    num: 7,
    name: "GreenLoopFarms",
    description:
      "Helped pitch a Singapore hydroponic urban farm to an industry investor panel.",
    facts: ["SGD 10,000 NYP JumpStart Grant"],
    year: "2022",
    image: greenloopImg,
    tags: ["NYP JumpStart", "Urban Farming"],
    link: "external",
    span: 'sm:col-span-2 lg:col-span-3',
    externalUrl: "https://greenloopfarms.com/",
    preloadImages: [greenloop2],
  },
];

/** Projects that have a case-study page, in Home tile order */
const CASES = PROJECTS.filter((p): p is Project & { slug: CaseSlug } => p.slug !== undefined);

export function getCase(slug: CaseSlug): Project & { slug: CaseSlug } {
  const project = CASES.find(p => p.slug === slug);
  if (!project) throw new Error(`No project for case slug "${slug}"`);
  return project;
}

/** The following case in Home tile order, wrapping to the first */
export function getNextCase(slug: CaseSlug): Project & { slug: CaseSlug } {
  const i = CASES.findIndex(p => p.slug === slug);
  return CASES[(i + 1) % CASES.length];
}
