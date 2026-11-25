import { Lead } from "./Hierarchy";
import PixelArt, { type PixelArtName } from "./PixelArt";

type HeadingTone = "two-tone" | "ink";

interface Props {
  text: string; // e.g. "ABOUT ME"
  /** default: blue shadow and rule on the page; ink: white shadow, black rule on the blue band */
  tone?: HeadingTone;
  /** section: Home h2; case: the smaller case-study h2 (DESIGN.md), upper case via CSS;
   *  pane: a case h2 that heads one column of a two-column window from lg */
  size?: "section" | "case" | "pane";
  /** 32px pixel icon to the left of the heading (decorative) */
  icon?: PixelArtName;
  /** For aria-labelledby on the surrounding section */
  id?: string;
  /** Home: the one-sentence lead under the title (on the band when tone is ink) */
  lead?: string;
  /** Replaces the default gap below a Home heading; case pages set their own */
  className?: string;
}

const SIZE = {
  // Below sm the title scales so a 10-letter word plus the icon fits from 320px
  section: "text-[length:clamp(40px,12vw,52px)] sm:text-section",
  // 32 at every width: 1.3x over the case h3 (24), under the h1
  case: "text-card-lead",
  // From lg the shadow scales with the type (1/8 em, as at 32px)
  pane: "text-card-lead lg:text-card-title lg:[text-shadow:3px_3px_0_var(--blue)]",
};

// Heading rhythm (DESIGN.md): title to lead 16/20px, then one gap from the
// heading block to the first content, with or without a lead
const GAP = { section: "mb-6 lg:mb-8", case: "", pane: "" };

/**
 * Big comic-lettered h2 (Bangers) in black with a hard offset shadow; the rule
 * beside it carries the accent colour.
 * The mobile size scales with the viewport so a 10-letter word plus the icon
 * fits on one line from 320px.
 */
export default function SectionHeading({
  text,
  tone = "two-tone",
  size = "section",
  icon,
  id,
  lead,
  className = GAP[size],
}: Props) {
  const [first, ...rest] = text.split(" ");
  const ink = tone === "ink";

  const heading = (
    <div className={`flex items-center gap-4 ${lead ? "" : className}`}>
      {icon && <PixelArt name={icon} size={32} lazy />}
      {/* Comic lettering with a hard offset shadow: blue on the page, white on
          the blue band (ink tone) so it still separates from the ground */}
      <h2
        id={id}
        className={`font-comic ${SIZE[size]} text-black ${
          ink
            ? "[text-shadow:4px_4px_0_var(--paper)]"
            : "[text-shadow:4px_4px_0_var(--blue)]"
        }`}
      >
        {first}
        {rest.length > 0 && <> {rest.join(" ")}</>}
      </h2>
      <div
        aria-hidden="true"
        className={`flex-1 min-w-0 h-[6px] ${ink ? "bg-black" : "bg-[var(--blue)]"}`}
      />
    </div>
  );

  if (!lead) return heading;
  return (
    <div className={className}>
      {heading}
      <Lead text={lead} tone={ink ? "blue" : "page"} className="mt-4 lg:mt-5" />
    </div>
  );
}
