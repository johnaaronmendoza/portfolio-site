// Home's scroll position when the visitor last left it, so browser Back from a
// case study returns them where they were instead of the top of the hero.
let homeScrollY = 0;

export function saveHomeScroll(): void {
  homeScrollY = window.scrollY;
}

export function savedHomeScroll(): number {
  return homeScrollY;
}
