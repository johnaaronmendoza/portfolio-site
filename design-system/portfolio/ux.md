# Portfolio UX notes

Owner: ux-researcher. Audited build: branch `retro-web` @ 066b52a (retro web Home).
Method: code walkthrough only (no browser available). Layout claims at 375px are
computed from the CSS and marked "verify" where a browser check is needed.

## 1. Information architecture

Home order: Hero (`welcome.exe`) → StatsBand → About → Experience → Projects → Skills → Footer (contact).

Why this order works: identity and resume first, proof (figures, experience)
next, then work, then skills, then contact. Two IA gaps:

- **Contact lives only at the very bottom.** On a phone that is the whole page
  away. Email should also sit in the hero CTA row (Resume, Email, LinkedIn, GitHub).
- **The flagship projects sit behind 8 filter chips.** At 375px the chips take
  about 3 rows before SilverLink SG appears. Put the two featured tiles first,
  or move the filters below them.

Case studies: `/projects/{silverlink,scs,ai-finance,uwb,uat,firesafety}`. Each one
has a sticky "← Back" at the top and "← Back to portfolio" plus a "next project"
button at the bottom.

## 2. Navigation model

| Mechanism | Where | Notes |
|---|---|---|
| Section dots | `SectionNav.tsx:68` | `lg` and up only; 8px dots; no `<nav>` |
| Arrow keys | `useKeyboardNavigation.ts` | Hijacks ↑/↓ globally (F5) |
| Command palette | `CommandPalette.tsx` | Ctrl/Cmd+K only; no visible trigger; no Resume or Email command |
| Chat | `MascotChatWidget.tsx` | Fixed bottom-right |
| Pause motion | `SectionNav.tsx:57` | Fixed bottom-left |
| Back links | case-study pages | `setLocation('/')`, which pushes a new entry |

On phones there is no navigation at all: no menu, no dots and no skip link.

## 3. Journeys

1. **Recruiter, phone, 30s: FRICTION.** Name, role and positioning are clear.
   Resume is at roughly y≈625px (computed) and finishes appearing at 1.6s, so it
   sits at or below the fold on a 667px phone, under the Pause button. Email
   needs a scroll to the footer. "BRANZUELA" is likely clipped (F3).
2. **Hiring manager, laptop, 3 min: FRICTION.** Tiles open the case study fine.
   The round trip breaks: Back (button or browser) lands at the top of the hero,
   not at Projects, and the button adds a history entry (F2).
3. **Keyboard / screen reader: FRICTION.** The h1 name is announced as garbage
   or three times (F1). There is no skip link. Arrow keys jump whole sections
   (F5). Focus is not moved on route change. Skill keys are announced twice (F8).
4. **Reduced motion / slow phone: FRICTION.** The CSS media query stops CSS
   animation, but the Framer Motion loops keep running (floating pixels,
   blinking cursors, scroll arrow). "Pause motion" stops only the marquees (F4).

## 4. Findings log (most severe first)

| # | Sev | Heuristic / WCAG | file:line | What happens | Fix |
|---|---|---|---|---|---|
| F1 | major | 1.3.1, 4.1.2 | `Hero.tsx:140-142`, `index.css:451-460`, `useTextScramble.ts` | The h1 starts as random characters. `.glitch::before/::after` add `content: attr(data-text)`, so the accessible name can contain the full name three times. Hover re-scrambles the name. | Add `<span class="sr-only">John Aaron Mendoza Branzuela</span>` and set `aria-hidden` on the visual line spans. Use `content: attr(data-text) / ""` or drop the `glitch` pseudo-elements. |
| F2 | major | Nielsen 3, user control; `back-behavior` | `SilverLinkProject.tsx:25,261` (all case pages); `App.tsx:23-34` | Back pushes `/` and ScrollToTop jumps to 0 on every location change, POP included. The visitor loses their place, and browser Back then returns to the case study. | Make Back a `<Link href="/#projects">`. Home scrolls to the hash after mount. ScrollToTop skips when a hash is present and restores the saved scroll on POP. |
| F3 | major | 1.4.10 reflow (verify) | `Hero.tsx:140` | At 375px the body is about 273px wide. "BRANZUELA" is 9 glyphs × 31.5px ≈ 283px in `text-3xl` with 0.05em tracking, and `overflow-hidden` clips it. | Use `text-[26px]` (or clamp) below `sm`, and test at 320, 360 and 375px. |
| F4 | major | 2.2.2, 2.3.3; Nielsen 1 | `Hero.tsx:112-123,154,172,251`; `SectionNav.tsx:57` | Infinite Framer loops ignore `prefers-reduced-motion` and the "Pause motion" toggle. The label promises more than it does. | Wrap the app in `<MotionConfig reducedMotion="user">`. Gate the loops on `reduced` or on `data-motion="paused"` (cursor stays solid, pixels static). |
| F5 | major | 2.1.1 / 2.1.4, user control | `useKeyboardNavigation.ts:15-50` | ↑/↓ always jump a whole section, so a reader can't scroll line by line through long sections. The hook also fires behind the open palette (`CommandPalette.tsx:242`) and inside inputs. | Remove it, or ignore events when `e.defaultPrevented`, a modifier is held, or the target is an input or inside a dialog. A better binding is `j`/`k`, or Alt+↑/↓. |
| F6 | major | 2.4.11 focus not obscured; `fixed-element-offset` | `SectionNav.tsx:61`, `MascotChatWidget.tsx:246` | The fixed 44px buttons sit in the bottom 62px of each corner. Left-aligned CTAs (Resume, Email me) can sit under Pause at 375px. No scroll padding is set. | Add `html { scroll-padding-bottom: 80px }` and bottom padding on the page equal to the fixed-button height plus offset. |
| F7 | major | Recognition over recall; IA | `Hero.tsx:192`, `Footer.tsx:47`, `CommandPalette.tsx` | No email above the fold. The palette has no Resume or Email command, and its "Go to …" commands do nothing on case-study pages (the element is null). | Add an Email CTA to the hero. Add Resume and Email commands. Section commands should navigate to `/#id` when not on Home. |
| F8 | minor | 4.1.3; nothing announced twice | `SkillKeyboard.tsx:124,206` | Each Tab announces the key label and also the `aria-live` panel. On phones the sticky panel (≥200px, `top-0`) covers keys while tabbing or scrolling. | Drop `onFocus` preview or `aria-live`; update the panel on press only. On mobile make the panel non-sticky, or add `scroll-margin-top` to the keys. |
| F9 | minor | 2.4.1 bypass blocks; landmarks | `Home.tsx`, case pages | No skip link. Section dots are not in a `<nav>`. Case pages have no `<main>`. Focus stays on the old element after a route change. | Add a skip link to `#main`, wrap the dots in `<nav aria-label="Sections">` and add `<main>` to case pages. On route change, focus the page h1 (`tabIndex=-1`). |
| F10 | minor | Honesty, false affordance | `Window.tsx:22` | ○□✕ look like real window controls at text size, and visitors will try ✕. They are already `aria-hidden`. | Keep them inert: no hover or cursor change. The designer can mute them so they read as ornament. Never wire them to half-work. |
| F11 | minor | 2.5.8 target size | `SectionNav.tsx:83` | The dot targets are 8px tall. | Pad each button to at least 24×24 (ideally 44). |
| F12 | minor | 4.1.3 status messages | `Projects.tsx:313` | Filtering changes the grid silently. | Add a polite live region: "3 projects match Python". |
| F13 | minor | Escape routes | `MascotChatWidget.tsx` | Escape does not close the chat. At 375px the 520px panel covers most of the page. | Close on Escape and return focus to the launcher. Cap the height at `calc(100dvh - 8rem)`. |

Marquees (`Ribbon.tsx`): **pass**. They are `aria-hidden`, pause on hover, follow
the toggle and stay static under reduced motion. Their only gap is that touch users
can't hover; the toggle covers that.

## 5. Re-test checklist
375 + 1366: name not clipped; Resume and Email visible above the fold at 375×667;
Tab through the whole page with nothing hidden under the fixed buttons; screen
reader reads the h1 once; tile → case → Back lands at Projects; reduced motion
leaves nothing moving.
