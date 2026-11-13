import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Lil Johnny as the hero's narrator (Hero mounts it from 1280px only). He
 * stands on the desk_assist.exe window's bottom edge, carried left as a 3px
 * ledge, and points right at step 5, the agent review. One button: his speech
 * bubble is its name, and pressing it opens the chat.
 *
 * Motion: one loop, a two-frame 2px bob (.johnny-bob in index.css). It runs
 * only while he is on screen, stops with Pause motion and is still under
 * prefers-reduced-motion.
 */
export default function HeroNarrator() {
  const ref = useRef<HTMLButtonElement>(null);
  const onScreen = useInView(ref);
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
      className="group flex flex-col items-start gap-[22px] -mr-3 pr-3 border-b-[3px] border-black text-left outline-offset-[6px]"
    >
      <span className="comic-bubble block font-sans text-[15px] leading-[1.4] px-4 py-3 rounded-[20px] shadow-[4px_4px_0_0_var(--ink)] [--tail-x:26px] transition-[translate,box-shadow] duration-150 group-hover:underline underline-offset-4 decoration-2 group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none">
        The AI drafts, an agent decides. Ask me how.<span className="sr-only"> Opens the chat.</span>
      </span>
      <img
        src="/assets/mascot/poses/point-right.png"
        alt=""
        aria-hidden="true"
        width={47}
        height={72}
        className={`${onScreen ? 'johnny-bob' : ''} ml-1 h-[144px] w-[94px] max-w-none [image-rendering:pixelated]`}
      />
    </button>
  );
}
