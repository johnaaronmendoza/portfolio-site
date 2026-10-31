import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader, { GITHUB_PROFILE } from '@/components/case/CaseHeader';
import { CaseSection, LeadS, TechStack } from '@/components/case/CaseBlocks';
import ScreenGallery, { type Shot } from '@/components/case/ScreenGallery';
import FlowDiagram, { type FlowStep } from '@/components/FlowDiagram';
import { PixelList } from '@/components/Hierarchy';
import StatStrip from '@/components/StatStrip';
import onboardingImg from '@assets/firesafety_p29_img1.png';
import dashboardImg from '@assets/firesafety_p29_img2.png';
import drillSetupImg from '@assets/firesafety_p29_img3.png';
import floorplanImg from '@assets/firesafety_p29_img4.png';
import arImg from '@assets/firesafety_p29_img5.png';
import extinguisherImg from '@assets/firesafety_p30_img0.png';
import quizImg from '@assets/firesafety_p30_img1.png';
import analyticsImg from '@assets/firesafety_p30_img3.png';

const HERO_SHOT: Shot = {
  file: 'ar_navigation.png', src: arImg, width: 436, height: 737,
  caption: 'AR drill: arrows on the camera view.',
  alt: "AR Drill screens: red chevron arrows over a live corridor view, a display of steps, distance and time, a 'Path lost' warning and tips for fixing tracking.",
};

const SHOTS: Shot[] = [
  {
    file: 'onboarding.png', src: onboardingImg, width: 896, height: 564,
    caption: 'Onboarding: extinguisher scans and safety alerts.',
    alt: "Three phone screens: the app's shield-and-flame logo, an onboarding card 'Scan Extinguisher' and an onboarding card 'Stay Informed'.",
  },
  {
    file: 'dashboard.png', src: dashboardImg, width: 605, height: 520,
    caption: 'Home: start a drill or open a tool.',
    alt: 'Fire Safety Drill home screen with a Start drill button and menu items for floor plan, extinguisher ID, safety quiz, history and settings.',
  },
  {
    file: 'drill_setup.png', src: drillSetupImg, width: 790, height: 487,
    caption: 'Drill setup: block type, then unit.',
    alt: 'Drill Setup screens: a unit dropdown and a summary for Block 123 Ang Mo Kio Ave 4, floor 12, unit 12-01, with a Start drill button.',
  },
  {
    file: 'floor_plan.png', src: floorplanImg, width: 586, height: 1041,
    caption: "Floor plan: Dijkstra's shortest route to the nearest exit.",
    alt: 'Floor Plan screens: a node graph of rooms, stairwells and exits, with the shortest route drawn in red from the chosen unit to an exit, for slab and point blocks.',
  },
  {
    file: 'extinguisher_id.png', src: extinguisherImg, width: 911, height: 744,
    caption: 'Extinguisher ID: type and suitable fires, on-device.',
    alt: "Extinguisher ID screen framing a red extinguisher, labelled CO2 at 78% confidence with suitable fire types, next to a 'How to scan' help dialog.",
  },
  {
    file: 'safety_quiz.png', src: quizImg, width: 947, height: 642,
    caption: 'Picture quiz with SCDF-based explanations.',
    alt: 'Safety Quiz screens: a question on using the lift in a fire, a question on what to do when the alarm sounds, and a result of 4 out of 8 correct.',
  },
  {
    file: 'analytics.png', src: analyticsImg, width: 754, height: 872,
    caption: 'History: drill times, quiz scores and a shareable certificate.',
    alt: 'Analytics Dashboard screens: drill count, average time and quiz average, trend charts, a printable certificate of completion, and a note that the certificate leaves out name, unit and location.',
  },
];

// One drill, start to exit; routing re-plans when a stairwell is marked blocked
const DRILL: FlowStep[] = [
  { label: 'Choose block and unit' },
  { label: 'Dijkstra: nearest exit', detail: 'Floor-plan graph', loop: 'Re-plans if a stairwell is blocked' },
  { label: 'Route to AR waypoints' },
  { label: 'AR arrows + step tracking', detail: 'ARCore + PDR' },
  { label: 'Nearest exit' },
];

export default function FireSafetyProject() {
  return (
    <CaseLayout slug="firesafety">
      <CaseHeader
        slug="firesafety"
        file="fire_safety_drill.apk"
        facts={[
          { icon: 'chip-school', text: 'INF2007 Mobile App Development, SIT' },
          { icon: 'chip-team', text: 'Team: Group 16' },
          { icon: 'icon-experience', text: 'Role: algorithms and AR' },
          { icon: 'chip-calendar', text: '3 Agile sprints' },
          { icon: 'chip-phone', text: 'Android, Pixel 6a' },
        ]}
        links={[GITHUB_PROFILE]}
        stats={[
          { value: '79/100', label: 'SUS usability score' },
          { value: '~80%', label: 'test coverage' },
          { value: '4', label: 'languages' },
          { value: '9/9', label: 'backlog items, plus 6 extra' },
        ]}
        heroShot={HERO_SHOT}
      />

      <CaseSection
        id="problem"
        heading="The problem"
        icon="icon-about"
        lead="SCDF fire drills draw **low turnout**, especially among elderly HDB residents."
        file="problem.txt"
      >
        <PixelList
          items={[
            "About 1.1 million HDB flats house **80%** of Singapore's population.",
            'Barriers: mobility, language and **unfamiliar escape routes**.',
          ]}
        />
      </CaseSection>

      <CaseSection
        id="what"
        heading="What it does"
        icon="icon-projects"
        lead="Residents rehearse **on demand** in their own block, no group drill needed."
        file="what_it_does.md"
      >
        <PixelList
          items={[
            'Follow **AR arrows** from your unit to the nearest exit.',
            'Mark a stairwell **smoke-filled** and the route re-plans.',
            '**Scan an extinguisher** to identify its type.',
          ]}
        />
      </CaseSection>

      <ScreenGallery shots={SHOTS} />

      <CaseSection id="part" heading="My part" icon="icon-experience" file="my_part.log">
        <div className="space-y-3 lg:space-y-4">
          <LeadS text="I built the **algorithms and AR**: 49 of the team's 120 commits." />
          <PixelList
            items={[
              '**Dijkstra** routing to the nearest exit, re-planning around blocked stairwells.',
              '**ARCore** corridor rendering, waypoints and 3D-to-2D floor-plan projection.',
              'Tuned step-based positioning (**PDR**) from accelerometer and gyroscope.',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection
        id="how"
        heading="How it works"
        icon="icon-skills"
        lead="Routing, ML and data all run **on the phone**, so drills work offline."
        file="how_it_works.md"
      >
        <div className="space-y-8 lg:space-y-10">
          <FlowDiagram steps={DRILL} labelledBy="how-heading" />
          <PixelList
            items={[
              '**TFLite** with YOLO classifies extinguishers: powder, water or CO₂.',
              '**Weinberg stride estimation** positions without GPS or Wi-Fi.',
              'A **Room** database keeps drill history, quiz and SUS scores.',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection
        id="results"
        heading="Results"
        icon="icon-results"
        lead="A tested codebase: **5,458 lines** of tests across 26 files."
        file="results.txt"
      >
        <StatStrip
          variant="inline"
          stats={[
            { value: '10,984', label: 'lines of Kotlin' },
            { value: '5,458', label: 'lines of tests' },
            { value: '26', label: 'test files' },
            { value: '120', label: 'commits' },
          ]}
        />
      </CaseSection>

      <CaseSection id="stack" heading="Tech stack" icon="floppy" file="stack.txt">
        <TechStack
          tags={['Kotlin', 'Jetpack Compose', 'MVVM', 'Hilt', 'ARCore', 'TensorFlow Lite', 'YOLO', 'CameraX', 'Room', 'Firebase Cloud Messaging']}
          more={{ label: 'Methods', tags: ['Dijkstra', 'Weinberg PDR'] }}
        />
      </CaseSection>
    </CaseLayout>
  );
}
