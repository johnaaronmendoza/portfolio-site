import SectionHeading from '@/components/SectionHeading';
import { WindowBar } from '@/components/Window';
import { toSrcSet, type ImageSource } from '@/lib/images';

// The case column is max-w-5xl less the window's borders; two columns from md
const COLUMN = 1018;
const HALF = 494;
// Portrait shots are capped at this height
const PORTRAIT_MAX_H = 560;

export type Shot = {
  /** Window title, lower snake case, e.g. "event_detail.png" */
  file: string;
  src: string;
  /** Intrinsic size: reserves the box before the file loads */
  width: number;
  height: number;
  /** What the screen shows (not a repeat of the caption) */
  alt: string;
  caption: string;
  /** Art for phones (below 640px), with its own intrinsic size. A .webp is
   *  served with its same-name .png as the fallback */
  srcMobile?: string;
  mobileWidth?: number;
  mobileHeight?: number;
  /** What "Open full size" opens, when not `src` (e.g. a vector original) */
  fullSrc?: string;
  /** WebP files (caseWebp), served through <picture> with `src` as the fallback */
  webp?: ImageSource[];
  /** Take both columns from md: a half-width shot left alone in its row, or
   *  a wide shot narrower than the column (shown at its natural width) */
  span?: boolean;
};

const CAPTION_TEXT = 'font-sans text-body-sm sm:text-body leading-[1.5] text-[color:var(--text)]';

function FullSizeLink({ src, caption }: { src: string; caption: string }) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener"
      className="inline-flex min-h-[44px] flex-shrink-0 items-center self-start sm:self-auto font-bold text-black underline decoration-2 underline-offset-4"
    >
      Open full size<span className="sr-only">: {caption} (opens in a new tab)</span>
    </a>
  );
}

/**
 * One screenshot as a small window: black bar, image flush to the frame,
 * caption and an "Open full size" link (dashboard text is unreadable at 375).
 * Portrait shots are centred in white padding with a height cap. Wide shots
 * (aspect ≥ 1.4 and at least the 1018px column wide) span both columns from
 * md. No shot is shown wider than its natural width: narrower ones are centred.
 * `webp` adds a WebP <source> whose `sizes` follows the box the shot gets.
 *
 * `hero`: the first figure under the case header. Loads eagerly at high
 * priority; a portrait hero sits beside its caption from md.
 */
export function ScreenFigure({
  file, src, width, height, alt, caption, srcMobile, mobileWidth, mobileHeight, fullSrc, webp, span, hero = false,
}: Shot & { hero?: boolean }) {
  const portrait = width / height < 0.9;
  const full = span || (width / height >= 1.4 && width >= COLUMN);
  const besideCaption = hero && portrait;
  const sizes = portrait
    ? `${Math.round((PORTRAIT_MAX_H * width) / height)}px`
    : `(min-width: 768px) ${Math.min(width, hero || full ? COLUMN : HALF)}px, min(${width}px, 100vw)`;

  const image = (
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      loading={hero ? 'eager' : 'lazy'}
      fetchPriority={hero ? 'high' : undefined}
      decoding="async"
      className={
        portrait
          ? `block mx-auto h-auto w-auto max-w-full ${besideCaption ? 'max-h-[min(70svh,560px)] md:max-h-[560px]' : 'max-h-[min(70svh,560px)]'}`
          : hero
            ? 'block mx-auto h-auto max-w-full'
            : 'block mx-auto w-full h-auto'
      }
      // Never upscaled: a shot narrower than its box sits centred at its natural width
      style={portrait || hero ? undefined : { maxWidth: width }}
    />
  );
  const mobilePng = srcMobile?.replace(/\.webp$/, '.png');
  const mobile = { media: '(max-width: 639px)', width: mobileWidth, height: mobileHeight };
  const img = srcMobile || webp ? (
    <picture>
      {/* WebP phone art, its PNG, the WebP set, then the img */}
      {srcMobile && mobilePng !== srcMobile && <source {...mobile} type="image/webp" srcSet={srcMobile} />}
      {mobilePng && <source {...mobile} srcSet={mobilePng} />}
      {webp && <source type="image/webp" srcSet={toSrcSet(webp)} sizes={sizes} />}
      {image}
    </picture>
  ) : image;
  const fullLink = <FullSizeLink src={fullSrc ?? src} caption={caption} />;

  if (besideCaption) {
    return (
      <figure className="window window--figure md:grid md:grid-cols-[auto_1fr]">
        <div className="md:col-span-2">
          <WindowBar title={file} />
        </div>
        <div className="p-4">{img}</div>
        <figcaption
          className={`flex flex-col gap-y-1 border-t-[3px] md:border-t-0 md:border-l-[3px] border-black px-4 pt-3 pb-1 md:p-6 md:justify-end ${CAPTION_TEXT}`}
        >
          <span className="text-pretty max-w-[40ch]">{caption}</span>
          {fullLink}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className={`window window--figure ${full ? 'md:col-span-2' : ''}`}>
      <WindowBar title={file} />
      <div className={portrait ? 'p-4' : undefined}>{img}</div>
      <figcaption
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-6 gap-y-1 border-t-[3px] border-black px-4 pt-3 pb-1 sm:py-1 ${CAPTION_TEXT}`}
      >
        <span className="text-pretty sm:py-2">{caption}</span>
        {fullLink}
      </figcaption>
    </figure>
  );
}

interface ScreenGalleryProps {
  heading?: 'Screens' | 'Charts';
  shots: Shot[];
}

/** Screenshot windows on the page (not inside a section window) */
export default function ScreenGallery({ heading = 'Screens', shots }: ScreenGalleryProps) {
  return (
    <section aria-labelledby="screens-heading">
      <SectionHeading id="screens-heading" text={heading} icon="icon-screens" size="case" className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
        {shots.map(shot => (
          <ScreenFigure key={shot.file} {...shot} />
        ))}
      </div>
    </section>
  );
}
