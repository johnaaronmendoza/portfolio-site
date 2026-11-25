import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Particles from "./Particles";
import { unlockAchievement } from "@/hooks/useAchievements";
import { play } from "@/hooks/useSound";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCalmMotion } from "@/hooks/useCalmMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTextScramble } from "@/hooks/useTextScramble";
import { motionTokens } from "@/lib/motion-tokens";
import { scrollToSection } from "@/lib/utils";
import { PixelGitHub, PixelLinkedIn } from "@/components/PixelIcons";
import { Chip, Lead } from "@/components/Hierarchy";
import PixelArt from "@/components/PixelArt";
import HeroNarrator from "@/components/comic/HeroNarrator";
import DeskAssistWindow from "@/components/DeskAssistWindow";
import ProofPoints from "@/components/ProofPoints";
import { GUTTERS } from "@/components/Section";
import Window from "@/components/Window";

const { hero: HERO, loop: LOOP, easing } = motionTokens;

// U+2011 non-breaking hyphen: "full-stack" never splits across lines
const ROLE_LINE = "AI, data and full\u2011stack developer";

// Two-tone name on the black window: white, then yellow (21:1 and 14:1 on black)
const NAME_LINES = [
  { text: "JOHN AARON", color: "text-[color:var(--paper)]" },
  { text: "BRANZUELA", color: "text-[color:var(--yellow)]" },
];

// Particle field over the page ground: blue, with ink only among the largest
// (near) pixels, so the field reads as one colour with a few dark accents
const PARTICLE_COLORS = ["--blue"];
const PARTICLE_NEAR = ["--blue", "--blue", "--ink"];

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

// Email, GitHub, LinkedIn: one row of Plex Mono text links under the two
// buttons, each a 44px target, with the house pixel icons (no brand logos)
const CONTACT_LINK =
  "inline-flex min-h-11 items-center gap-2 font-label text-body-sm sm:text-body text-[color:var(--text)] underline underline-offset-4 decoration-2 hover:no-underline";

/** Blinking block cursor; solid when motion is calmed */
function Cursor({ calm, className }: { calm: boolean; className: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`inline-block flex-shrink-0 bg-[var(--yellow)] ${className}`}
      animate={calm ? { opacity: 1 } : { opacity: [1, 0] }}
      transition={
        calm ? { duration: 0 } : { duration: LOOP.blink, repeat: Infinity }
      }
    />
  );
}

// One line of the visual name: clip reveal + scramble on load, re-scramble on hover
function ScrambleLine({
  text,
  color,
  delay,
  reduced,
  calm,
  children,
}: {
  text: string;
  color: string;
  delay: number;
  reduced: boolean;
  calm: boolean;
  children?: ReactNode;
}) {
  const { displayText, scramble } = useTextScramble(text, {
    delay: delay * 1000,
    frames: 22,
    autoplay: true,
  });

  return (
    <motion.span
      className={`block whitespace-nowrap ${color}`}
      // Reduced motion: the name renders final, with no clip reveal (DESIGN.md)
      initial={
        reduced ? false : { opacity: 0, y: 32, clipPath: "inset(100% 0 0 0)" }
      }
      animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
      transition={{ duration: HERO.line, delay, ease: easing.out }}
      onMouseEnter={() => !calm && scramble()}
    >
      {reduced ? text : displayText}
      {children}
    </motion.span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const calm = useCalmMotion();
  // The narrator mounts only where it shows (beside the window from 1280px)
  const xl = useMediaQuery("(min-width: 1280px)");

  // Particles also pause while the hero is scrolled out of view
  const sectionRef = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting)
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden min-h-[100svh] flex flex-col text-[color:var(--text)] ${GUTTERS} pt-8 pb-6 sm:pt-20 lg:pt-14 lg:pb-28 xl:pt-20 xl:pb-6 short-desk:pt-3 hero-fold:pt-0`}
    >
      {/* WebGL particles (skipped with reduced motion, frozen by Pause motion);
          they fade out around the text marked `particles-clear` */}
      {!reduced && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Particles
            colors={PARTICLE_COLORS}
            nearColors={PARTICLE_NEAR}
            density={5}
            maxCount={110}
            followPointer
            clearSelector=".particles-clear"
            paused={calm || !onScreen}
          />
        </div>
      )}

      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-4xl lg:max-w-6xl mx-auto">
          {/* hero-fold (index.css): fills the first screen, content centred */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-start hero-fold:min-h-svh hero-fold:content-center">
            {/* Phones: no full-height intro, so desk_assist.exe's title bar peeks
                above the fold (John, 17 Nov) */}
            <div className="lg:col-span-7">
              <motion.div
                className="mb-6 sm:mb-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: HERO.window, ease: "easeOut" }}
              >
                {/* Terminal variant: black body so the two-tone name reads */}
                <Window
                  title="welcome.exe"
                  bodyClassName="bg-black text-[color:var(--paper)] [--focus:var(--paper)] p-6 short-phone:p-4 sm:p-10 xl:p-12"
                >
                  {/* Sized so BRANZUELA plus the cursor fits from 320px up */}
                  <h1 className="font-pixel leading-[1.25] text-[length:clamp(20px,7vw,30px)] sm:text-4xl lg:text-[36px] xl:text-5xl">
                    <span className="sr-only">
                      John Aaron Mendoza Branzuela
                    </span>
                    <span aria-hidden="true">
                      {NAME_LINES.map((line, i) => (
                        <ScrambleLine
                          key={line.text}
                          text={line.text}
                          color={line.color}
                          delay={HERO.lineStart + i * HERO.lineStagger}
                          reduced={reduced}
                          calm={calm}
                        >
                          {i === NAME_LINES.length - 1 && (
                            <Cursor
                              calm={calm}
                              className="w-2 h-[0.9em] ml-1 align-[-0.05em]"
                            />
                          )}
                        </ScrambleLine>
                      ))}
                    </span>
                  </h1>
                </Window>
              </motion.div>

              {/* Role line */}
              <motion.div
                className="mb-4 short-phone:mb-3 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: motionTokens.duration.slow,
                  delay: HERO.role,
                }}
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-body-sm sm:text-body text-[color:var(--text)] flex-shrink-0"
                >
                  {">"}
                </span>
                <p className="font-mono text-body-sm sm:text-body font-bold text-[color:var(--blue-text)] particles-clear">
                  {ROLE_LINE}
                </p>
              </motion.div>

              {/* Positioning: the L2 lead (no prompt: the role line above has it) + study chip */}
              <motion.div
                className="mb-6 short-phone:mb-4 sm:mb-10 space-y-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: HERO.line,
                  delay: HERO.body,
                  ease: easing.out,
                }}
              >
                <Lead
                  text="I build AI and data tools people can trust, now building Desk Assist at LGA Telecom."
                  prompt={false}
                  className="particles-clear"
                />
                <Chip
                  icon="chip-school"
                  text={"SIT × Glasgow · graduating\u00a0Apr\u00a02027"}
                  className="particles-clear"
                  lazy={false}
                />
              </motion.div>

              {/* Two actions: resume first, then the projects; contact and
                  profiles as one row of text links under them */}
              <motion.div
                className="particles-clear space-y-3 short-phone:space-y-2 sm:space-y-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: HERO.line,
                  delay: HERO.ctas,
                  ease: easing.out,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 short-phone:gap-2 sm:gap-4">
                  <a
                    href="/resume.pdf"
                    download="John_Aaron_Branzuela_Resume.pdf"
                    onClick={() => play("click")}
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    <PixelArt name="floppy" size={16} />
                    Download resume (PDF)
                  </a>
                  <a
                    href="#projects"
                    onClick={e => {
                      e.preventDefault();
                      scrollToSection("projects", reduced);
                    }}
                    className="btn btn-secondary w-full sm:w-auto"
                  >
                    See projects
                  </a>
                </div>
                <ul
                  aria-label="Contact and profiles"
                  className="flex flex-wrap items-center gap-x-6 sm:gap-x-8"
                >
                  <li>
                    <a
                      href="mailto:johnaaronmb@gmail.com"
                      className={CONTACT_LINK}
                    >
                      <PixelArt name="icon-contact" size={16} />
                      Email me
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/johnaaronmendoza"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        unlockAchievement("NETWORKER");
                        play("click");
                      }}
                      className={CONTACT_LINK}
                    >
                      <PixelGitHub size={16} />
                      GitHub{NEW_TAB}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/john-branzuela/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        unlockAchievement("NETWORKER");
                        play("click");
                      }}
                      className={CONTACT_LINK}
                    >
                      <PixelLinkedIn size={16} />
                      LinkedIn{NEW_TAB}
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* The AI proof: desk_assist.exe. From 1280px the column borrows 64px of
                the gutter on its left so Lil Johnny can stand on the window's edge,
                pointing at the agent-review step (his bubble opens the chat). After
                the left column, so tab order runs name, CTAs, narrator, flow link. */}
            <motion.div
              className="mt-12 lg:mt-0 lg:col-span-5 xl:-ml-16 xl:grid xl:grid-cols-[148px_minmax(0,1fr)] xl:gap-x-3 xl:items-end"
              initial={{
                opacity: 0,
                y: reduced ? 0 : motionTokens.distance.sm,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: HERO.line,
                delay: HERO.ctas,
                ease: easing.out,
              }}
            >
              {xl && <HeroNarrator />}
              <DeskAssistWindow />
            </motion.div>
          </div>

          {/* Proof points: three figures, each with what it means and a link to
              the evidence (replaced the stats band, John, 16 Nov) */}
          <motion.div
            className="mt-12 lg:mt-14"
            initial={{ opacity: 0, y: reduced ? 0 : motionTokens.distance.sm }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: HERO.line,
              delay: HERO.ctas,
              ease: easing.out,
            }}
          >
            <ProofPoints />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue: in the flow so it never covers the buttons on short screens;
          not on phones, where desk_assist.exe peeking above the fold says it */}
      <motion.button
        type="button"
        aria-label="Scroll to About"
        onClick={() => scrollToSection("about", reduced)}
        className="relative z-10 self-center mt-8 min-h-[44px] min-w-[44px] px-3 hidden sm:flex flex-col items-center justify-center gap-1 text-[color:var(--text)] particles-clear"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: HERO.cue, duration: motionTokens.duration.slow }}
      >
        <span className="font-mono text-body-sm">Scroll</span>
        <motion.span
          aria-hidden="true"
          className="block w-4 h-4 border-r-[3px] border-b-[3px] border-current rotate-45"
          animate={calm ? { y: 0 } : { y: [0, 6, 0] }}
          // Three bounces once it shows, then still: fewer endless loops in the hero
          transition={
            calm
              ? { duration: 0 }
              : {
                  duration: LOOP.bounce,
                  repeat: 3,
                  delay: HERO.cue,
                  ease: "easeInOut",
                }
          }
        />
      </motion.button>
    </section>
  );
}
