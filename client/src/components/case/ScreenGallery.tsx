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
  /** full = both columns from md */
  span: 'full' | 'half';
};

/**
 * One screenshot as a small window: violet bar, image flush to the frame,
 * caption and an "Open full size" link (dashboard text is unreadable at 375).
 * Portrait shots are centred in cream padding with a height cap.
 */
export function ScreenFigure({ file, src, width, height, alt, caption, span }: Shot) {
  const portrait = width / height < 0.9;
  return (
    <figure className={`window window--figure ${span === 'full' ? 'md:col-span-2' : ''}`}>
      <WindowBar title={file} />
      <div className={portrait ? 'p-4' : undefined}>
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={
            portrait
              ? 'block mx-auto h-auto w-auto max-w-full max-h-[min(70svh,560px)]'
              : 'block w-full h-auto'
          }
        />
      </div>
      <figcaption className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-6 gap-y-1 border-t-[3px] border-black px-4 pt-3 pb-1 sm:py-1 font-mono text-[15px] sm:text-base leading-[1.5] text-[color:var(--navy)]">
        <span className="text-pretty sm:py-2">{caption}</span>
        <a
          href={src}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[44px] flex-shrink-0 items-center self-start sm:self-auto font-bold text-black underline decoration-2 underline-offset-4"
        >
          Open full size<span className="sr-only">: {caption} (opens in a new tab)</span>
        </a>
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
