import type { ReactNode } from 'react';
import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader from '@/components/case/CaseHeader';
import { CaseSection, SubHeading, TechStack } from '@/components/case/CaseBlocks';
import ScreenGallery, { type Shot } from '@/components/case/ScreenGallery';
import FlowDiagram, { type FlowStep } from '@/components/FlowDiagram';
import { PixelList } from '@/components/Hierarchy';

import uatDashboardImg  from '@assets/uat_dashboard_full.png';
import uatDefectsImg    from '@assets/uat_defects.png';
import uatDetailImg     from '@assets/uat_defect_detail.png';
import uatTestcasesImg  from '@assets/uat_testcases.png';
import uatReportsImg    from '@assets/uat_reports_full.png';

const HERO_SHOT: Shot = {
  file: 'dashboard.png', src: uatDashboardImg, width: 1440, height: 922,
  caption: 'Dashboard: status, pass rate, severity and monthly trend.',
  alt: 'UAT Executive Dashboard with sample data: 25 defects (14 open, 5 in progress, 6 resolved), 35 test cases (11 passed, 24 failed), a defects-by-severity bar chart and a monthly trend chart.',
};

const SHOTS: Shot[] = [
  {
    file: 'defects.png', src: uatDefectsImg, width: 1440, height: 900,
    caption: 'Defect register: 25 sample defects, filterable by module, severity, status.',
    alt: 'Defect Management table listing defects DEF-016 to DEF-025 with title, module, severity, status and assignee, plus search, filters and a Log defect button.',
  },
  {
    file: 'defect_detail.png', src: uatDetailImg, width: 1440, height: 900,
    caption: 'DEF-025: expected vs actual result and steps to reproduce.',
    alt: "Defect detail for DEF-025, 'Notification Service Crashes Under High Load': open, critical, P1. Expected: notifications processed without a crash. Actual: service crashes and pending notifications are lost.",
  },
  {
    file: 'test_cases.png', src: uatTestcasesImg, width: 1440, height: 900,
    caption: '35 sample test cases, failures linked to defects.',
    alt: 'Test Case Management table of test cases with module, pass or fail status, linked defect code and who ran each one.',
  },
  {
    file: 'reports.png', src: uatReportsImg, width: 1440, height: 1146,
    caption: 'Reports: breakdowns by module and status, with CSV export.',
    alt: 'Analytics and Reports page with donut charts of defects by module and by status, a stacked bar chart of passed and failed tests per module, and Export defects and Export test cases buttons.',
  },
];

type Level = 'Critical' | 'High' | 'Medium' | 'Low';

// The word carries the meaning; the fill only helps scanning (.badge in index.css).
const LEVEL_BADGE: Record<Level, string> = {
  Critical: 'badge badge--ink',
  High: 'badge badge--data',
  Medium: 'badge badge--paper',
  Low: 'badge badge--paper',
};

function LevelBadge({ level }: { level: Level }) {
  return <span className={LEVEL_BADGE[level]}>{level}</span>;
}

const MODULES: { name: string; defects: number; risk: Level }[] = [
  { name: 'Appointment Scheduling', defects: 5, risk: 'High' },
  { name: 'User Authentication',    defects: 5, risk: 'High' },
  { name: 'Notifications',          defects: 4, risk: 'Critical' },
  { name: 'Billing & Payments',     defects: 4, risk: 'High' },
  { name: 'Medical Records',        defects: 3, risk: 'Medium' },
  { name: 'Patient Registration',   defects: 2, risk: 'Medium' },
  { name: 'Doctor Management',      defects: 1, risk: 'Low' },
  { name: 'Reports & Analytics',    defects: 1, risk: 'Low' },
];

const CELL = 'border-b-2 border-black py-3 align-middle';

// Below sm the risk badge sits under the module name, so three columns never
// squeeze a 289px body; the scrolling region is only a safety net.
function ModuleTable() {
  return (
    <div role="region" aria-labelledby="test-scope-heading" tabIndex={0} className="overflow-x-auto max-w-[65ch]">
      <table aria-labelledby="test-scope-heading" className="w-full border-collapse font-sans text-[15px] sm:text-base text-[color:var(--text)]">
        <thead>
          <tr className="text-left text-black">
            <th scope="col" className={`${CELL} border-b-[3px] pr-4`}>
              Module<span className="sm:hidden"> and risk</span>
            </th>
            <th scope="col" className={`${CELL} border-b-[3px] pl-4 sm:px-4 text-right`}>Defects</th>
            <th scope="col" className={`${CELL} border-b-[3px] pl-4 hidden sm:table-cell`}>Risk</th>
          </tr>
        </thead>
        <tbody>
          {MODULES.map(m => (
            <tr key={m.name}>
              <th scope="row" className={`${CELL} pr-4 text-left font-normal break-words`}>
                {m.name}
                <span className="block mt-2 sm:hidden"><LevelBadge level={m.risk} /></span>
              </th>
              <td className={`${CELL} pl-4 sm:px-4 text-right tabular-nums`}>{m.defects}</td>
              <td className={`${CELL} pl-4 hidden sm:table-cell`}><LevelBadge level={m.risk} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SEVERITY: { level: Level; priority: string; desc: string }[] = [
  { level: 'Critical', priority: 'P1', desc: 'Unusable or data at risk; blocks go-live.' },
  { level: 'High',     priority: 'P2', desc: 'Core feature broken; major workaround.' },
  { level: 'Medium',   priority: 'P3', desc: 'Degraded; minor workaround exists.' },
  { level: 'Low',      priority: 'P4', desc: 'Cosmetic or edge case.' },
];

function SeverityList() {
  return (
    <dl className="max-w-[65ch] font-sans text-[15px] sm:text-base leading-[1.65]">
      {SEVERITY.map(({ level, priority, desc }) => (
        <div key={level} className="flex flex-col sm:flex-row sm:items-baseline gap-x-4 gap-y-2 border-b-2 border-black py-3">
          <dt className="flex flex-shrink-0 items-center gap-3 sm:w-44 font-bold text-black">
            <LevelBadge level={level} />
            {priority}
          </dt>
          <dd className="text-[color:var(--text)]">{desc}</dd>
        </div>
      ))}
    </dl>
  );
}

const RECORD: { label: string; value: ReactNode }[] = [
  { label: 'Code', value: 'TC-022' },
  { label: 'Module', value: 'Notifications' },
  { label: 'Status', value: <span className="badge badge--ink">Fail</span> },
  { label: 'Linked defect', value: 'DEF-025' },
  { label: 'Title', value: 'Verify Notification Service Stability Under High Load' },
  { label: 'Preconditions', value: 'Active notification queue, 100+ pending items, signed in as QA Tester.' },
];

function TestCaseRecord() {
  return (
    <div className="border-2 border-black p-4 sm:p-6 max-w-[75ch] font-sans text-[15px] sm:text-base leading-[1.65] text-[color:var(--text)] space-y-6">
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {RECORD.map(({ label, value }) => (
          <div key={label} className={label === 'Title' || label === 'Preconditions' ? 'sm:col-span-2' : undefined}>
            <dt className="font-bold text-black">{label}</dt>
            <dd className="mt-1">{value}</dd>
          </div>
        ))}
      </dl>
      <div>
        <p className="font-bold text-black">Test steps</p>
        <ol className="mt-1 list-decimal pl-6 space-y-1">
          <li>Queue 100+ notifications at once</li>
          <li>Monitor service health</li>
          <li>Watch behaviour under load</li>
        </ol>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 text-black">
        <div className="border-2 border-black bg-[var(--blue)] p-3">
          <p className="font-bold">Expected</p>
          <p>Notifications processed in queue without crash</p>
        </div>
        <div className="border-2 border-black bg-[var(--bar)] text-[color:var(--paper)] p-3">
          <p className="font-bold">Actual</p>
          <p>Service crashes, all pending notifications lost</p>
        </div>
      </div>
    </div>
  );
}

// From a failed test to a closed defect, using the lifecycle states on the site
const DEFECT_FLOW: FlowStep[] = [
  { label: 'Run test case' },
  { label: 'Fail: log defect', detail: 'Linked to the test' },
  { label: 'Triage', detail: 'Severity and priority' },
  { label: 'In progress' },
  { label: 'Resolved' },
  { label: 'Closed or reopened' },
];

export default function UATProject() {
  return (
    <CaseLayout slug="uat">
      <CaseHeader
        slug="uat"
        file="uat_dashboard.exe"
        facts={[
          { icon: 'chip-school', text: 'Course project' },
          { icon: 'icon-projects', text: 'Hospital appointment system' },
          { icon: 'icon-projects', text: 'User roles: PM, QA lead, tester, dev' },
        ]}
        links={[{
          label: 'View source code',
          href: 'https://github.com/johnaaronmendoza/UAT-Testing-Dashboard-Defect-Tracker-for-Hospital-Appointment-System',
          kind: 'repo',
        }]}
        stats={[
          { value: '8', label: 'modules' },
          { value: '4', label: 'user roles' },
          { value: '25', label: 'sample defects' },
          { value: '35', label: 'sample test cases' },
        ]}
        heroShot={HERO_SHOT}
      />

      <CaseSection
        id="problem"
        heading="The problem"
        icon="icon-about"
        lead="UAT teams need one view of what **blocks go-live**; spreadsheets break down fast."
      />

      <CaseSection
        id="what"
        heading="What it does"
        icon="icon-projects"
        lead="Logs defects and test runs, and links every **failed test** to its defect."
        file="what_it_does.md"
      >
        <PixelList
          items={[
            'Defects carry **severity**, priority, expected vs actual and steps to reproduce.',
            'Charts defects by severity, module and status, plus a **monthly trend**.',
            '**One-click CSV** export; separate access for each of the 4 roles.',
          ]}
        />
      </CaseSection>

      <ScreenGallery shots={SHOTS} />

      <CaseSection
        id="how"
        heading="How it works"
        icon="icon-skills"
        lead="A **foreign key** from test cases to defects keeps every failure traceable."
        file="how_it_works.md"
      >
        <div className="space-y-12">
          <div className="space-y-8 lg:space-y-10">
            <FlowDiagram steps={DEFECT_FLOW} labelledBy="how-heading" lgCols={3} />
            <PixelList
              items={[
                '**Express + SQLite** REST API with request logging.',
                'React 18 front end; **Recharts** for analytics.',
                'A seed script loads the **sample data** on first run.',
              ]}
            />
          </div>

          <div className="space-y-4">
            <SubHeading>Severity drives priority</SubHeading>
            <SeverityList />
          </div>

          <div className="space-y-4">
            <SubHeading><span id="test-scope-heading">Test scope: 8 modules (sample data)</span></SubHeading>
            <ModuleTable />
          </div>

          <div className="space-y-4">
            <SubHeading>Sample test case TC-022</SubHeading>
            <TestCaseRecord />
          </div>
        </div>
      </CaseSection>

      <CaseSection id="stack" heading="Tech stack" icon="floppy" file="stack.txt">
        <TechStack
          tags={['React 18', 'Vite', 'Tailwind CSS', 'Recharts', 'React Router', 'Node.js', 'Express', 'SQLite']}
          more={{ label: 'Also', tags: ['Axios', 'Sonner', 'Lucide', 'Morgan'] }}
        />
      </CaseSection>
    </CaseLayout>
  );
}
