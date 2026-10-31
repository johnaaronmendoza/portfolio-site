/**
 * About Section: one "about_me.txt" window holding the framed photo, a short
 * facts list and the bio. Navy text on the cream window body.
 */

import FramerReveal from './FramerReveal';
import PixelatedImage from './PixelatedImage';
import SectionHeading from './SectionHeading';
import Window from './Window';
import profileImg from '@assets/john_profile.jpg';

const FACTS: { label: string; value: string }[] = [
  { label: 'Studying', value: 'Computing Science, SIT × University of Glasgow' },
  { label: 'Graduating', value: 'April 2027' },
  { label: 'Now', value: 'Intern, LGA Telecom' },
  { label: 'Before', value: 'Diploma, Nanyang Polytechnic' },
  { label: 'Based in', value: 'Singapore' },
];

export default function About() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto">
        <SectionHeading text="ABOUT ME" icon="icon-about" className="mb-16" />

        <FramerReveal delay={0.1}>
          <Window title="about_me.txt" bodyClassName="flex flex-col md:flex-row gap-8 md:gap-12 items-start p-6 sm:p-10 lg:p-14">
            {/* Photo + facts */}
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-start gap-8">
              <div className="border-[3px] border-black shadow-[4px_4px_0_0_#000] w-56 h-56 sm:w-72 sm:h-72 overflow-hidden">
                <PixelatedImage
                  src={profileImg}
                  alt="Portrait of John Aaron Branzuela"
                  className="w-full h-full"
                />
              </div>
              <dl className="w-full sm:w-72 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-[15px] sm:text-base">
                {FACTS.map(({ label, value }) => (
                  <div key={label} className="contents">
                    <dt className="font-bold text-black">{label}:</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Bio Text */}
            <div className="space-y-5 prose-8bit flex-1">
              <p className="font-mono-8bit font-bold text-base sm:text-lg text-black leading-relaxed max-w-[60ch]">
                I build AI and data tools for the people who have to use them.
              </p>
              <p className="font-mono-8bit text-[15px] sm:text-base leading-relaxed max-w-[65ch]">
                Right now I'm building Desk Assist at LGA Telecom. It reads a service desk ticket, finds the matching knowledge-base guidance and drafts a reply. An agent reviews every draft before anything reaches a customer.
              </p>
              <p className="font-mono-8bit text-[15px] sm:text-base leading-relaxed max-w-[65ch]">
                Before that I built cloud-native microservices with my SilverLink SG team, a machine learning model that tells clear UWB signals from blocked ones, and a cancer-awareness platform used at Singapore Cancer Society outreach booths. My first role was at Sembcorp Solar, testing a CRM before it rolled out across the company.
              </p>
              <p className="font-mono-8bit text-[15px] sm:text-base leading-relaxed max-w-[65ch]">
                I like the gap between what people need and what gets built: I listen, write clear requirements, then build and test until the tool helps.
              </p>
            </div>
          </Window>
        </FramerReveal>
      </div>
    </section>
  );
}
