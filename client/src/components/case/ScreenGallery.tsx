import SectionHeading from '@/components/SectionHeading';
import { WindowBar } from '@/components/Window';

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
};

const CAPTION_TEXT = 'font-mono text-[15px] sm:text-base leading-[1.5] text-[color:var(--navy)]';

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
 * One screenshot as a small window: violet bar, image flush to the frame,
 * caption and an "Open full size" link (dashboard text is unreadable at 375).
 * Portrait shots are centred in cream padding with a height cap. Wide shots
 * (aspect ≥ 1.4 and ≥ 860px, so never upscaled) span both columns from md.
 *
 * `hero`: the first figure under the case header. Loads eagerly at high
 * priority; a portrait hero sits beside its caption from md.
 */
export function ScreenFigure({ file, src, width, height, alt, caption, hero = false }: Shot & { hero?: boolean }) {
  const portrait = width / height < 0.9;
  const full = width / height >= 1.4 && width >= 860;
  const besideCaption = hero && portrait;

  const img = (
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
            : 'block w-full h-auto'
      }
    />
  );

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
          <FullSizeLink src={src} caption={caption} />
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
        <FullSizeLink src={src} caption={caption} />
      </figcaption>
    </figure>
  );
}

interface ScreenGalleryProps {
  heading?: 'Screens' | 'Charts';
  shots: Shot[];
}

/** Screenshot windows on the navy page (not inside a section window) */
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
