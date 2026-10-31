import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader, { GITHUB_PROFILE } from '@/components/case/CaseHeader';
import { CaseSection, LeadS, SubHeading, TechStack } from '@/components/case/CaseBlocks';
import ScreenGallery, { type Shot } from '@/components/case/ScreenGallery';
import FlowDiagram, { type FlowStep } from '@/components/FlowDiagram';
import { PixelList } from '@/components/Hierarchy';
import storyPlayerImg from '@assets/scs_p65_img0.png';
import adminDashImg from '@assets/scs_p71_img1.png';
import panelEditorImg from '@assets/scs_p72_img0.png';
import statsImg from '@assets/scs_p72_img1.png';
import assetManagerImg from '@assets/scs_p73_img0.png';
// Email column already redacted in this file
import adminMgmtImg from '@assets/scs_p74_img1.png';

const HERO_SHOT: Shot = {
  file: 'story_player.png', src: storyPlayerImg, width: 532, height: 843,
  caption: 'Story player on a booth tablet (template text).',
  alt: 'Story player on a tablet: a pixel-art boy in an office scene above a text box, with back and next arrows.',
};

const SHOTS: Shot[] = [
  {
    file: 'panel_editor.png', src: panelEditorImg, width: 1278, height: 985,
    caption: 'Panel editor: 4 language tabs and a tablet preview.',
    alt: "Editor for a true/false question, 'I exercise often I do not need to go for screening!', with English, Chinese, Malay and Tamil tabs and a live tablet preview.",
  },
  {
    file: 'admin_dashboard.png', src: adminDashImg, width: 1887, height: 1006,
    caption: 'Story editor: every panel in order.',
    alt: "Panel Builder screen for 'Main Story' showing 7 panels, 2 text panels and 3 questions, including a single-choice question about colorectal cancer screening.",
  },
  {
    file: 'story_stats.png', src: statsImg, width: 1915, height: 1003,
    caption: 'Story statistics, exportable as CSV.',
    alt: 'Story Statistics page with total attempts, average score and max score, and an Export CSV button.',
  },
  {
    file: 'asset_manager.png', src: assetManagerImg, width: 1884, height: 1005,
    caption: 'Drag-and-drop asset manager.',
    alt: 'Asset Manager with a drag-and-drop upload area, filter tabs and pixel-art sprites of an elderly man.',
  },
  {
    file: 'admin_accounts.png', src: adminMgmtImg, width: 1917, height: 1003,
    caption: 'Admin accounts: verify, promote or remove.',
    alt: 'Admin Management table of admin accounts with roles, verification status and Promote, Demote and Delete actions.',
  },
];

// Two lanes. Staff tasks have no fixed order (one node, unnumbered items);
// a visitor's session is a real sequence.
const STAFF_LANE: FlowStep[] = [
  {
    label: 'Admin panel',
    detail: 'No code',
    items: [
      { label: 'Edit panels' },
      { label: 'Upload sprites' },
      { label: 'Translate', detail: 'MyMemory API' },
      { label: 'Export analytics' },
    ],
  },
];

const VISITOR_LANE: FlowStep[] = [
  { label: 'PDPA consent' },
  { label: 'Story and questions', detail: '4 question types, branching' },
  { label: 'Score' },
  { label: 'Top-10 leaderboard' },
];

export default function SCSProject() {
  return (
    <CaseLayout slug="scs">
      <CaseHeader
        slug="scs"
        file="scs_awareness.exe"
        facts={[
          { icon: 'icon-projects', text: 'For Singapore Cancer Society' },
          { icon: 'chip-school', text: 'SIT × University of Glasgow' },
          { icon: 'chip-team', text: 'Group D2, 4 people' },
          { icon: 'icon-experience', text: 'Role: core engine and media' },
        ]}
        links={[GITHUB_PROFILE]}
        stats={[
          { value: '4', label: 'languages' },
          { value: '4', label: 'question types' },
          { value: '4', label: 'people on the team' },
          { value: '7', label: 'Agile sprints' },
        ]}
        heroShot={HERO_SHOT}
      />

      <CaseSection
        id="problem"
        heading="The problem"
        icon="icon-about"
        lead="SCS booths weren't **interactive**, so visitors learned little about **early screening**."
        file="problem.txt"
      >
        <PixelList items={['Many found them dull; others stayed away because of **stigma**.']} />
      </CaseSection>

      <CaseSection
        id="what"
        heading="What it does"
        icon="icon-projects"
        lead="Visitors play a branching story on a booth tablet; staff edit it **without code**."
        file="what_it_does.md"
      >
        <PixelList
          items={[
            '**4 question types**, scores and a top-10 leaderboard.',
            'Plays in **4 languages**: English, Chinese, Malay and Tamil.',
            'Staff edit panels, upload art and **export analytics** to CSV or Excel.',
          ]}
        />
      </CaseSection>

      <ScreenGallery shots={SHOTS} />

      <CaseSection id="part" heading="My part" icon="icon-experience" file="my_part.log">
        <div className="space-y-3 lg:space-y-4">
          <LeadS text="I built the **core engine** and media systems." />
          <PixelList
            items={[
              'The **panel renderer** and multi-sprite character rendering.',
              'A **question bank service** validating all 4 question types.',
              'Admin sign-in, **tablet scaling** and accessibility.',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection
        id="how"
        heading="How it works"
        icon="icon-skills"
        lead="One **React 19** app serves visitors and admins, deployed on Vercel."
        file="how_it_works.md"
      >
        <div className="space-y-8 lg:space-y-10">
          <div className="space-y-3 lg:space-y-4">
            <SubHeading><span id="staff-lane">Staff</span></SubHeading>
            <FlowDiagram steps={STAFF_LANE} labelledBy="staff-lane" numbered={false} />
          </div>
          <div className="space-y-3 lg:space-y-4">
            <SubHeading><span id="visitor-lane">Visitor</span></SubHeading>
            <FlowDiagram steps={VISITOR_LANE} labelledBy="visitor-lane" lgCols={4} />
          </div>
          <PixelList
            items={[
              'Supabase **Row-Level Security** enforces admin roles; visitors pass a **PDPA** consent gate.',
              'Kiosk mode keeps the booth tablet in **full screen**.',
              "**Fair scores**: only panels a visitor reached count; branching choices don't.",
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection id="stack" heading="Tech stack" icon="floppy" file="stack.txt">
        <TechStack
          tags={['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase (PostgreSQL, Auth, Storage)', 'Vercel', 'MyMemory API']}
          more={{ label: 'Methods', tags: ['Agile Scrum, 7 sprints'] }}
        />
      </CaseSection>
    </CaseLayout>
  );
}
