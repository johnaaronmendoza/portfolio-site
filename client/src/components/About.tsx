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
  { label: 'Studying', value: 'SIT × University of Glasgow' },
  { label: 'Graduating', value: 'April 2027' },
  { label: 'Now', value: 'LGA Telecom' },
  { label: 'Based in', value: 'Singapore' },
];

export default function About() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto">
        <SectionHeading text="ABOUT ME" className="mb-16" />

        <FramerReveal delay={0.1}>
          <Window title="about_me.txt" bodyClassName="flex flex-col md:flex-row gap-8 md:gap-12 items-start p-6 sm:p-10 lg:p-14">
            {/* Photo + facts */}
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-start gap-8">
              <div className="border-[3px] border-black shadow-[4px_4px_0_0_#000] w-56 h-56 sm:w-72 sm:h-72 overflow-hidden">
                <PixelatedImage
                  src={profileImg}
                  alt="John Aaron Mendoza Branzuela"
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
                I build technology for the people who have to use it.
              </p>
              <p className="font-mono-8bit text-[15px] sm:text-base leading-relaxed max-w-[65ch]">
                Most projects don't fail on the code. They fail in the gap between what a business needs and what gets built. That gap is where I like to work: listening to users, turning their problems into clear requirements, then building and testing until the thing actually helps.
              </p>
              <p className="font-mono-8bit text-[15px] sm:text-base leading-relaxed max-w-[65ch]">
                My path started on-site at Sembcorp Solar, testing a CRM before it rolled out across the company. Since then I've built cloud-native microservices, machine learning models and a cancer-awareness platform used at Singapore Cancer Society outreach events. Now I'm building an AI assistant that helps service desk agents at LGA Telecom answer customers.
              </p>
              <p className="font-mono-8bit text-[15px] sm:text-base leading-relaxed max-w-[65ch]">
                I learn fast, speak both engineer and stakeholder, and care about shipping things people actually use.
              </p>
            </div>
          </Window>
        </FramerReveal>
      </div>
    </section>
  );
}
