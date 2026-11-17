/**
 * About Section: the lead on the page, then one "about_me.txt" window that
 * fits its content: the framed photo top-left, the two-paragraph bio beside
 * it at 60ch, and the two facts not stated elsewhere on Home as plain labels
 * (study, graduation and the LGA role are in the hero, Experience and footer).
 */

import FramerReveal from './FramerReveal';
import { KeyText, Lead, type Fact } from './Hierarchy';
import PixelArt from './PixelArt';
import PixelatedImage from './PixelatedImage';
import SectionHeading from './SectionHeading';
import Window from './Window';
import profileImg from '@assets/john_profile.jpg';

const FACTS: Fact[] = [
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
      <div className="max-w-6xl mx-auto">
        <SectionHeading text="ABOUT ME" icon="icon-about" className="mb-4 lg:mb-5" />
        <Lead text="From Electrical Engineering at Nanyang Polytechnic to Computing Science at SIT × Glasgow." className="mb-6 lg:mb-8" />

        <FramerReveal delay={0.1}>
          <Window title="about_me.txt" className="md:w-fit" bodyClassName="flex flex-col md:flex-row gap-6 md:gap-10 items-start p-6 sm:p-8 lg:p-10">
            <div className="flex-shrink-0 border-[3px] border-black shadow-[4px_4px_0_0_var(--ink)] w-48 h-48 sm:w-52 sm:h-52 overflow-hidden">
              <PixelatedImage
                src={profileImg}
                alt="Portrait of John Aaron Branzuela"
                className="w-full h-full"
              />
            </div>

            {/* Bio from the photo's top edge, facts on its bottom edge */}
            <div className="min-w-0 max-w-[60ch] md:self-stretch flex flex-col justify-between gap-6">
              <div className="space-y-4">
                {BIO.map(text => (
                  <p key={text} className="font-sans text-[15px] sm:text-base leading-relaxed text-pretty">
                    <KeyText text={text} max={2} />
                  </p>
                ))}
              </div>
              <ul aria-label="Quick facts" className="flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-black pt-4 font-sans text-[15px] sm:text-base text-[color:var(--text)]">
                {FACTS.map(({ icon, text }) => (
                  <li key={text} className="flex items-center gap-2">
                    <PixelArt name={icon} size={16} lazy />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </Window>
        </FramerReveal>
      </div>
    </section>
  );
}
