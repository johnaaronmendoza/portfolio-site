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

// Keycap colourways in the Paper & Ink palette, with meaning (John, Nov 2026):
// AI yellow, Data blue, build (Frontend, Backend, Infrastructure) paper white,
// Workflow ink. WCAG contrast of the legend ink on face / bar:
// yellow 14.6 / 12.6; blue (white legend) 4.64 / 5.9; paper 18.9 / 13.9;
// ink (white legend) 14.4 / 18.9. Muted keys use MUTED below.
export const WAYS = {
  yellow: { face: '#FFD23F', bar: '#E6B92A', side: '#B8901A', ink: '#000000' },
  blue:   { face: '#3A66FF', bar: '#2E55E0', side: '#2241B0', ink: '#FFFFFF' },
  paper:  { face: '#FFFFFF', bar: '#DCD7CB', side: '#B5B0A4', ink: '#111111' },
  ink:    { face: '#2A2A2A', bar: '#111111', side: '#000000', ink: '#FFFFFF' },
} as const;

export const GROUP_WAY: Record<GroupId, keyof typeof WAYS> = {
  ai: 'yellow',
  data: 'blue',
  frontend: 'paper',
  backend: 'paper',
  infra: 'paper',
  workflow: 'ink',
};

// Printed labels that differ from the key's id
const TEXT: Record<string, string> = { SKLRN: 'SKLEARN' };

export const KEYS: Key[] = [
  // Row 1 — AI first: the story this portfolio leads with
  { label: 'PROMPT', name: 'Prompt engineering', group: 'ai', blurb: 'Designing prompts that turn a messy ticket thread into a clear, on-policy draft reply.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'RAG', name: 'Retrieval-augmented generation', group: 'ai', blurb: 'Grounding AI answers in the company knowledge base instead of letting the model guess.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'LLM', name: 'LLM-assisted workflows', group: 'ai', blurb: 'Fitting a language model into a real support workflow, alongside Freshservice.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'GUARD', name: 'AI guardrails', group: 'ai', blurb: 'Least-privilege access, no remotely hosted code, and keeping customer data inside company systems.', usedIn: 'Desk Assist at LGA Telecom' },
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
  { label: 'KUBE', name: 'Kubernetes', group: 'infra', blurb: 'Running services on an 8-node cluster, with an EMA load forecast recommending replicas.', usedIn: 'SilverLink SG' },
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

// Muted caps (filter mismatch): "lights off", a flat warm-grey cap with a dark
// grey legend, distinct from the white build keys and the black workflow keys,
// and the key sits flush without its shadow so the state doesn't rely on colour.
// Contrast: face/ink 6.93:1, bar/ink 5.73:1.
export const MUTED = { face: '#CFCAC0', bar: '#BDB8AE', side: '#A39E94', ink: '#3D3A35' } as const;
export const mutedCap = (cap: Cap): Cap => ({ ...cap, ...MUTED });

/** Accessible name: the full name, plus the printed label when it isn't part of it
 *  (so voice control can say what it sees, e.g. "RAG"). */
export function keyName(k: Key, cap: Cap) {
  return k.name.toLowerCase().includes(cap.text.toLowerCase()) ? k.name : `${k.name} (${cap.text})`;
}
