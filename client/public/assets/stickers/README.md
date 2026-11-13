# John's pixel stickers

John's own pixel art (from his reference sheet, Nov 2026), cut out unchanged
with transparent backgrounds and shipped at up to 160px on the long side (shown
at about 72px). Scattered in the side gutters by `client/src/components/comic/Stickers.tsx`.

Left out of his sheets because they are other companies' characters, logos or
icon sets: the grey cat (Pusheen), Tamagotchi, the Oreo cookie, the Chrome
dinosaur, the Mario mushroom, and the whole Windows 95 sheet (folder, phone, CD,
Notepad, Word, Paint tools, Start menu). Original stand-ins for the Windows ones
are `assets/pixel/sticker-{cd,folder,phone,notepad,magnifier}.svg`.

## Currently shown and unused (Nov 2026)

Home shows work objects only, at most two per section (review items 8–11,
approved by John on 13 Nov 2026). From this folder only `retro-computer.png`
(Experience) and `cursor-arrow.png` (Skills) are shown; the other five gutter
stickers are the original `assets/pixel/sticker-*.svg` icons.

These files are kept here, unchanged, but are not rendered anywhere:

| File | Why it is not shown |
|---|---|
| `ace-card.png` | Off-topic (gambling) |
| `anatomical-heart.png` | Off-topic; tone risk for a bank recruiter |
| `eyeball.png` | Off-topic; tone risk for a bank recruiter |
| `arcade.png` | Games, not work |
| `coffee-cup.png` | Not a work object in the desktop world |
| `cookie.png` | Off-topic |
| `pixel-heart.png` | Decoration with no work meaning |
| `striped-roll.png` | Unreadable at 72px, off-topic |

To bring one back, add it to `SETS` in `client/src/components/comic/Stickers.tsx`.
