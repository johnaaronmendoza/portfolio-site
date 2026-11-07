// Skills keyboard content, filter categories and keycap colours, shared by the
// 3D board (lazy chunk) and the flat 2D fallback. Content is unchanged from the
// CSS keyboard.

import { PROJECTS } from '@/data/projects';

// One taxonomy: a key's group is its filter, its window label and its colour.
export type GroupId = 'ai' | 'data' | 'frontend' | 'backend' | 'infra' | 'workflow';
export type Filter = GroupId | 'all';

export type Key = {
  label: string;   // short id; also names the icon file /assets/skills/<label>.svg
  name: string;    // full skill name shown beside the board
  group: GroupId;
  blurb: string;   // what it is / how I use it
  usedIn: string;  // where it was used
};

export const GROUP_NAME: Record<GroupId, string> = {
  ai: 'AI',
  data: 'Data',
  frontend: 'Frontend',
  backend: 'Backend',
  infra: 'Infrastructure',
  workflow: 'Workflow',
};

export const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  ...(Object.keys(GROUP_NAME) as GroupId[]).map(id => ({ id, label: GROUP_NAME[id] })),
];

// Keycap colourways in the house palette, with meaning (John, 7 Nov 2026):
// AI orange, Data teal, build (Frontend, Backend, Infrastructure) cream,
// Workflow violet. Cream is the --cream token, not the old sheet's #FBF0DD,
// so the board shares one palette with the windows. WCAG contrast of the ink:
// orange face 8.08, bar 6.65; teal face 9.69, bar 7.23; cream face 15.80,
// bar 10.25; violet face 4.98, bar 8.02. Muted keys use MUTED below.
export const WAYS = {
  orange: { face: '#FF7A2F', bar: '#EC6A22', side: '#B5521A', ink: '#000000' },
  teal:   { face: '#2EC4B6', bar: '#23A99C', side: '#17847A', ink: '#000000' },
  cream:  { face: '#F4EAD5', bar: '#C9BEA6', side: '#ADA28B', ink: '#111111' },
  violet: { face: '#6C4AD0', bar: '#4A2F9E', side: '#3E2788', ink: '#F4EAD5' },
} as const;

export const GROUP_WAY: Record<GroupId, keyof typeof WAYS> = {
  ai: 'orange',
  data: 'teal',
  frontend: 'cream',
  backend: 'cream',
  infra: 'cream',
  workflow: 'violet',
};

// Printed labels that differ from the key's id
const TEXT: Record<string, string> = { SKLRN: 'SKLEARN' };

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
  { label: 'DOCKER', name: 'Docker', group: 'infra', blurb: 'Packaging services so they run the same everywhere.', usedIn: 'SilverLink SG' },
  { label: 'KUBE', name: 'Kubernetes', group: 'infra', blurb: 'Running services on an 8-node cluster that scales ahead of demand.', usedIn: 'SilverLink SG' },
  { label: 'GIT', name: 'Git', group: 'infra', blurb: 'Branching, reviews and clean history across every team project.', usedIn: 'Every project' },
  { label: 'TS', name: 'TypeScript', group: 'frontend', blurb: 'Typed front ends that catch mistakes before users do.', usedIn: 'SCS Awareness Platform, this portfolio' },
  { label: 'REACT', name: 'React', group: 'frontend', blurb: 'Interactive interfaces, from a branching story engine to an admin panel.', usedIn: 'SCS Awareness Platform, SilverLink SG' },

  // Row 4
  { label: 'NEXT', name: 'Next.js', group: 'frontend', blurb: 'Server-rendered pages for a fast first load.', usedIn: 'SilverLink SG' },
  { label: 'TWIND', name: 'Tailwind CSS', group: 'frontend', blurb: 'Consistent, responsive styling without fighting the stylesheet.', usedIn: 'SCS Awareness Platform, this portfolio' },
  { label: 'KOTLIN', name: 'Kotlin', group: 'frontend', blurb: 'Native Android with Jetpack Compose and on-device ML.', usedIn: 'Fire Safety Drill Companion' },
  { label: 'ARCORE', name: 'ARCore', group: 'frontend', blurb: 'Augmented-reality navigation that works fully offline.', usedIn: 'Fire Safety Drill Companion' },
  { label: 'AGILE', name: 'Agile / Scrum', group: 'workflow', blurb: 'Seven-sprint team projects with planning, reviews and burndown charts.', usedIn: 'SilverLink SG, SCS Awareness Platform' },
  { label: 'UAT', name: 'User acceptance testing', group: 'workflow', blurb: 'Testing with real users before go-live and tracking 50+ defects to resolution.', usedIn: 'Sembcorp Solar' },
  { label: 'REQS', name: 'Requirements gathering', group: 'workflow', blurb: 'Turning what stakeholders say into changes a team can build.', usedIn: 'Sembcorp Solar, LGA Telecom' },
];

export const inFilter = (k: Key, f: Filter) => f === 'all' || k.group === f;

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
  return { ...WAYS[GROUP_WAY[k.group]], text: TEXT[k.label] ?? k.label, no: String(i + 1).padStart(2, '0') };
}

/** Retro filename for the tooltip and detail window, e.g. python.info */
export const fileName = (cap: Cap) => `${cap.text.toLowerCase()}.info`;

// Muted caps (filter mismatch): "lights off", a dark neutral cap with a light
// legend, so the state also reads in greyscale (with the key sitting flush,
// without its shadow). Contrast: face/ink 8.10:1, bar/ink 9.88:1.
export const MUTED = { face: '#34343E', bar: '#26262E', side: '#1D1D23', ink: '#D8D1C2' } as const;
export const mutedCap = (cap: Cap): Cap => ({ ...cap, ...MUTED });

/** Accessible name: the full name, plus the printed label when it isn't part of it
 *  (so voice control can say what it sees, e.g. "RAG"). */
export function keyName(k: Key, cap: Cap) {
  return k.name.toLowerCase().includes(cap.text.toLowerCase()) ? k.name : `${k.name} (${cap.text})`;
}
