import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader, { GITHUB_PROFILE } from '@/components/case/CaseHeader';
import { CaseSection, CardGrid, FeatureList, Prose, Quote, TechStack } from '@/components/case/CaseBlocks';
import ScreenGallery, { type Shot } from '@/components/case/ScreenGallery';
import eventsImg from '@assets/silverlink_p19_img0.png';
import eventDetailImg from '@assets/silverlink_p21_img0.png';
import livestreamImg from '@assets/silverlink_p22_img0.png';
import metricsImg from '@assets/silverlink_p23_img0.png';
import onboardingImg from '@assets/silverlink_p14_img0.png';

const SHOTS: Shot[] = [
  {
    file: 'onboarding_flow.png', src: onboardingImg, width: 1172, height: 599, span: 'full',
    caption: 'Onboarding: a five-step setup for new users.',
    alt: "SilverLink onboarding, step 1 of 5: a 'Welcome to SilverLink!' card with a progress bar and Back and Next buttons.",
  },
  {
    file: 'events_discovery.png', src: eventsImg, width: 873, height: 560, span: 'full',
    caption: 'Events: workshops and livestreams, each with region, venue and length.',
    alt: 'Grid of SilverLink event cards, such as Online Morning Tai Chi (livestream) and Smartphone Basics for Seniors at Yishun Community Centre, with View details and Watch live buttons.',
  },
  {
    file: 'event_detail.png', src: eventDetailImg, width: 640, height: 428, span: 'half',
    caption: 'Event page: book or cancel a session, with capacity shown for each.',
    alt: 'Event page for a Traditional Peranakan Cooking Workshop at Toa Payoh Community Centre, listing three sessions with capacity counts and Book or Cancel booking buttons.',
  },
  {
    file: 'livestream_studio.png', src: livestreamImg, width: 700, height: 392, span: 'half',
    caption: 'Livestream studio: the event owner broadcasts while viewers chat.',
    alt: 'Livestream Studio page with a live camera preview, Stop broadcast, Mute and Camera off controls, and a live chat panel.',
  },
  {
    file: 'system_metrics.png', src: metricsImg, width: 862, height: 415, span: 'full',
    caption: 'System metrics: current and forecast load, and the recommended replica count.',
    alt: 'System Metrics dashboard showing requests per second, queue length, 212 ms average response time, a load forecast and an autoscaling recommendation of 1 replica (min 1, max 10).',
  },
];

export default function SilverLinkProject() {
  return (
    <CaseLayout slug="silverlink">
      <CaseHeader
        slug="silverlink"
        file="silverlink_sg.exe"
        meta={[
          { label: 'Type', value: 'Team project, SIT × University of Glasgow', wide: true },
          { label: 'Team', value: 'Group 20, 6 people: Danish, John, Thomas, Hanaa, Habib, Joshua', wide: true },
        ]}
        links={[GITHUB_PROFILE]}
        stats={[
          { value: '4', label: 'gRPC microservices' },
          { value: '8', label: 'Kubernetes nodes' },
          { value: '8', label: 'isolated database schemas' },
          { value: '7', label: 'Agile sprints' },
        ]}
      />

      <CaseSection id="problem" heading="The problem" icon="icon-about" file="problem.txt">
        <div className="space-y-6">
          <Prose>
            <p>
              By 2030, 1 in 4 Singaporeans will be over 65. Many seniors face isolation and are left
              out of digital life, while young people miss out on what older generations can teach them.
            </p>
          </Prose>
          <Quote label="The course brief asked:">
            How might we leverage technology in ways that are intuitive, culturally sensitive, and
            engaging to build community within seniors? (PB-2)
          </Quote>
        </div>
      </CaseSection>

      <CaseSection id="what" heading="What it does" icon="icon-projects" file="what_it_does.md">
        <div className="space-y-6">
          <Prose><p>A web platform where seniors and youth can:</p></Prose>
          <FeatureList
            columns={2}
            items={[
              'Teach and learn skills in workshops and mentoring',
              'Pick up small volunteering tasks',
              'Book seats at community events',
              'Host and watch livestreams (WebRTC)',
              'Chat live during events (Socket.IO)',
              'Earn achievement badges',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection id="how" heading="How it works" icon="icon-skills" file="how_it_works.md">
        <CardGrid
          cols={3}
          cards={[
            { title: 'No double-booking', body: "A booking saves only if the seat record hasn't changed since it was read (optimistic concurrency). A clash returns 409 Conflict instead of overbooking." },
            { title: 'Retries book once', body: 'Idempotency keys make a repeated request return the same result, so each request runs exactly once.' },
            { title: 'Scale before the rush', body: 'An exponential moving average (EMA) forecasts load and sets a recommended replica count per service.' },
            { title: 'One gateway, four services', body: 'An API gateway turns REST calls into gRPC for the Event, Booking, Volunteer and User services.' },
            { title: 'Each service owns its data', body: '8 isolated schemas on Neon serverless PostgreSQL, a Prisma client per service, and connection pooling.' },
            { title: 'Deploy and secure', body: 'Docker Compose locally, Kubernetes in the cluster, Keycloak sign-in with JWT, GitHub Actions CI/CD, Cloudflare Tunnel for HTTPS, one-command deploy scripts, secrets held in CI/CD and Kubernetes.' },
          ]}
        />
      </CaseSection>

      <ScreenGallery shots={SHOTS} />

      <CaseSection id="stack" heading="Tech stack" icon="floppy" file="stack.txt">
        <TechStack
          tags={['React', 'Next.js', 'Node.js', 'gRPC', 'Docker', 'Kubernetes', 'PostgreSQL (Neon)', 'Prisma ORM', 'Keycloak', 'Cloudflare Tunnel', 'WebRTC', 'Socket.IO', 'GitHub Actions']}
        />
      </CaseSection>
    </CaseLayout>
  );
}
