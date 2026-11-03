import { motion, AnimatePresence } from 'framer-motion';
import { Component, lazy, Suspense, useEffect, useRef, useState, type FocusEvent, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { play } from '@/hooks/useSound';
import { motionTokens } from '@/lib/motion-tokens';
import { GROUP_NAME, KEYS, capFor, iconUrl, keyName, type Cap } from './skills3d/keys';
import type { Perch } from './skills3d/Keyboard3D';

// three.js lives in this chunk; it loads only when the Skills section nears the viewport
const Keyboard3D = lazy(() => import('./skills3d/Keyboard3D'));

const MASCOT = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663399162945/5mLLaUiLoCi2BBtUhHeagh/LilJohnny-happycopy_aa6087aa.png';
const GROUP_LABEL = 'Skills keyboard. Press a key to see what the skill is and where I used it.';
const CAPS: Cap[] = KEYS.map(capFor);
const NAMES = KEYS.map((k, i) => keyName(k, CAPS[i]));

function hasWebGL() {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

function useWide() {
  const query = '(min-width: 640px)';
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = (e: MediaQueryListEvent) => setWide(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return wide;
}

/** Falls back to the flat keyboard if the 3D chunk fails to load or WebGL errors. */
class Boundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type KeyHandlers = {
  selected: number;
  onSelect: (i: number) => void;
  onHover: (i: number | null) => void;
  onFocusKey: (i: number | null, visible: boolean) => void;
};

const focusHandlers = (i: number, onFocusKey: KeyHandlers['onFocusKey']) => ({
  onFocus: (e: FocusEvent<HTMLButtonElement>) => onFocusKey(i, e.currentTarget.matches(':focus-visible')),
  onBlur: () => onFocusKey(null, false),
});

function FlatIcon({ src, dark }: { src: string; dark: boolean }) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      onError={() => setMissing(true)}
      className="w-[44%] aspect-square"
      // Icons are white; on amber and cream caps they turn black, like the sheet
      style={dark ? { filter: 'brightness(0)' } : undefined}
    />
  );
}

/** Flat 2D keyboard: no WebGL, reduced motion, or the 3D chunk failed. */
function FlatKeys({ selected, onSelect, onHover, onFocusKey }: KeyHandlers) {
  return (
    <div
      role="group"
      aria-label={GROUP_LABEL}
      className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 sm:gap-3 pr-1 pb-1"
    >
      {KEYS.map((k, i) => {
        const cap = CAPS[i];
        return (
          <button
            key={k.label}
            type="button"
            aria-pressed={i === selected}
            aria-label={NAMES[i]}
            onClick={() => onSelect(i)}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            {...focusHandlers(i, onFocusKey)}
            // Scroll margin keeps a tabbed-to key clear of the sticky description panel on phones
            // Keycap from John's sheet: number, icon, caps label on a darker strip.
            // Scroll margin keeps a tabbed-to key clear of the sticky panel on phones.
            className="relative flex aspect-square flex-col overflow-hidden rounded-[6px] border-[3px] border-black shadow-[4px_4px_0_0_#000] transition-[translate,box-shadow] duration-100 ease-out aria-pressed:translate-x-[4px] aria-pressed:translate-y-[4px] aria-pressed:shadow-none scroll-mt-[240px] lg:scroll-mt-0"
            style={{ backgroundColor: cap.face, color: cap.ink }}
          >
            <span aria-hidden="true" className="absolute left-1.5 top-1 font-mono text-xs font-bold leading-none">{cap.no}</span>
            <span className="flex min-h-0 flex-1 items-center justify-center pt-3">
              <FlatIcon src={iconUrl(k)} dark={cap.ink !== '#FFFFFF'} />
            </span>
            <span
              aria-hidden="true"
              className="block border-t-2 border-black/35 py-1 sm:py-1.5 font-mono text-xs sm:text-sm lg:text-base font-bold leading-none tracking-wide"
              style={{ backgroundColor: cap.bar }}
            >
              {cap.text}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function SkillKeyboard() {
  const reduced = useReducedMotion();
  const wide = useWide();
  const boardRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<'wait' | '3d' | '2d'>('wait');
  const [selected, setSelected] = useState(1); // start on RAG: the AI story first
  const [hover, setHover] = useState<number | null>(null);
  const [focus, setFocus] = useState<{ i: number; visible: boolean } | null>(null);
  const [pulse, setPulse] = useState<{ i: number; n: number } | null>(null);
  const [taps, setTaps] = useState(0); // drives the mascot's hop
  const [perch, setPerch] = useState<Perch | null>(null);
  const flat = reduced || stage === '2d';

  // Load the 3D board when the section nears the viewport (loading, not a scroll effect)
  useEffect(() => {
    if (flat || stage !== 'wait') return;
    const el = boardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setStage(hasWebGL() ? '3d' : '2d');
    }, { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [flat, stage]);

  const current = KEYS[hover ?? focus?.i ?? selected];

  const select = (i: number) => {
    setSelected(i);
    setTaps(t => t + 1);
    play('click');
  };
  const handlers: KeyHandlers = {
    selected,
    onSelect: select,
    onHover: setHover,
    onFocusKey: (i, visible) => setFocus(i === null ? null : { i, visible }),
  };

  return (
    <div className="space-y-6 lg:space-y-4">
      {/* Description: what the selected (or hovered, or focused) key means */}
      <div
        className="sticky top-0 z-20 bg-[var(--navy)] text-[color:var(--cream)] py-4 lg:static min-h-[200px] sm:min-h-[150px] border-l-[3px] border-[color:var(--orange)] pl-5"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.label}
            initial={reduced ? false : { opacity: 0, x: -motionTokens.distance.sm }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
            className="lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-x-10"
          >
            <div>
              <p className="font-mono text-sm text-[color:var(--teal)] mb-3">{GROUP_NAME[current.group]}</p>
              <h3 className="font-pixel text-lg sm:text-xl leading-snug mb-4 text-balance">{current.name}</h3>
            </div>
            <div className="max-w-[62ch]">
              <p className="font-mono text-[15px] leading-relaxed text-pretty">{current.blurb}</p>
              <p className="font-mono text-sm text-[color:var(--orange)] mt-4">Used in: {current.usedIn}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div ref={boardRef} className="relative pt-14 sm:pt-16 lg:pt-20">
        {flat ? (
          <FlatKeys {...handlers} />
        ) : (
          <>
            {/* The real controls for the 3D board: keyboard and screen readers.
                Focus shows on the board (outline) and on the key (orange ring). */}
            <div role="group" aria-label={GROUP_LABEL} className="sr-only">
              {KEYS.map((k, i) => (
                <button
                  key={k.label}
                  type="button"
                  aria-pressed={i === selected}
                  onClick={() => {
                    select(i);
                    setPulse(p => ({ i, n: (p?.n ?? 0) + 1 }));
                  }}
                  {...focusHandlers(i, handlers.onFocusKey)}
                >
                  {NAMES[i]}
                </button>
              ))}
            </div>
            <div
              className={`relative aspect-[2/3] sm:aspect-[2/1] lg:aspect-[16/9] rounded-[10px] outline-offset-4 outline-[color:var(--orange)] ${focus?.visible ? 'outline-3' : ''}`}
            >
              {stage === '3d' && (
                <Boundary onError={() => setStage('2d')}>
                  <Suspense fallback={null}>
                    <Keyboard3D
                      cols={wide ? 7 : 4}
                      selected={selected}
                      focused={focus?.visible ? focus.i : null}
                      pulse={pulse}
                      onHover={setHover}
                      onSelect={select}
                      onPerch={setPerch}
                    />
                  </Suspense>
                </Boundary>
              )}
              {/* Mascot stands behind the top-right key and hops when a key is pressed */}
              {perch && stage === '3d' && (
                <motion.img
                  key={taps}
                  src={MASCOT}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="absolute w-14 sm:w-16 lg:w-20 -translate-x-1/2 -translate-y-full pointer-events-none"
                  style={{ left: perch.x, top: perch.y, imageRendering: 'pixelated' }}
                  initial={false}
                  animate={taps === 0 ? undefined : { y: [0, -14, 0] }}
                  transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                />
              )}
            </div>
          </>
        )}
        {flat && (
          <img
            src={MASCOT}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute right-4 top-14 sm:top-16 lg:top-20 w-14 sm:w-16 lg:w-20 -translate-y-full pointer-events-none"
            style={{ imageRendering: 'pixelated' }}
          />
        )}
      </div>
    </div>
  );
}
