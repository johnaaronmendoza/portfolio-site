// One source for the Home project tiles, the case-study headers and the
// "Next project" band, so names, years and summaries can't drift apart.
// Order = Home tile order; the case-study "Next project" chain follows it.

// ── Card images (shown in grid) ───────────────────────────────────────────
import silverLinkImg    from '@assets/tile_silverlink.webp';
import scsImg           from '@assets/tile_scs.webp';
import fireSafetyImg    from '@assets/tile_firesafety.webp';
import uwbImg           from '@assets/tile_uwb.webp';
import uatImg           from '@assets/tile_uat.webp';
import aiFinanceImg     from '@assets/tile_ai_finance.webp';

import type { ImageSource } from '@/lib/images';
import type { ImageCrop } from '@/utils/PixelationManager';

// GreenLoop's tile as WebP 1x/2x (asset-work/webp-manifest.md); the canvas picks one
const GREENLOOP_SET: ImageSource[] = [
  { src: '/assets/tiles/greenloop_hero.webp', w: 525 },
  { src: '/assets/tiles/greenloop_hero@2x.webp', w: 1050 },
];

// Secondary images to preload on hover: the case pages' 1x WebP screenshots
const caseShot = (path: string) => `/assets/case/${path}.webp`;


/** Route segment of a case-study page: /projects/{slug} */
export type CaseSlug = 'silverlink' | 'scs' | 'ai-finance' | 'uwb' | 'uat' | 'firesafety';

export type Project = {
  num: number;
  name: string;
  /** Case-study pages only */
  slug?: CaseSlug;
  /** Short file name for the tile's browser.exe title bar when there is no case slug */
  file?: string;
  /** One line, ≤ 14 words: the Home tile text and the lead under the case-study
   *  h1 (one string, so they can't drift). No key terms:
   *  the tile's facts carry the emphasis. */
  description: string;
  /** Short facts shown as a list under the description */
  facts: string[];
  year: string;
  /** Team or course context after the year on the tile ("2025 · team of 6");
   *  facts already on the case pages and resume */
  caption: string;
  /** Tile still, cut at 2:1 (asset-work/tiles/screens.py) */
  image: string | null;
  /** 1x/2x files for the tile still, when it has them */
  imageSet?: ImageSource[];
  /** Zoom into the still's most legible part at tile size */
  crop?: ImageCrop;
  tags: string[];
  link: string;
  externalUrl?: string;
  preloadImages: string[];
  /** Grid width in the tile grid (sm: 2 cols, lg: 6 cols, xl: 12 cols) */
  span: string;
  /** Lead tile: taller image, bigger title, always in colour */
  featured?: boolean;
  /** Comic sound-effect sticker on the tile image; true to what the project does, featured tiles only */
  sfx?: string;
};

// The three featured tiles share a row from lg (3 x 2 of 6, then 3 x 4 of 12);
// the other four sit two to a row at lg and four to a row from xl
const FEATURED_SPAN = 'lg:col-span-2 xl:col-span-4';

export const PROJECTS: Project[] = [
  {
    num: 1,
    name: "SilverLink SG",
    slug: 'silverlink',
    description:
      "Connects seniors and youth through skill-sharing and live events, built to block double-bookings.",
    facts: ["8-node cluster", "4 services"],
    year: "2025",
    caption: "team of 6",
    image: silverLinkImg,
    // Event title and the session with Cancel booking
    crop: { x: 0.1, y: 0.8, zoom: 1.35 },
    tags: ["React", "gRPC", "K8s", "PostgreSQL"],
    link: "/projects/silverlink",
    span: FEATURED_SPAN,
    preloadImages: [caseShot('silverlink/silverlink_p21_img0'), caseShot('silverlink/silverlink_p22_img0')],
    featured: true,
    sfx: 'Booked!',
  },
  {
    num: 2,
    name: "SCS Awareness Platform",
    slug: 'scs',
    description:
      "Teaches cancer awareness through a branching story at Singapore Cancer Society booths.",
    facts: ["4 languages", "4 question types"],
    year: "2025",
    caption: "team of 4",
    image: scsImg,
    // The story editor's title, panel counts and first panels, without the sidebar
    crop: { x: 0.85, y: 0, zoom: 1.4 },
    tags: ["React 19", "TypeScript", "Supabase", "Vercel"],
    link: "/projects/scs",
    span: FEATURED_SPAN,
    preloadImages: [caseShot('scs/scs_p71_img1'), caseShot('scs/scs_p72_img0')],
    featured: true,
  },
  {
    num: 4,
    name: "UWB Indoor Localization",
    slug: 'uwb',
    description:
      "Tells clear UWB signals from blocked (NLOS) ones with an SVM-RBF model.",
    facts: ["89.61% accuracy", "0.9612 AUC", "41,996 samples"],
    year: "2025",
    caption: "team coursework",
    image: uwbImg,
    tags: ["Python", "SVM", "PCA", "scikit-learn"],
    link: "/projects/uwb",
    // Wide at sm so the 2-column grid has no orphan
    span: `sm:col-span-2 ${FEATURED_SPAN}`,
    preloadImages: [caseShot('uwb/da_p39_img2'), '/assets/case/uwb/tree-depth-desktop@2x.webp'],
    featured: true,
  },
  {
    num: 3,
    name: "AI Finance Insights Engine",
    slug: 'ai-finance',
    description:
      "Pulls market data into one Power BI-ready warehouse; NLP flags supply-chain risk.",
    facts: ["5 data sources", "star schema", "100% Pytest coverage"],
    year: "2024",
    caption: "data pipeline",
    image: aiFinanceImg,
    tags: ["Python", "Pandas", "ETL", "NLP", "Power BI"],
    link: "/projects/ai-finance",
    span: 'lg:col-span-3',
    preloadImages: [],
  },
  {
    num: 5,
    name: "UAT Testing Dashboard",
    slug: 'uat',
    description:
      "Links each failed test to its defect to show what blocks go-live.",
    facts: ["25 sample defects", "8 modules", "4 roles"],
    year: "2024",
    caption: "coursework",
    image: uatImg,
    // Dashboard title and the defect and test-case figures, without the sidebar
    crop: { x: 0.65, y: 0, zoom: 1.4 },
    tags: ["React 18", "Node.js", "Express", "SQLite"],
    link: "/projects/uat",
    span: 'lg:col-span-3',
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
    caption: "team coursework",
    image: fireSafetyImg,
    // Both phones' AR Drill screens, a little closer
    crop: { x: 0.4, y: 0, zoom: 1.25 },
    tags: ["Kotlin", "ARCore", "TFLite", "Jetpack Compose"],
    link: "/projects/firesafety",
    span: 'lg:col-span-3',
    preloadImages: [caseShot('firesafety/firesafety_p29_img1'), caseShot('firesafety/firesafety_p29_img3')],
  },
  {
    num: 7,
    name: "GreenLoopFarms",
    file: "greenloop",
    description:
      "Helped pitch a Singapore hydroponic urban farm to an industry investor panel.",
    facts: ["SGD 10,000 NYP JumpStart Grant"],
    year: "2022",
    caption: "team pitch",
    image: GREENLOOP_SET[0].src,
    imageSet: GREENLOOP_SET,
    tags: ["NYP JumpStart", "Urban Farming"],
    link: "external",
    span: 'lg:col-span-3',
    externalUrl: "https://greenloopfarms.com/",
    // Links out, so there is no case page to preload
    preloadImages: [],
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
