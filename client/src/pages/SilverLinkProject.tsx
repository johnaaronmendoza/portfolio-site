import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader, { GITHUB_PROFILE } from '@/components/case/CaseHeader';
import { CaseSection, TechStack } from '@/components/case/CaseBlocks';
import ScreenGallery, { type Shot } from '@/components/case/ScreenGallery';
import FlowDiagram, { type FlowStep } from '@/components/FlowDiagram';
import { PixelList } from '@/components/Hierarchy';
import eventsImg from '@assets/silverlink_p19_img0.png';
import eventDetailImg from '@assets/silverlink_p21_img0.png';
import livestreamImg from '@assets/silverlink_p22_img0.png';
import metricsImg from '@assets/silverlink_p23_img0.png';
import onboardingImg from '@assets/silverlink_p14_img0.png';

const HERO_SHOT: Shot = {
  file: 'events_discovery.png', src: eventsImg, width: 873, height: 560,
  caption: 'Events: workshops and livestreams.',
  alt: 'Grid of SilverLink event cards, such as Online Morning Tai Chi (livestream) and Smartphone Basics for Seniors at Yishun Community Centre, with View details and Watch live buttons.',
};

const SHOTS: Shot[] = [
  {
    file: 'onboarding_flow.png', src: onboardingImg, width: 1172, height: 599,
    caption: 'Five-step onboarding.',
    alt: "SilverLink onboarding, step 1 of 5: a 'Welcome to SilverLink!' card with a progress bar and Back and Next buttons.",
  },
  {
    file: 'event_detail.png', src: eventDetailImg, width: 640, height: 428,
    caption: 'Book or cancel a session; capacity shown.',
    alt: 'Event page for a Traditional Peranakan Cooking Workshop at Toa Payoh Community Centre, listing three sessions with capacity counts and Book or Cancel booking buttons.',
  },
  {
    file: 'livestream_studio.png', src: livestreamImg, width: 700, height: 392,
    caption: 'Livestream studio with live chat.',
    alt: 'Livestream Studio page with a live camera preview, Stop broadcast, Mute and Camera off controls, and a live chat panel.',
  },
  {
    file: 'system_metrics.png', src: metricsImg, width: 862, height: 415,
    caption: 'Load forecast and recommended replica count.',
    alt: 'System Metrics dashboard showing requests per second, queue length, 212 ms average response time, a load forecast and an autoscaling recommendation of 1 replica (min 1, max 10).',
  },
];

// Tiers, top to bottom; the four services are parallel, so nothing is numbered
const TIERS: FlowStep[] = [
  { label: 'React front end' },
  { label: 'API gateway', detail: 'REST to gRPC' },
  { label: 'gRPC services', items: [{ label: 'Event' }, { label: 'Booking' }, { label: 'Volunteer' }, { label: 'User' }] },
  { label: '8 isolated schemas', detail: 'Neon PostgreSQL' },
];

export default function SilverLinkProject() {
  return (
    <CaseLayout slug="silverlink">
      <CaseHeader
        slug="silverlink"
        file="silverlink_sg.exe"
        facts={[
          { icon: 'icon-projects', text: 'Team project' },
          { icon: 'chip-school', text: 'SIT × University of Glasgow' },
          { icon: 'chip-team', text: 'Group 20, 6 people' },
        ]}
        note="Team: Danish, John, Thomas, Hanaa, Habib, Joshua"
        links={[GITHUB_PROFILE]}
        stats={[
          { value: '4', label: 'gRPC microservices' },
          { value: '8', label: 'Kubernetes nodes' },
          { value: '8', label: 'isolated database schemas' },
          { value: '7', label: 'Agile sprints' },
        ]}
        heroShot={HERO_SHOT}
      />

      <CaseSection
        id="problem"
        heading="The problem"
        icon="icon-about"
        lead="By 2030, **1 in 4** Singaporeans will be over 65."
        file="problem.txt"
      >
        <PixelList
          items={[
            'Many seniors face **isolation** and are left out of digital life.',
            'Young people miss what **older generations** can teach.',
          ]}
        />
      </CaseSection>

      <CaseSection
        id="what"
        heading="What it does"
        icon="icon-projects"
        lead="A web platform where seniors and youth **swap skills** and meet at events."
        file="what_it_does.md"
      >
        <PixelList
          items={[
            '**Book seats** at workshops, mentoring sessions and community events.',
            'Host or watch **livestreams** with live chat.',
            'Pick up **volunteering tasks** and earn badges.',
          ]}
        />
      </CaseSection>

      <ScreenGallery shots={SHOTS} />

      <CaseSection
        id="how"
        heading="How it works"
        icon="icon-skills"
        lead="**4 gRPC services** behind one REST gateway, each with its own database schema."
        file="how_it_works.md"
      >
        <div className="space-y-8 lg:space-y-10">
          <FlowDiagram steps={TIERS} labelledBy="how-heading" numbered={false} />
          <PixelList
            items={[
              '**Optimistic concurrency** returns 409 Conflict instead of overbooking.',
              '**Idempotency keys** make each request run exactly once.',
              'An **EMA load forecast** recommends replicas per service.',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection id="stack" heading="Tech stack" icon="floppy" file="stack.txt">
        <TechStack
          tags={['React', 'Next.js', 'Node.js', 'gRPC', 'Docker', 'Kubernetes', 'PostgreSQL (Neon)', 'Prisma ORM', 'Keycloak', 'Cloudflare Tunnel', 'WebRTC', 'Socket.IO', 'GitHub Actions']}
        />
      </CaseSection>
    </CaseLayout>
  );
}
