/**
 * About Section: the lead on the page, then one "about_me.txt" window that
 * fills the content width: the framed photo top-left, the two-paragraph bio
 * beside it at 62ch, and the two facts not stated elsewhere on Home as plain
 * labels (study, graduation and the LGA role are in the hero, Experience and
 * footer), in a third column from xl.
 */

import FramerReveal from './FramerReveal';
import { KeyText, type Fact } from './Hierarchy';
import PixelArt from './PixelArt';
import PixelatedImage from './PixelatedImage';
import Section from './Section';
import SectionHeading from './SectionHeading';
import Window from './Window';

// WebP 1x/2x (asset-work/webp-manifest.md); the canvas picks by box width x DPR
const PORTRAIT = [
  { src: '/assets/about/john_profile.webp', w: 202 },
  { src: '/assets/about/john_profile@2x.webp', w: 404 },
] as const;

const FACTS: Fact[] = [
  { icon: 'chip-school', text: 'Diploma, Nanyang Polytechnic' },
  { icon: 'globe', text: 'Based in Singapore' },
];

const BIO = [
  "At LGA Telecom I’m building **Desk Assist**, which drafts ticket replies for an agent to review.",
  'I listen first, write **clear requirements**, then build and test until the tool helps.',
];

export default function About() {
  return (
    <Section>
      <SectionHeading
        text="ABOUT ME"
        icon="icon-about"
        lead="From Electrical Engineering at Nanyang Polytechnic to Computing Science at SIT × Glasgow."
      />

      <FramerReveal delay={0.1}>
        {/* Fills the content width: photo, then the bio (64ch, under 80
            characters a line) with the two facts and their rule across the
            full column under it at every width */}
        <Window title="about_me.txt" bodyClassName="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-x-10 items-start p-6 sm:p-8 lg:p-10">
          <div className="md:row-span-2 border-[3px] border-black shadow-8bit size-48 sm:size-52 lg:size-64 overflow-hidden">
            <PixelatedImage
              src={PORTRAIT[0].src}
              srcSet={PORTRAIT}
              alt="Portrait of John Aaron Branzuela"
              className="w-full h-full"
            />
          </div>

          <div className="space-y-4 max-w-[64ch]">
            {BIO.map(text => (
              <p key={text} className="font-sans text-body-sm sm:text-body lg:text-lead-sm leading-relaxed text-pretty">
                <KeyText text={text} max={2} />
              </p>
            ))}
          </div>
          <ul aria-label="Quick facts" className="flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-black pt-4 font-sans text-body-sm sm:text-body text-[color:var(--text)]">
            {FACTS.map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <PixelArt name={icon} size={16} lazy />
                {text}
              </li>
            ))}
          </ul>
        </Window>
      </FramerReveal>
    </Section>
  );
}
