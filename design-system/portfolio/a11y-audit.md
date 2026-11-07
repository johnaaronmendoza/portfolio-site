# Accessibility audit

Independent audit by `testing-accessibility-auditor`. Standard: WCAG 2.2 AA plus the binding "Readable first" rules in `CLAUDE.md`. Status labels: **Tested** means reproduced at least twice in the browser. **Automated** means axe flagged it and nobody confirmed it by hand. **Assumed** means it could not be tested here, and the entry says why.

---

## 2026-11-07: `rebrand` @ 2fa0828 (includes 690d181)

**Setup:** production build (`pnpm build`) served on `PORT=3700 node dist/index.js`. Tests ran in headless Chromium (Playwright 1.63, SwiftShader WebGL, so the 3D keyboard rendered) with axe-core 4.14.0 injected.

**Viewports:**
- 1366x900
- 375x812 (`isMobile`, `hasTouch`)
- 1280px at 200% zoom (640x450 CSS px)
- 1280px at 400% zoom (320x225 CSS px)
- `prefers-reduced-motion: reduce`

**Pages:** `/`, `/projects/silverlink`, `/projects/scs`.

**Evidence:** screenshots and JSON in the session scratchpad (`…/scratchpad/a11y/`). That folder is temporary.

### Summary

- **3 serious, 6 moderate, 7 minor new barriers.** No blockers.
- **Serious:**
  1. Pinch zoom is blocked.
  2. `menu.exe` cannot be fully reached at 400% zoom.
  3. The chat cannot be used at 200% and 400% zoom.
- **Known – fix in progress:** all six items are still present at this commit. Current state is listed at the end.
- **Most of the site passes.** That covers keyboard paths, dialog focus handling, reduced motion, Pause motion, sound consent, DOM text contrast, type sizes and reflow of page content (details in the Pass list).
- **CRT scanline overlay:** the critique's concern does not reproduce at this commit. `#root` (`z-index: 4`, `index.css:740-742`) now paints above `body::after` (`z-index: 2`, `index.css:307-323`). Pixel sampling shows the 2px lines only on the bare navy page and not over window bodies or text.

### Barriers

#### A1. Pinch zoom disabled by `maximum-scale=1`: serious
- **WCAG:** 1.4.4 Resize Text (AA). Also against "Readable first".
- **Where:** all pages, `client/index.html:6`, `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">`.
- **Reproduce:**
  1. Load any page and read `document.querySelector('meta[name=viewport]').content`.
  2. Run axe: rule `meta-viewport`.
  3. Reproduced on all three pages at 1366 and at 375.
- **Actual:** the viewport caps scale at 1. Android Chrome (without "Force enable zoom") and in-app webviews then block pinch zoom. iOS Safari ignores the cap.
- **Expected:** users can pinch-zoom to at least 200%.
- **Fix:** `content="width=device-width, initial-scale=1"`. Delete `maximum-scale`, and do not add `user-scalable=no`.
- **Status:** **Tested** (markup and axe). The effect on real devices is **Assumed**, because there was no physical Android or iOS device.

#### A2. `menu.exe` runs off the top of the screen at 400% zoom, and the page cannot scroll to it: serious
- **WCAG:** 1.4.10 Reflow (AA) and 2.4.11 Focus Not Obscured (Minimum) (AA).
- **Where:** `/`, below `lg`. `components/SectionNav.tsx:81` (`fixed bottom-20 left-4`, no max-height or overflow), with the scroll lock at `SectionNav.tsx:42-44` (`documentElement.style.overflow = 'hidden'` plus `lenis.stop()`).
- **Reproduce:**
  1. Open a 320x225 viewport (1280px at 400%).
  2. Activate **Menu**.
  3. Press Tab twice, or try to scroll up.
- **Actual:** the dialog spans y = -188 to 145.
  - **Top**, **About** and **Experience** sit above the viewport, at y = -130, -86 and -42.
  - The wheel does nothing, because page scroll is locked and the dialog itself does not scroll.
  - Keyboard focus lands on **Experience** at top = -42, where nobody can see it.
- **Expected:** every menu item can be seen and reached at 320x225.
- **Fix:**
  - Give the dialog `max-h-[calc(100dvh-6rem)]` and make the `<ul>` scroll (`overflow-y-auto`, plus `data-lenis-prevent`).
  - Or anchor the dialog with `top: max(1rem, …)` in place of `bottom-20` when space is short.
  - Call `scrollIntoView({block:'nearest'})` on focus.
- **Status:** **Tested** (2 runs, identical numbers). At 200% (640x450) the menu fits (y 37–370).

#### A3. Chat window cannot be used at 200% and 400% zoom: serious
- **WCAG:** 1.4.10 Reflow (AA). It also affects 1.4.4.
- **Where:** every page, `components/MascotChatWidget.tsx:315-316`. The panel has a fixed `height: min(520px, calc(100dvh - 8rem))`. The quick actions (`:361`) and the form (`:376`) are `flex-shrink-0`.
- **Reproduce:**
  1. At 640x450, open Chat. The message log (`[role=log]`) is **32px tall**, so the greeting is cut to its top border. Screenshot `z200-chat-run1.png`.
  2. At 320x225, open Chat. The panel is only 97px tall. The last quick action (top 226), the text input (top 309) and **Send** (top 297) are all below the 225px viewport, and a fixed panel cannot be scrolled to them.
  3. Repeated in 2 runs.
- **Actual:** at 200% the answers cannot be read. At 400% the visitor cannot type or send at all.
- **Expected:** the messages stay readable and the input stays reachable at 320 CSS px wide and 256 CSS px tall.
- **Fix:**
  - On short viewports (`@media (max-height: 500px)`), open the chat as a full-height sheet (`inset-0`, `100dvh`).
  - Collapse the 6 quick actions into one horizontally scrolling row, or hide them behind a "Topics" toggle.
  - Give the log a `min-height` of about 6 lines and let the whole panel scroll (`overflow-y-auto`) rather than the log alone.
- **Status:** **Tested.** At 375x812 the chat works: the log is 213px tall.

#### A4. Command palette arrow-key selection leaves the visible area: moderate
- **WCAG:** 2.4.7 Focus Visible and 2.4.11 Focus Not Obscured (Minimum).
- **Where:** `components/CommandPalette.tsx:197-204`. Arrow keys change `selectedIndex`, but nothing scrolls the selected row into view. The list is `max-h-96 overflow-y-auto` (`:269`).
- **Reproduce:**
  1. At 1366x900, press Ctrl+K.
  2. Press ArrowDown repeatedly.
- **Actual:**
  - At 1366x900, from the 6th of 18 commands (**Go to Contact**) the orange "selected" row is out of view. Enter then runs a command the user cannot see.
  - At 200% this starts at the 4th row.
  - The palette is fixed and runs past the viewport (bottom 654 at 450 tall, 641 at 225 tall), so the footer hints are never visible.
- **Expected:** the selected row is always visible.
- **Fix:** in the ArrowUp/ArrowDown handlers, call `rowRefs[next]?.scrollIntoView({block:'nearest'})`. Also cap the dialog at `max-h-[calc(100dvh-2rem)]` with the list as the flexible, scrolling part.
- **Status:** **Tested** (2 runs, 1366 and 200%).

#### A5. Command palette selection and results are not exposed to screen readers: moderate
- **WCAG:** 4.1.2 Name, Role, Value and 4.1.3 Status Messages.
- **Where:** `CommandPalette.tsx:254-263` (input), `:269-292` (rows), and the `No commands found` paragraph.
- **Reproduce:**
  1. Open the palette.
  2. Check the input: it has no `role="combobox"`, `aria-controls`, `aria-expanded` or `aria-activedescendant`.
  3. Press ArrowDown twice. Focus stays on the input, and the highlighted row has no `aria-selected`.
  4. Type `zzzz`. "No commands found" is not in a live region.
  5. Reproduced in 2 runs.
- **Actual:** a screen-reader user hears nothing while arrowing and nothing when the filter empties the list. (Tab still reaches the rows as real buttons, so this is moderate and not serious.)
- **Expected:** the active option is announced and the result count is announced.
- **Fix:**
  - Use the ARIA combobox pattern: the input gets `role="combobox"`, `aria-expanded="true"`, `aria-controls="palette-list"` and `aria-activedescendant={rowId}`. The list gets `role="listbox"`, and each row gets `role="option"`, `id` and `aria-selected`.
  - Add a polite live region: `{n} commands` / `No commands found`.
- **Status:** **Tested** (DOM attributes). What NVDA or VoiceOver actually say is **Assumed**, because there was no real screen reader.

#### A6. Opening the chat hides keyboard focus on the section dots: moderate
- **WCAG:** 2.4.11 Focus Not Obscured (Minimum) (AA).
- **Where:** `/` at ≥1024px. The chat panel (`MascotChatWidget.tsx:315`, `z-50`, x 966–1350) sits over the section-dot nav (`SectionNav.tsx:193`, `z-40`, x 1314–1358).
- **Reproduce:**
  1. At 1366x900, open Chat. Focus is on the input.
  2. Tab to **Send**, then Tab again. Focus leaves the non-modal chat, goes through `<body>` and wraps to the top of the page.
  3. Keep tabbing: Skip link → Pause motion → Sound → **Go to Top … Go to Contact**.
- **Actual:** all six dot buttons, their focus rings and their hover/focus labels are covered by the panel. Screenshot `dots-under-chat-run1.png`.
- **Expected:** a focused control is never fully hidden.
- **Fix (any one):**
  - Close the chat when focus leaves it (`focusout` with a `relatedTarget` outside the panel).
  - Move the dots left of the chat (`right-[26rem]`) while it is open.
  - Keep `z-40` dots above the panel.
- **Status:** **Tested** (2 runs).

#### A7. Single-character shortcuts `` ` `` and `?` cannot be turned off: moderate
- **WCAG:** 2.1.4 Character Key Shortcuts (A).
- **Where:** `components/SecretTerminal.tsx:253` (backtick toggles the terminal) and `components/KeyboardShortcuts.tsx:27` (`?` toggles the shortcuts dialog). Both are on every page.
- **Reproduce:**
  1. Focus any link, e.g. **See projects**.
  2. Press `` ` ``. The Terminal dialog opens and takes focus.
  3. Press `?`. The Keyboard shortcuts dialog opens.
  4. Reproduced in 2 runs.
- **Actual:** stray keystrokes, or speech-input users dictating, open modal dialogs that move focus. There is no way to turn these shortcuts off or remap them. The handlers skip only `INPUT` and `TEXTAREA`, so `contenteditable` fields and other widgets are not protected.
- **Expected:** the user can turn single-key shortcuts off or remap them, or they work only with a modifier.
- **Fix:**
  - Require a modifier (e.g. Ctrl/Cmd+`` ` `` and Shift+? only when no field has focus), or
  - Add a "Keyboard shortcuts: on/off" toggle in `shortcuts.txt`, persisted like Sound.
- **Status:** **Tested.**

#### A8. Skill `*.info` tooltip cannot be dismissed with Escape: moderate
- **WCAG:** 1.4.13 Content on Hover or Focus (AA).
- **Where:** `components/SkillKeyboard.tsx:303` (the tip shows while a key has keyboard focus) and `:175` (`role="tooltip"`, `pointer-events-none`).
- **Reproduce:**
  1. At 1366, Tab into the Skills keys.
  2. Focus **Retrieval-augmented generation**. `rag.info` appears (`visibility: visible`).
  3. Press Escape. The tooltip stays visible.
  4. Reproduced in 2 runs.
- **Actual:** the tooltip stays until focus moves, and it can cover nearby content.
- **Expected:** Escape hides it without moving focus.
- **Fix:** add a `dismissed` state that Escape sets on `keydown` while a tip is shown. Reset it on the next focus or hover change.
- **Note:** because of `pointer-events-none`, a mouse user cannot move onto the tooltip without it switching to another key. That is the "hoverable" condition of 1.4.13. **Assumed** from code: hover was not driven in the test. It matters less because the same text is in the detail window.
- **Status:** **Tested** (Escape).

#### A9. Project tiles: the visible label is not in the accessible name: moderate
- **WCAG:** 2.5.3 Label in Name (A).
- **Where:** `components/Projects.tsx:156` and `:167`. The tile links have `aria-label="SilverLink SG: view case study"` (or "…: visit site (opens in a new tab)"), but the visible call to action reads **Read case study** / **Visit site** (`:139`). The same applies to the "Next project" tile on case pages.
- **Reproduce:**
  1. Run axe rule `label-content-name-mismatch` (7 nodes on `/`, 1 on each case page).
  2. Check the Playwright ARIA snapshot: link name "SilverLink SG: view case study", with the text "Read case study" inside.
  3. Reproduced at 1366 and at 375.
- **Actual:** a speech-control user who says "click Read case study" gets no match.
- **Expected:** the name contains the visible text.
- **Fix:** `aria-label={`${project.name}: read case study`}` (and `: visit site`). Or drop the aria-label and use `aria-labelledby` pointing to the h3 and the CTA.
- **Status:** **Tested.**

#### A10. Project screenshots expose an unnamed image inside every tile link: minor
- **WCAG:** 1.1.1 Non-text Content and 4.1.2.
- **Where:** `components/PixelatedImage.tsx:147-148` (`<canvas role="img" aria-label={alt}>`), called with `alt=""` from `Projects.tsx:72`.
- **Reproduce:**
  1. Run axe rule `role-img-alt` (7 nodes on `/`, 1 on each case page).
  2. Check the ARIA snapshot of a tile: a bare `img` with no name.
  3. Reproduced at both widths.
- **Actual:** an `img` role with an empty name. Screen readers may say "image" or "unlabelled graphic" in each tile.
- **Expected:** decorative images are hidden.
- **Fix:** in `PixelatedImage`, when `alt === ''`, render `aria-hidden="true"` and no `role`.
- **Status:** **Tested** (axe plus the accessibility tree). Real screen-reader wording is **Assumed**.

#### A11. Chat input is disabled while the bot replies, so focus drops to `<body>`: minor
- **WCAG:** 2.4.3 Focus Order (and 3.2.2 on input).
- **Where:** `MascotChatWidget.tsx:389` (`disabled={isTyping}`).
- **Reproduce:**
  1. Type `silverlink` in the chat.
  2. Press Enter.
  3. Read `document.activeElement` at once: it is `BODY`. About 0.8s later focus returns to the input. Reproduced in 2 runs.
- **Actual:** screen readers may announce a context change or the document title, and the visitor briefly loses their place.
- **Expected:** focus stays on the input.
- **Fix:**
  - Use `aria-disabled` and `readOnly` in place of `disabled` (the Send button already uses `aria-disabled`).
  - Ignore submits while `isTyping`.
- **Status:** **Tested.**

#### A12. Skip link focus ring is under 3:1 on case-study pages: minor
- **WCAG:** 1.4.11 Non-text Contrast (focus indicator).
- **Where:** `components/SkipLink.tsx:6` on `/projects/*`. The link appears at `top-4 left-4`, over the violet sticky taskbar (`CaseLayout.tsx:67`).
- **Reproduce:**
  1. Load `/projects/silverlink` or `/projects/scs`.
  2. Press Tab.
  3. Measure the orange ring (#FF7A2F) against the violet taskbar (#6C4AD0) behind it: **2.29:1**. Screenshot `skip-case-run1.png`.
  4. Reproduced in 2 runs.
- **Expected:** at least 3:1 against the adjacent colour.
- **Fix:** give the skip link `[--focus:var(--cream)]` (cream on violet 4.98:1), or use the `focus-ring-float` style (ink ring with cream halo).
- **Status:** **Tested.**

#### A13. Floating controls come before the page content in Tab order: minor
- **WCAG:** 2.4.3 Focus Order.
- **Where:** `pages/Home.tsx:181-182`. `SectionNav` is rendered before `<main>`.
- **Reproduce:** on `/` at 1366, Tab from the top. The order is Skip link → **Pause motion → Sound → Go to Top … Go to Contact** (8 stops), then **Download resume**. At 375 the order is Skip link → Menu → Pause → Sound → Download resume.
- **Actual:** a keyboard user who does not use the skip link passes 8 utility stops before the hero call to action. This is not a failure, but it is an avoidable cost.
- **Fix:** render `SectionNav` after `</main>` in the DOM. Fixed positioning keeps it in the same visual place.
- **Status:** **Tested.**

#### A14. Sound toggle on mobile: visible "OFF" is not in the name: minor
- **WCAG:** 2.5.3 Label in Name.
- **Where:** `components/SoundToggle.tsx:310-313`. Below `sm`, "Sound" is `sr-only` and the visible state word "ON"/"OFF" is `aria-hidden`.
- **Actual:** the button shows "♪ OFF", but its accessible name is "Sound".
- **Expected:** the visible text is included in the name.
- **Fix:** keep `aria-pressed` and make the name "Sound off/on" (visible word not hidden), or show "Sound" at all widths.
- **Status:** **Assumed** (code review; not reproduced in the browser).

#### A15. House 44px target rule missed on two links (WCAG 2.5.8 passes): minor
- **Rule:** `CLAUDE.md` "Readable first" (44px tap targets). WCAG 2.5.8 (24px) passes.
- **Where:**
  - The breadcrumb **Home** link is **36x44** (`CaseLayout.tsx:79/86`).
  - The skill-window case-study links are **~252x42.5** (`SkillKeyboard.tsx:264`, `py-2.5` on 15px text).
- **Reproduce:** measured at 375 and 1366 (2 runs each).
- **Fix:** `min-w-[44px] justify-center` on the crumb links, and `min-h-[44px] inline-flex items-center` on the skill-window links.
- **Status:** **Tested.**

#### A16. Latent: `body.crt-enhanced` would flash 10 times a second: minor (not reachable today)
- **WCAG (if ever enabled):** 2.3.1 Three Flashes and 2.2.2.
- **Where:** `index.css:326-335`: `animation: scanlines 0.1s steps(1) infinite`. No code adds `crt-enhanced` at this commit (repo grep).
- **Fix:** delete the rule, which is dead code.
- **Status:** **Assumed** (code review; the class is never applied).

### Known – fix in progress (current state at 2fa0828)

| Item | Current state |
|---|---|
| Skills filter state shown by colour only (1.4.1/1.4.11) | Still present. `aria-pressed` carries the state for assistive tech, but the only visual difference is the fill (orange vs cream). Muted caps differ by colour only. |
| Filter row wrapping at 375 | Still present: the 7 chips wrap to **5 rows** at 375x812 (the critique counted 4). |
| Tooltip / filter overlap | Still present at 1366: the `python.info` tooltip's top edge meets the chip row (`skill-focus-run1.png`). |
| No skip link past the Skills keys | Still present: 7 filters + 28 key buttons = 35 Tab stops (desktop stops 30–64) before "All skills as a list". |
| Chat launcher over the case-study "GitHub profile" CTA at 375 | Still present: CTA right edge 332px vs launcher left edge 313px, so they overlap by 19px horizontally when the CTA scrolls to the bottom of the viewport. |
| Keycap palette | Still the blue/amber colourways at this commit (screenshots at 1366). |

### Pass list (tested in the browser, 2 runs each unless noted)

**Keyboard and dialogs**
- **Skip link** is the first stop on every page, visible on focus, and lands on `#main`.
- **No keyboard traps.** Every page's Tab cycle returns to the skip link.
- **Visible focus** on every Tab stop: a 3px outline. Ring contrast is ≥3:1 everywhere measured except A12. The floating controls use an ink ring with a cream halo.
- **Modal dialogs** take focus on open, keep Tab inside, close on Escape and return focus to the opener:
  - Command palette (Ctrl+K)
  - Terminal (`` ` `` and footer `sudo hire-me`)
  - Shortcuts (`?`)
  - Skill detail window (focus returns to the key's button)
  - `menu.exe` at 375 (focus returns to **Menu**; choosing a section moves focus to that section)
- **Chat** is a labelled non-modal dialog. Escape closes it and returns focus to the launcher.

**Screen-reader semantics**
- **Live regions** (Skills filter announcer, toaster, chat log, terminal log) are empty on load and say nothing until the user acts.
- **Landmarks:** `main`, `footer`, `nav "Sections"`, case-page `header`, `nav "Breadcrumb"`, `nav "More projects"`, and labelled `section`s.
- **Headings:** one `h1` per page and a logical h2 → h3 (→ h4 in Experience) order.
- **Window title bars** are `<p>`, not headings, and the ○□✕ controls are `aria-hidden`. That is correct, so title-bar filenames do not pollute the heading outline.
- **Decorative content is hidden:** marquee ribbons, hero art, floating pixels, cursors and mascots are `aria-hidden` or have `alt=""`.

**Motion**
- **Reduced motion:**
  - Particles are not rendered.
  - Ribbons are static.
  - Cursors are solid.
  - The name renders final.
  - The 3D board is replaced by the 2D grid (28 visible buttons, 0 canvases).
  - Section jumps are instant.
  - No CSS or WAAPI animations run, and no inline styles change over 3s.
- **Pause motion** (WCAG 2.2.2):
  - It stops the ribbons, both blinking cursors, the floating pixels and the scroll cue.
  - Particles get `paused` (code).
  - The setting persists across a reload.
  - Case pages have no auto-moving content, so they rightly have no toggle.

**Sound**
- No `AudioContext` is created and no oscillator starts while Sound is OFF. Tested across a key press, the palette, the terminal and the Konami code, and after a reload.

**Text and contrast**
- **DOM text contrast:** every visible text node meets AA at 1366 and 375 on all three pages, with the background walked up the ancestors.
- **Scanline effect on contrast:** palette maths, assuming the overlay were over text, gives at worst cream on violet 4.98 → 4.72. In practice the overlay is now under `#root`.
- **Type sizes:**
  - No text under 12px.
  - Pixel fonts are ≥12px, with title bars and chips at exactly 12px.
  - Body copy is 15–16px at 375.
  - The only text under 15px is short labels at 14px.
  - Body line length is ≤80 characters.
- **Text spacing (1.4.12):** with line-height 1.5, letter-spacing 0.12em, word-spacing 0.16em and paragraph spacing 2em, nothing new clips and nothing scrolls sideways.

**Reflow and targets**
- **Reflow of page content:** no horizontal scroll and no overflowing elements at 320 or 640 CSS px. The sticky case taskbar keeps focus clear via `scroll-padding-top: 72px`.
- **Touch targets:** every visible control is ≥44px, apart from A15. The hidden 3D proxy buttons are not tap targets.

### Not tested

- Real screen readers: VoiceOver on macOS and iOS, NVDA or JAWS on Windows, TalkBack on Android. Announcements were inferred from the accessibility tree.
- iOS Safari and Android Chrome on real devices, including pinch zoom (A1), the visual viewport while the on-screen keyboard is open in the chat, and touch on the 3D keyboard.
- Firefox and Safari engines. Only Chromium was used.
- Windows High Contrast / `forced-colors`, especially the 3D canvas keyboard and the colour-only filter state.
- Speech control (Voice Control, Dragon) and switch access, except as inferred for A7, A9 and A14.
- Legibility and contrast of the 3D keycap legends. A canvas is invisible to DOM checks, so these were only looked at in screenshots.
- Real browser zoom (Ctrl/Cmd +). 200% and 400% were emulated by viewport size and device pixel ratio.
- Orientation lock (1.3.4) and the remaining case-study pages (`/projects/ai-finance`, `uwb`, `uat`, `firesafety`).
- Audio output with Sound ON. Only whether audio starts without consent was checked.

### Skills used

- `make-interfaces-feel-better`: loaded for this audit and used for the hit-area review.
- Playwright (headless Chromium with SwiftShader), axe-core 4.14.0, Pillow (pixel sampling of the scanline overlay).
