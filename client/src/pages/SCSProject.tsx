import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader, { GITHUB_PROFILE } from '@/components/case/CaseHeader';
import { CaseSection, CardGrid, FeatureList, Prose, TechStack } from '@/components/case/CaseBlocks';
import ScreenGallery, { type Shot } from '@/components/case/ScreenGallery';
import storyPlayerImg from '@assets/scs_p65_img0.png';
import adminDashImg from '@assets/scs_p71_img1.png';
import panelEditorImg from '@assets/scs_p72_img0.png';
import statsImg from '@assets/scs_p72_img1.png';
import assetManagerImg from '@assets/scs_p73_img0.png';
// Email column already redacted in this file
import adminMgmtImg from '@assets/scs_p74_img1.png';

const SHOTS: Shot[] = [
  {
    file: 'story_player.png', src: storyPlayerImg, width: 532, height: 843, span: 'half',
    caption: 'The story player on a booth tablet (template text shown).',
    alt: 'Story player on a tablet: a pixel-art boy in an office scene above a text box, with back and next arrows.',
  },
  {
    file: 'panel_editor.png', src: panelEditorImg, width: 1278, height: 985, span: 'half',
    caption: "Panel editor: write each language's version and preview it on a tablet frame.",
    alt: "Editor for a true/false question, 'I exercise often I do not need to go for screening!', with English, Chinese, Malay and Tamil tabs and a live tablet preview.",
  },
  {
    file: 'admin_dashboard.png', src: adminDashImg, width: 1887, height: 1006, span: 'full',
    caption: 'Story editor: every panel in order, with counts of text panels and questions.',
    alt: "Panel Builder screen for 'Main Story' showing 7 panels, 2 text panels and 3 questions, including a single-choice question about colorectal cancer screening.",
  },
  {
    file: 'story_stats.png', src: statsImg, width: 1915, height: 1003, span: 'half',
    caption: 'Story statistics, ready to export as CSV.',
    alt: 'Story Statistics page with total attempts, average score and max score, and an Export CSV button.',
  },
  {
    file: 'asset_manager.png', src: assetManagerImg, width: 1884, height: 1005, span: 'half',
    caption: 'Asset manager: drag and drop sprites and backgrounds.',
    alt: 'Asset Manager with a drag-and-drop upload area, filter tabs and pixel-art sprites of an elderly man.',
  },
  {
    file: 'admin_accounts.png', src: adminMgmtImg, width: 1917, height: 1003, span: 'full',
    caption: 'Admin accounts: verify, promote or remove admins.',
    alt: 'Admin Management table of admin accounts with roles, verification status and Promote, Demote and Delete actions.',
  },
];

export default function SCSProject() {
  return (
    <CaseLayout slug="scs">
      <CaseHeader
        slug="scs"
        file="scs_awareness.exe"
        meta={[
          { label: 'Type', value: 'Team project for the Singapore Cancer Society, SIT × University of Glasgow', wide: true },
          { label: 'Team', value: 'Group D2, 4 people' },
          { label: 'My role', value: 'Core engine and media systems' },
        ]}
        links={[GITHUB_PROFILE]}
        stats={[
          { value: '4', label: 'languages' },
          { value: '4', label: 'question types' },
          { value: '4', label: 'people on the team' },
          { value: '7', label: 'Agile sprints' },
        ]}
      />

      <CaseSection id="problem" heading="The problem" icon="icon-about" file="problem.txt">
        <Prose>
          <p>
            SCS runs community booths to raise cancer awareness and encourage early screening. The
            booths weren't interactive: many visitors found them dull or stayed away because of
            stigma, so they learned little and showed less interest in screening.
          </p>
        </Prose>
      </CaseSection>

      <CaseSection id="what" heading="What it does" icon="icon-projects" file="what_it_does.md">
        <CardGrid
          cols={2}
          cards={[
            {
              title: 'For visitors at the booth',
              items: [
                'Play a branching story with pixel-art characters',
                'Answer 4 question types: single choice, multiple choice, true/false and branching',
                'Play in English, Chinese, Malay or Tamil',
                'See their score and a top-10 leaderboard with their own rank',
                'Agree to a PDPA consent notice before playing (staff can edit the wording)',
                'Get confetti and a sound when they answer correctly',
              ],
            },
            {
              title: 'For SCS staff, with no code',
              body: 'SCS staff run everything from a no-code admin panel:',
              items: [
                'Edit panels in a WYSIWYG editor with live preview',
                'Upload sprites and backgrounds by drag and drop',
                "See a story's branches as a colour-coded flow map (6 colours)",
                'View analytics and export them to Excel or CSV',
                'Auto-translate text with the MyMemory API',
                'Manage admin and super admin accounts',
              ],
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="part" heading="My part" icon="icon-experience" file="my_part.log">
        <div className="space-y-6">
          <Prose lead="I built the core engine and media systems:" />
          <FeatureList
            columns={2}
            items={[
              'The visual novel engine (the panel renderer)',
              'Multi-sprite character rendering',
              'Text animation and font controls',
              'Button sound effects and haptic feedback',
              'The question bank service, with editor validation for all 4 question types',
              'Admin sign-in and sign-up',
              'Tablet scaling and accessibility',
              'Bug fixing and integration testing',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection id="how" heading="How it works" icon="icon-skills" file="how_it_works.md">
        <CardGrid
          cols={2}
          cards={[
            { title: 'One app, two audiences', body: 'A single React 19 app serves visitors and admins, deployed together on Vercel from GitHub.' },
            { title: 'Access enforced in the database', body: 'Supabase Row-Level Security applies the admin and super admin roles at the database, not only in the UI.' },
            { title: 'Built for a booth', body: 'Kiosk mode keeps the tablet in full screen.' },
            { title: 'Fair scores', body: "The maximum score counts only the panels a visitor reached, and branching choices aren't scored." },
            { title: 'Safe editing', body: 'Deleted panels can be restored, and staff choose what happens after a game (replay or open a link).' },
          ]}
        />
      </CaseSection>

      <ScreenGallery shots={SHOTS} />

      <CaseSection id="stack" heading="Tech stack" icon="floppy" file="stack.txt">
        <TechStack
          tags={['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase (PostgreSQL, Auth, Storage)', 'Vercel', 'MyMemory API']}
          more={{ label: 'Methods', tags: ['Agile Scrum, 7 sprints'] }}
        />
      </CaseSection>
    </CaseLayout>
  );
}
