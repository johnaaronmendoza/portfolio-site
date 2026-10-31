import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader, { GITHUB_PROFILE } from '@/components/case/CaseHeader';
import { CaseSection, CardGrid, FeatureList, FigureList, Prose, TechStack } from '@/components/case/CaseBlocks';
import ScreenGallery, { type Shot } from '@/components/case/ScreenGallery';
import onboardingImg from '@assets/firesafety_p29_img1.png';
import dashboardImg from '@assets/firesafety_p29_img2.png';
import drillSetupImg from '@assets/firesafety_p29_img3.png';
import floorplanImg from '@assets/firesafety_p29_img4.png';
import arImg from '@assets/firesafety_p29_img5.png';
import extinguisherImg from '@assets/firesafety_p30_img0.png';
import quizImg from '@assets/firesafety_p30_img1.png';
import analyticsImg from '@assets/firesafety_p30_img3.png';

const SHOTS: Shot[] = [
  {
    file: 'onboarding.png', src: onboardingImg, width: 896, height: 564, span: 'half',
    caption: 'Onboarding: quick intros to scanning extinguishers and safety alerts.',
    alt: "Three phone screens: the app's shield-and-flame logo, an onboarding card 'Scan Extinguisher' and an onboarding card 'Stay Informed'.",
  },
  {
    file: 'dashboard.png', src: dashboardImg, width: 605, height: 520, span: 'half',
    caption: 'Home: start a drill, or open the floor plan, extinguisher ID, quiz and history.',
    alt: 'Fire Safety Drill home screen with a Start drill button and menu items for floor plan, extinguisher ID, safety quiz, history and settings.',
  },
  {
    file: 'drill_setup.png', src: drillSetupImg, width: 790, height: 487, span: 'half',
    caption: 'Drill setup: choose slab or point block, then your unit.',
    alt: 'Drill Setup screens: a unit dropdown and a summary for Block 123 Ang Mo Kio Ave 4, floor 12, unit 12-01, with a Start drill button.',
  },
  {
    file: 'floor_plan.png', src: floorplanImg, width: 586, height: 1041, span: 'half',
    caption: 'Floor plan: tap a room and Dijkstra draws the shortest route to the nearest exit.',
    alt: 'Floor Plan screens: a node graph of rooms, stairwells and exits, with the shortest route drawn in red from the chosen unit to an exit, for slab and point blocks.',
  },
  {
    file: 'ar_navigation.png', src: arImg, width: 436, height: 737, span: 'half',
    caption: 'AR drill: arrows on the camera view lead to the exit.',
    alt: "AR Drill screens: red chevron arrows over a live corridor view, a display of steps, distance and time, a 'Path lost' warning and tips for fixing tracking.",
  },
  {
    file: 'extinguisher_id.png', src: extinguisherImg, width: 911, height: 744, span: 'half',
    caption: 'Extinguisher ID: names the type and the fires it suits, processed on the phone.',
    alt: "Extinguisher ID screen framing a red extinguisher, labelled CO2 at 78% confidence with suitable fire types, next to a 'How to scan' help dialog.",
  },
  {
    file: 'safety_quiz.png', src: quizImg, width: 947, height: 642, span: 'half',
    caption: 'Safety quiz: picture questions with explanations from SCDF guidelines.',
    alt: 'Safety Quiz screens: a question on using the lift in a fire, a question on what to do when the alarm sounds, and a result of 4 out of 8 correct.',
  },
  {
    file: 'analytics.png', src: analyticsImg, width: 754, height: 872, span: 'half',
    caption: 'History: drill times, steps and quiz scores over time, and a shareable certificate.',
    alt: 'Analytics Dashboard screens: drill count, average time and quiz average, trend charts, a printable certificate of completion, and a note that the certificate leaves out name, unit and location.',
  },
];

export default function FireSafetyProject() {
  return (
    <CaseLayout slug="firesafety">
      <CaseHeader
        slug="firesafety"
        file="fire_safety_drill.apk"
        meta={[
          { label: 'Type', value: 'Team project, INF2007 Mobile App Development, SIT', wide: true },
          { label: 'Team', value: 'Group 16' },
          { label: 'My role', value: 'Algorithms and AR' },
          { label: 'Sprints', value: '3 Agile sprints' },
          { label: 'Platform', value: 'Android, Pixel 6a' },
        ]}
        links={[GITHUB_PROFILE]}
        stats={[
          { value: '79/100', label: 'SUS usability score' },
          { value: '~80%', label: 'test coverage' },
          { value: '4', label: 'languages' },
          { value: '9/9', label: 'backlog items, plus 6 extra' },
        ]}
      />

      <CaseSection id="problem" heading="The problem" icon="icon-about" file="problem.txt">
        <Prose>
          <p>
            About 1.1 million HDB flats house 80% of Singapore's population, many in blocks over 20
            storeys. SCDF fire drills have consistently low turnout, especially among elderly
            residents facing mobility issues, language barriers or unfamiliar escape routes.
          </p>
        </Prose>
      </CaseSection>

      <CaseSection id="what" heading="What it does" icon="icon-projects" file="what_it_does.md">
        <div className="space-y-6">
          <Prose lead="Residents rehearse on demand, inside their own block, without a group drill or SCDF supervision." />
          <FeatureList
            items={[
              'Pick your block type and unit, then follow AR arrows to the nearest exit',
              'See the route on a 2D floor plan',
              'Mark a stairwell as smoke-filled and watch the route re-plan',
              'Point the camera at an extinguisher to identify its type',
              'Take a picture-based safety quiz with read-aloud',
              'Track drill times, steps and quiz scores, and share a completion certificate',
              'Get drill reminders by push notification, in English, Chinese, Tamil or Malay',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection id="part" heading="My part" icon="icon-experience" file="my_part.log">
        <div className="space-y-6">
          <Prose lead="I built the algorithms and AR (49 of the team's 120 commits):" />
          <FeatureList
            columns={2}
            items={[
              'Dijkstra shortest-path routing that re-plans when a stairwell is blocked',
              'Nearest-exit search across every exit node (findPathToNearestExit())',
              'ARCore session lifecycle, AR corridor rendering and waypoint placement',
              '3D-to-2D projection between the AR scene and the floor-plan graph (ArWaypointConverter)',
              'Tuned step-based positioning (PDR) fusing accelerometer and gyroscope',
              'Thread-safe path computation (@Synchronized)',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection id="decisions" heading="Key decisions" icon="icon-skills" file="key_decisions.md">
        <CardGrid
          cols={3}
          cards={[
            { title: "Works when the network doesn't", body: 'Routing, ML and data all run on the phone, so a drill still works offline.' },
            { title: 'Routing', body: 'O((V+E) log V) priority-queue Dijkstra on JSON floor-plan graphs; blockedNodes removes smoke-filled stairwells and re-routes.' },
            { title: 'Positioning without GPS or Wi-Fi', body: 'Weinberg stride estimation (K × amplitude^0.25) fused with accelerometer, gyroscope and step counter, aiming for metre-level accuracy indoors.' },
            { title: 'AR on the camera feed', body: 'ARCore draws breadcrumb arrows; the converter maps graph coordinates to metres with origin offset and viewport transforms.' },
            { title: 'On-device ML', body: 'TFLite with YOLO classifies extinguishers (powder, water, CO₂) from CameraX frames, with no network delay.' },
            { title: 'Local history', body: 'Room database v3 with three tables (drill history, quiz scores, SUS scores), tested migrations v1 → v2 → v3, and Flow queries that keep charts current.' },
            { title: 'Reminders', body: 'Firebase Cloud Messaging push reminders, localised in all 4 languages.' },
          ]}
        />
      </CaseSection>

      <ScreenGallery shots={SHOTS} />

      <CaseSection id="outcome" heading="Outcome" icon="icon-results" file="outcome.txt">
        <div className="space-y-6">
          <Prose>
            <p>
              Delivered all 9 backlog items plus 6 extra in 3 Agile sprints, with a SUS usability
              score of 79/100 and about 80% test coverage.
            </p>
          </Prose>
          <FigureList
            items={[
              { value: '10,984', label: 'lines of Kotlin' },
              { value: '5,458', label: 'lines of tests' },
              { value: '26', label: 'test files' },
              { value: '120', label: 'commits' },
            ]}
          />
        </div>
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
