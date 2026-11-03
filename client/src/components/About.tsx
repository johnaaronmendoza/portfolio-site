/**
 * About Section: the lead on navy, then one "about_me.txt" window holding the
 * framed photo, fact chips and a two-paragraph bio. Navy text on cream.
 */

import FramerReveal from './FramerReveal';
import { FactChips, KeyText, Lead, type Fact } from './Hierarchy';
import PixelatedImage from './PixelatedImage';
import SectionHeading from './SectionHeading';
import Window from './Window';
import profileImg from '@assets/john_profile.jpg';

// Chip text says what the old labels said, so the icons can stay decorative
const FACTS: Fact[] = [
  { icon: 'chip-school', text: 'Computing Science, SIT × University of Glasgow' },
  { icon: 'chip-calendar', text: 'Graduating April 2027' },
  { icon: 'icon-experience', text: 'Intern, LGA Telecom' },
  { icon: 'chip-school', text: 'Diploma, Nanyang Polytechnic' },
  { icon: 'globe', text: 'Based in Singapore' },
];

const BIO = [
  "At LGA Telecom I'm building **Desk Assist**, which drafts ticket replies for an agent to review.",
  'I listen first, write **clear requirements**, then build and test until the tool helps.',
];

export default function About() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto">
        <SectionHeading text="ABOUT ME" icon="icon-about" className="mb-4 lg:mb-5" />
        <Lead text="From Electrical Engineering at Nanyang Polytechnic to Computing Science at SIT × Glasgow." className="mb-6 lg:mb-8" />

        <FramerReveal delay={0.1}>
          <Window title="about_me.txt" bodyClassName="flex flex-col md:flex-row gap-8 md:gap-12 items-start p-6 sm:p-10 lg:p-14">
            {/* Photo + facts */}
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-start gap-8">
              <div className="border-[3px] border-black shadow-[4px_4px_0_0_var(--ink)] w-56 h-56 sm:w-72 sm:h-72 overflow-hidden">
                <PixelatedImage
                  src={profileImg}
                  alt="Portrait of John Aaron Branzuela"
                  className="w-full h-full"
                />
              </div>
              <FactChips facts={FACTS} label="Quick facts" className="w-full sm:w-72" />
            </div>

            {/* Bio Text */}
            <div className="space-y-4 flex-1">
              {BIO.map(text => (
                <p key={text} className="font-mono-8bit text-[15px] sm:text-base leading-relaxed max-w-[60ch]">
                  <KeyText text={text} max={2} />
                </p>
              ))}
            </div>
          </Window>
        </FramerReveal>
      </div>
    </section>
  );
}
