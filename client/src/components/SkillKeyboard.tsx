import { AnimatePresence, motion } from 'framer-motion';
import {
  Component, lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState,
  type FocusEvent, type PointerEvent, type ReactNode, type RefObject,
} from 'react';
import { Link } from 'wouter';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useModalFocus } from '@/hooks/useModalFocus';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { play } from '@/hooks/useSound';
import { motionTokens } from '@/lib/motion-tokens';
import { chipClass } from './Projects';
import { WindowBar } from './Window';
import {
  FILTERS, GROUP_NAME, KEYS, capFor, fileName, iconUrl, inFilter, keyName, mutedCap, projectsFor,
  type Cap, type Filter,
} from './skills3d/keys';
import type { KeyLocator, KeyRect } from './skills3d/Keyboard3D';

// three.js lives in this chunk; it loads only when the Skills section nears the viewport
const Keyboard3D = lazy(() => import('./skills3d/Keyboard3D'));

const GROUP_LABEL = 'Skills keyboard. Press a key to open what the skill is and where I used it.';
const CAPS: Cap[] = KEYS.map(capFor);
const NAMES = KEYS.map((k, i) => keyName(k, CAPS[i]));
const GAP = 10; // px between a key and its tooltip or window
const EDGE = 8; // px kept clear of the viewport edge
const DOCK = 88; // px kept clear at the bottom for the fixed buttons (html scroll-padding-bottom)
const TIP_ID = 'skill-tip';

// The entrance plays once per page load, not on every return to Home
let enteredThisLoad = false;

function hasWebGL() {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
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
  filter: Filter;
  open: number | null;
  tip: number | null;
  btnRefs: RefObject<(HTMLButtonElement | null)[]>;
  onOpen: (i: number) => void;
  onHover: (i: number | null) => void;
  onFocusKey: (i: number | null, visible: boolean) => void;
};

/** Props shared by the hidden 3D controls and the flat keys: a dialog opener
 *  that reports focus (and whether it is keyboard focus) for the tooltip. */
const keyButton = (i: number, { open, tip, btnRefs, onOpen, onFocusKey }: KeyHandlers) => ({
  type: 'button' as const,
  ref: (el: HTMLButtonElement | null) => { btnRefs.current[i] = el; },
  'aria-haspopup': 'dialog' as const,
  'aria-expanded': open === i,
  'aria-describedby': tip === i ? TIP_ID : undefined,
  onClick: () => onOpen(i),
  onFocus: (e: FocusEvent<HTMLButtonElement>) => onFocusKey(i, e.currentTarget.matches(':focus-visible')),
  onBlur: () => onFocusKey(null, false),
});

/** The single-colour icon as a mask filled with the cap's ink (black, or
 *  white on black); a missing file leaves the cap without an icon. */
function FlatIcon({ src }: { src: string }) {
  return <span aria-hidden="true" className="w-[44%] aspect-square bg-current" style={{ mask: `url(${src}) center / contain no-repeat` }} />;
}

/** Flat 2D keyboard: phones and touch screens, no WebGL, reduced motion, or the 3D chunk failed. */
function FlatKeys(handlers: KeyHandlers) {
  const { filter, onHover } = handlers;
  const hoverOn = (i: number | null) => (e: PointerEvent) => {
    if (e.pointerType !== 'touch') onHover(i);
  };
  return (
    <div role="group" aria-label={GROUP_LABEL} className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 sm:gap-3 pr-1 pb-1">
      {KEYS.map((k, i) => {
        // Outside the filter: pressed flush without its shadow, in the same dark
        // muted skin as the 3D caps (AA contrast kept), so it reads without colour
        const muted = !inFilter(k, filter);
        const cap = muted ? mutedCap(CAPS[i]) : CAPS[i];
        return (
          <button
            key={k.label}
            {...keyButton(i, handlers)}
            aria-label={NAMES[i]}
            onPointerEnter={hoverOn(i)}
            onPointerLeave={hoverOn(null)}
            // Keycap from John's sheet: number, icon, caps label on a darker strip
            className={`relative flex aspect-square flex-col overflow-hidden rounded-[6px] border-[3px] border-black transition-[translate,box-shadow,background-color,color] duration-150 ease-out ${
              muted
                ? 'translate-x-[4px] translate-y-[4px] shadow-none'
                : 'shadow-[4px_4px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none aria-expanded:translate-x-[4px] aria-expanded:translate-y-[4px] aria-expanded:shadow-none'
            }`}
            style={{ backgroundColor: cap.face, color: cap.ink }}
          >
            <span aria-hidden="true" className="absolute left-1.5 top-1 font-mono text-xs font-bold leading-none">{cap.no}</span>
            <span className="flex min-h-0 flex-1 items-center justify-center pt-3">
              <FlatIcon src={iconUrl(k)} />
            </span>
            <span
              aria-hidden="true"
              className="block border-t-2 border-black/35 py-1 sm:py-1.5 font-mono text-xs sm:text-sm lg:text-base font-bold leading-none tracking-wide transition-[background-color] duration-150 ease-out"
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

/** Category filters: toggle buttons in the Projects chip style (press-down,
 *  hard shadow). Below 640px one row that scrolls sideways to the screen edge,
 *  where the last visible chip fades out to show there is more (the end
 *  padding lets the last chip scroll clear of the fade); the padding keeps
 *  shadows and focus rings inside the scroller. */
function Filters({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  return (
    <div
      role="group"
      aria-label="Highlight skills by category"
      className="-mx-4 flex gap-2 overflow-x-auto pl-4 pr-12 pt-1.5 pb-2.5 [mask-image:linear-gradient(to_right,#000_calc(100%-2.5rem),transparent)] sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:p-0 sm:[mask-image:none]"
    >
      {FILTERS.map(f => (
        <button
          key={f.id}
          type="button"
          aria-pressed={value === f.id}
          onClick={() => onChange(f.id)}
          className={`shrink-0 ${chipClass(value === f.id)}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

/** Hover / keyboard-focus preview: a small python.info window. Positioned by
 *  the parent (it follows the 3D board frame by frame). */
function KeyTip({ index, tipRef, reduced }: { index: number; tipRef: RefObject<HTMLDivElement | null>; reduced: boolean }) {
  const k = KEYS[index];
  return (
    <div ref={tipRef} id={TIP_ID} role="tooltip" className="pointer-events-none absolute left-0 top-0 z-30 w-64" style={{ visibility: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : motionTokens.distance.xs }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionTokens.duration.instant, ease: motionTokens.easing.out }}
        className="border-[3px] border-black bg-[var(--paper)] text-[color:var(--text)] shadow-[4px_4px_0_0_#000]"
      >
        <WindowBar title={fileName(CAPS[index])} />
        <div className="px-3 py-2.5 font-sans">
          <p className="text-[15px] font-bold leading-snug text-balance">{k.name}</p>
          <p className="mt-1 text-sm leading-snug text-pretty">{k.blurb}</p>
        </div>
      </motion.div>
    </div>
  );
}

type WindowProps = {
  index: number;
  reduced: boolean;
  boardRef: RefObject<HTMLDivElement | null>;
  locate: (i: number) => KeyRect | null;
  onClose: () => void;
};

/** Detail window for one skill: modal, placed beside its key and kept on screen. */
function SkillWindow({ index, reduced, boardRef, locate, onClose }: WindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const k = KEYS[index];
  const links = projectsFor(k);
  const titleId = `skill-window-${k.label.toLowerCase()}`;
  // Focus moves into the window, Tab stays inside, and focus returns to the key on close
  const keepFocus = useModalFocus(true, ref);

  // Below the key if it fits on screen, else above, else as low as fits. Set on
  // the element before the first paint, so no hidden state is needed (a hidden
  // window couldn't take focus).
  useLayoutEffect(() => {
    const el = ref.current;
    const box = boardRef.current;
    if (!el || !box) return;
    const b = box.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const r = locate(index) ?? { x: b.left + b.width / 2, top: b.top, bottom: b.top };
    const [w, hgt] = [el.offsetWidth, el.offsetHeight];
    const left = Math.max(Math.max(EDGE, b.left), Math.min(Math.min(vw - EDGE, b.right) - w, r.x - w / 2));
    let top = r.bottom + GAP;
    if (top + hgt > vh - EDGE) top = r.top - GAP - hgt;
    if (top < EDGE) top = Math.max(EDGE, vh - EDGE - hgt);
    el.style.left = `${Math.round(left - b.left)}px`;
    el.style.top = `${Math.round(top - b.top)}px`;
  }, [index, boardRef, locate]);

  const fade = { opacity: 0, y: reduced ? 0 : motionTokens.distance.sm };
  return (
    <>
      {/* Click outside to close; transparent so the pressed key stays in view */}
      <motion.div key="scrim" aria-hidden="true" className="fixed inset-0 z-[64]" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        key="window"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={e => {
          if (e.key !== 'Escape') return;
          e.stopPropagation();
          onClose();
        }}
        className="window absolute z-[65] w-[min(22rem,100%)]"
        initial={fade}
        animate={{ opacity: 1, y: 0 }}
        exit={fade}
        transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.out }}
      >
        <WindowBar title={fileName(CAPS[index])} onClose={onClose} closeLabel={`Close ${k.name}`} />
        <div className="window-body p-4 sm:p-5 font-sans">
          <p className="text-sm font-bold">{GROUP_NAME[k.group]}</p>
          <h3 id={titleId} className="font-display text-xl sm:text-2xl mt-2 mb-3 text-balance">{k.name}</h3>
          <p className="text-[15px] leading-relaxed text-pretty">{k.blurb}</p>
          <p className="text-[15px] leading-relaxed mt-3"><span className="font-bold">Used in:</span> {k.usedIn}</p>
          {links.length > 0 && (
            <>
              <p className="text-[15px] font-bold mt-3">{links.length > 1 ? 'Case studies:' : 'Case study:'}</p>
              <ul>
                {links.map(p => (
                  <li key={p.link}>
                    <Link href={p.link} onClick={keepFocus} className="inline-block py-2.5 text-[15px] font-bold underline underline-offset-4 decoration-2">
                      {p.name}<span aria-hidden="true"> →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}

/** listId: the plain skills list the skip link jumps to (its <summary> takes focus) */
export default function SkillKeyboard({ listId }: { listId: string }) {
  const reduced = useReducedMotion();
  const wide = useMediaQuery('(min-width: 640px)');
  const cols = wide ? 7 : 4;
  const boardRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const locatorRef = useRef<KeyLocator | null>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<'wait' | '3d' | '2d'>('wait');
  const [filter, setFilter] = useState<Filter>('all');
  const [announce, setAnnounce] = useState('');
  const [hover, setHover] = useState<number | null>(null); // mouse or pen only
  const [focus, setFocus] = useState<{ i: number; visible: boolean } | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [pulse, setPulse] = useState<{ i: number; n: number } | null>(null);
  const [entrance] = useState(() => !enteredThisLoad);
  // Phones and touch screens get the flat board: the 3D chunk (three.js) is
  // never requested there, since Keyboard3D only renders when !flat
  const handheld = useMediaQuery('(max-width: 639.98px), (pointer: coarse)');
  const flat = reduced || handheld || stage === '2d';
  // Tooltip: the hovered or keyboard-focused key, unless Escape dismissed it
  // (WCAG 1.4.13); it comes back when hover or focus moves to another key
  const [dismissed, setDismissed] = useState<number | null>(null);
  const shown = open === null ? hover ?? (focus?.visible ? focus.i : null) : null;
  const tip = shown === dismissed ? null : shown;

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

  // Where a key is on screen: projected from the 3D board, or the flat button's box
  const locate = useCallback((i: number): KeyRect | null => {
    if (!flat) return locatorRef.current?.(i) ?? null;
    const r = btnRefs.current[i]?.getBoundingClientRect();
    return r ? { x: r.left + r.width / 2, top: r.top, face: r.top + r.height / 2, bottom: r.bottom, w: r.width } : null;
  }, [flat]);

  // Latest values for the per-frame callbacks below
  const live = useRef({ tip, locate });
  live.current = { tip, locate };

  // Tooltip: centred above the key, never higher than the board's top (so it
  // stays clear of the filters and heading); else below the key; else as low
  // as fits above the fixed buttons
  const placeTip = useCallback(() => {
    const { tip: i, locate: find } = live.current;
    const el = tipRef.current;
    const box = boardRef.current;
    const r = i === null ? null : find(i);
    if (!el || !box || !r) return;
    const b = box.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const [w, hgt] = [el.offsetWidth, el.offsetHeight];
    const left = Math.max(EDGE, Math.min(vw - EDGE - w, r.x - w / 2));
    const [above, below, floor] = [r.top - GAP - hgt, r.bottom + GAP, Math.max(EDGE, b.top)];
    const top = above >= floor ? above : below + hgt <= vh - DOCK ? below : Math.max(floor, vh - DOCK - hgt);
    el.style.transform = `translate(${Math.round(left - b.left)}px, ${Math.round(top - b.top)}px)`;
    el.style.visibility = 'visible';
  }, []);
  useLayoutEffect(placeTip, [tip, placeTip]);
  useEffect(() => setDismissed(null), [shown]);
  useEffect(() => {
    if (tip === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDismissed(tip);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tip]);

  const openKey = (i: number) => {
    // Focus the key's control first, so the window hands focus back to it on close
    btnRefs.current[i]?.focus({ preventScroll: true });
    setOpen(i);
    play('click');
  };
  const closeWindow = useCallback(() => setOpen(null), []);

  const chooseFilter = (f: Filter) => {
    setFilter(f);
    const n = KEYS.filter(k => inFilter(k, f)).length;
    const label = FILTERS.find(x => x.id === f)?.label;
    setAnnounce(f === 'all' ? `All ${KEYS.length} skills shown` : `${n} of ${KEYS.length} skills highlighted: ${label}`);
  };

  const handlers: KeyHandlers = {
    filter,
    open,
    tip,
    btnRefs,
    onOpen: openKey,
    onHover: setHover,
    onFocusKey: (i, visible) => setFocus(i === null ? null : { i, visible }),
  };

  return (
    <div className="relative space-y-6">
      {/* Skips the 7 filters and 28 keys; hidden until it has keyboard focus */}
      <a
        href={`#${listId}`}
        onClick={e => {
          e.preventDefault();
          document.getElementById(listId)?.querySelector('summary')?.focus();
        }}
        className="btn btn-primary sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-40"
      >
        Skip the skills keyboard
      </a>
      <Filters value={filter} onChange={chooseFilter} />
      <p className="sr-only" aria-live="polite">{announce}</p>

      <div ref={boardRef} className="relative pt-6 sm:pt-8">
        {flat ? (
          <FlatKeys {...handlers} />
        ) : (
          <>
            {/* The real controls for the 3D board: keyboard and screen readers.
                Focus shows on the board (ink outline) and on the key (ink and white frame). */}
            <div role="group" aria-label={GROUP_LABEL} className="sr-only">
              {KEYS.map((k, i) => (
                <button
                  key={k.label}
                  {...keyButton(i, handlers)}
                  onClick={() => {
                    openKey(i);
                    setPulse(p => ({ i, n: (p?.n ?? 0) + 1 }));
                  }}
                >
                  {NAMES[i]}
                </button>
              ))}
            </div>
            <div
              className={`relative aspect-[2/3] sm:aspect-[2/1] lg:aspect-[16/9] rounded-[10px] outline-offset-4 outline-[color:var(--ink)] ${focus?.visible ? 'outline-3' : ''}`}
            >
              {stage === '3d' && (
                <Boundary onError={() => setStage('2d')}>
                  <Suspense fallback={null}>
                    <Keyboard3D
                      cols={cols}
                      focused={focus?.visible ? focus.i : null}
                      open={open}
                      pulse={pulse}
                      filter={filter}
                      entrance={entrance}
                      locator={locatorRef}
                      onHover={setHover}
                      onSelect={openKey}
                      onFrame={placeTip}
                      onEntered={() => {
                        enteredThisLoad = true;
                      }}
                    />
                  </Suspense>
                </Boundary>
              )}
            </div>
          </>
        )}

        {tip !== null && <KeyTip key={tip} index={tip} tipRef={tipRef} reduced={flat} />}
        <AnimatePresence>
          {open !== null && (
            <SkillWindow key={open} index={open} reduced={flat} boardRef={boardRef} locate={locate} onClose={closeWindow} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
