// Skills keyboard content, filter categories and keycap colours, shared by the
// 3D board (lazy chunk) and the flat 2D fallback. Content is unchanged from the
// CSS keyboard.

import { PROJECTS } from '@/data/projects';

export type GroupId = 'ai' | 'data' | 'backend' | 'frontend' | 'ways';

export type Key = {
  label: string;   // short id; also names the icon file /assets/skills/<label>.svg
  name: string;    // full skill name shown beside the board
  group: GroupId;
  blurb: string;   // what it is / how I use it
  usedIn: string;  // where it was used
};

export const GROUP_NAME: Record<GroupId, string> = {
  ai: 'AI & LLMs',
  data: 'Data & ML',
  backend: 'Backend & Cloud',
  frontend: 'Frontend & Mobile',
  ways: 'Ways of working',
};

// Keycap colourways from John's keycap sheet (KEYCAPS_28 / RETRO SYSTEM).
// WCAG contrast, checked: blue face/white 5.7:1, blue bar/white 10.5:1,
// amber face/black 10.6:1, amber bar/black 6.4:1, cream face/#111 16.7:1,
// cream bar/#111 10.0:1.
const WAYS = {
  blue:  { face: '#1B67BA', bar: '#0A3F78', side: '#0A3F78', ink: '#FFFFFF' },
  amber: { face: '#FFA502', bar: '#CC7A00', side: '#A76505', ink: '#000000' },
  cream: { face: '#FBF0DD', bar: '#C6BCA8', side: '#C6BCA8', ink: '#111111' },
} as const;

// Colourway and printed label per key, by label (the sheet's names)
const CAP: Record<string, { way: keyof typeof WAYS; text?: string }> = {
  PROMPT: { way: 'blue' },  RAG:   { way: 'amber' }, LLM:    { way: 'cream' }, GUARD:  { way: 'blue' },
  HUMAN:  { way: 'amber' }, PYTHON: { way: 'blue' }, PANDAS: { way: 'amber' }, SKLRN:  { way: 'cream', text: 'SKLEARN' },
  NUMPY:  { way: 'blue' },  SQL:   { way: 'amber' }, ETL:    { way: 'cream' }, BI:     { way: 'blue' },
  NODE:   { way: 'amber' }, GRPC:  { way: 'blue' },  PGSQL:  { way: 'blue' },  SUPA:   { way: 'amber' },
  DOCKER: { way: 'blue' },  KUBE:  { way: 'amber' }, GIT:    { way: 'cream' }, TS:     { way: 'blue' },
  REACT:  { way: 'amber' }, NEXT:  { way: 'cream' }, TWIND:  { way: 'blue' },  KOTLIN: { way: 'amber' },
  ARCORE: { way: 'blue' },  AGILE: { way: 'amber' }, UAT:    { way: 'blue' },  REQS:   { way: 'cream' },
};

export const KEYS: Key[] = [
  // Row 1 — AI first: the story this portfolio leads with
  { label: 'PROMPT', name: 'Prompt engineering', group: 'ai', blurb: 'Designing prompts that turn a messy ticket thread into a clear, on-policy draft reply.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'RAG', name: 'Retrieval-augmented generation', group: 'ai', blurb: 'Grounding AI answers in the company knowledge base instead of letting the model guess.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'LLM', name: 'LLM-assisted workflows', group: 'ai', blurb: 'Fitting a language model into a real support workflow, alongside Freshservice.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'GUARD', name: 'AI guardrails', group: 'ai', blurb: 'Least-privilege access, no remote code, and keeping customer data inside company systems.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'HUMAN', name: 'Human-in-the-loop design', group: 'ai', blurb: 'The AI drafts, a person decides. Every customer reply is reviewed before it is sent.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'PYTHON', name: 'Python', group: 'data', blurb: 'My main language for data work, from cleaning datasets to training models.', usedIn: 'UWB Indoor Localization, AI Finance Insights Engine' },
  { label: 'PANDAS', name: 'Pandas', group: 'data', blurb: 'Wrangling tens of thousands of rows into features a model can learn from.', usedIn: 'UWB Indoor Localization, AI Finance Insights Engine' },

  // Row 2
  { label: 'SKLRN', name: 'scikit-learn', group: 'data', blurb: 'Training and comparing models, including an SVM that reached 89.61% accuracy.', usedIn: 'UWB Indoor Localization' },
  { label: 'NUMPY', name: 'NumPy', group: 'data', blurb: 'Fast array maths behind feature engineering and PCA.', usedIn: 'UWB Indoor Localization' },
  { label: 'SQL', name: 'SQL', group: 'data', blurb: 'Querying and modelling data, including a star schema for reporting.', usedIn: 'AI Finance Insights Engine, SilverLink SG' },
  { label: 'ETL', name: 'ETL pipelines', group: 'data', blurb: 'Pulling five market data sources into one validated, fully tested pipeline.', usedIn: 'AI Finance Insights Engine' },
  { label: 'BI', name: 'Power BI', group: 'data', blurb: 'Turning a cleaned data warehouse into dashboards people can act on.', usedIn: 'AI Finance Insights Engine' },
  { label: 'NODE', name: 'Node.js', group: 'backend', blurb: 'Building the services and API gateway behind a live events platform.', usedIn: 'SilverLink SG' },
  { label: 'GRPC', name: 'gRPC', group: 'backend', blurb: 'Fast, typed communication between four microservices.', usedIn: 'SilverLink SG' },

  // Row 3
  { label: 'PGSQL', name: 'PostgreSQL', group: 'backend', blurb: 'Relational data with eight isolated schemas, one per service.', usedIn: 'SilverLink SG, SCS Awareness Platform' },
  { label: 'SUPA', name: 'Supabase', group: 'backend', blurb: 'Auth, storage and row-level security for a public-facing app.', usedIn: 'SCS Awareness Platform' },
  { label: 'DOCKER', name: 'Docker', group: 'backend', blurb: 'Packaging services so they run the same everywhere.', usedIn: 'SilverLink SG' },
  { label: 'KUBE', name: 'Kubernetes', group: 'backend', blurb: 'Running services on an 8-node cluster that scales ahead of demand.', usedIn: 'SilverLink SG' },
  { label: 'GIT', name: 'Git', group: 'backend', blurb: 'Branching, reviews and clean history across every team project.', usedIn: 'Every project' },
  { label: 'TS', name: 'TypeScript', group: 'frontend', blurb: 'Typed front ends that catch mistakes before users do.', usedIn: 'SCS Awareness Platform, this portfolio' },
  { label: 'REACT', name: 'React', group: 'frontend', blurb: 'Interactive interfaces, from a branching story engine to an admin panel.', usedIn: 'SCS Awareness Platform, SilverLink SG' },

  // Row 4
  { label: 'NEXT', name: 'Next.js', group: 'frontend', blurb: 'Server-rendered pages for a fast first load.', usedIn: 'SilverLink SG' },
  { label: 'TWIND', name: 'Tailwind CSS', group: 'frontend', blurb: 'Consistent, responsive styling without fighting the stylesheet.', usedIn: 'SCS Awareness Platform, this portfolio' },
  { label: 'KOTLIN', name: 'Kotlin', group: 'frontend', blurb: 'Native Android with Jetpack Compose and on-device ML.', usedIn: 'Fire Safety Drill Companion' },
  { label: 'ARCORE', name: 'ARCore', group: 'frontend', blurb: 'Augmented-reality navigation that works fully offline.', usedIn: 'Fire Safety Drill Companion' },
  { label: 'AGILE', name: 'Agile / Scrum', group: 'ways', blurb: 'Seven-sprint team projects with planning, reviews and burndown charts.', usedIn: 'SilverLink SG, SCS Awareness Platform' },
  { label: 'UAT', name: 'User acceptance testing', group: 'ways', blurb: 'Testing with real users before go-live and tracking 50+ defects to resolution.', usedIn: 'Sembcorp Solar' },
  { label: 'REQS', name: 'Requirements gathering', group: 'ways', blurb: 'Turning what stakeholders say into changes a team can build.', usedIn: 'Sembcorp Solar, LGA Telecom' },
];

// ── Filters ──────────────────────────────────────────────────────────────

export type Category = 'ai' | 'data' | 'frontend' | 'backend' | 'infra' | 'workflow';
export type Filter = Category | 'all';

export const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'data', label: 'Data' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'infra', label: 'Infrastructure' },
  { id: 'workflow', label: 'Workflow' },
];

const CATEGORY: Record<string, Category> = {
  PROMPT: 'ai', RAG: 'ai', LLM: 'ai', GUARD: 'ai', HUMAN: 'ai',
  PYTHON: 'data', PANDAS: 'data', SKLRN: 'data', NUMPY: 'data', SQL: 'data', ETL: 'data', BI: 'data',
  NODE: 'backend', GRPC: 'backend', PGSQL: 'backend', SUPA: 'backend',
  DOCKER: 'infra', KUBE: 'infra', GIT: 'infra',
  TS: 'frontend', REACT: 'frontend', NEXT: 'frontend', TWIND: 'frontend', KOTLIN: 'frontend', ARCORE: 'frontend',
  AGILE: 'workflow', UAT: 'workflow', REQS: 'workflow',
};

export const inFilter = (k: Key, f: Filter) => f === 'all' || CATEGORY[k.label] === f;

/** Case studies named in a key's "used in" line. Only exact project names with
 *  a case-study page count, so Desk Assist, Sembcorp and "every project" get none. */
export function projectsFor(k: Key) {
  const named = k.usedIn.split(',').map(s => s.trim());
  return PROJECTS.filter(p => p.link.startsWith('/projects/') && named.includes(p.name));
}

export const iconUrl = (k: Key) => `/assets/skills/${k.label.toLowerCase()}.svg`;

export type Cap = {
  face: string;  // top face
  bar: string;   // label strip along the front edge
  side: string;  // 3D cap sides
  ink: string;   // icon, number and label colour
  text: string;  // printed label, e.g. SKLEARN
  no: string;    // two-digit key number, 01-28
};

export function capFor(k: Key, i: number): Cap {
  const { way, text } = CAP[k.label] ?? { way: 'cream' };
  return { ...WAYS[way], text: text ?? k.label, no: String(i + 1).padStart(2, '0') };
}

/** Retro filename for the tooltip and detail window, e.g. python.info */
export const fileName = (cap: Cap) => `${cap.text.toLowerCase()}.info`;

// Muted caps (filter mismatch): desaturated at constant luminance, then dimmed,
// both in linear light, so legend contrast stays at or above 4.5:1 (lowest:
// amber bar/black 4.8:1). The 3D board applies the same maths in its shader.
export const MUTE = { desaturate: 0.85, dim: 0.7 };

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

export function muteHex(hex: string) {
  const rgb = [1, 3, 5].map(n => toLinear(parseInt(hex.slice(n, n + 2), 16) / 255));
  const lum = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return '#' + rgb
    .map(c => Math.round(toSrgb((c + (lum - c) * MUTE.desaturate) * MUTE.dim) * 255).toString(16).padStart(2, '0'))
    .join('');
}

/** Accessible name: the full name, plus the printed label when it isn't part of it
 *  (so voice control can say what it sees, e.g. "RAG"). */
export function keyName(k: Key, cap: Cap) {
  return k.name.toLowerCase().includes(cap.text.toLowerCase()) ? k.name : `${k.name} (${cap.text})`;
}
