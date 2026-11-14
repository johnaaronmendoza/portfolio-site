import { toast } from 'sonner';
import { WindowBar } from '@/components/Window';
import { play } from './useSound';

// ── Achievement definitions ───────────────────────────────────────────────
const ACHIEVEMENTS: Record<string, { title: string; desc: string; icon: string }> = {
  FIRST_BOOT:    { title: 'FIRST_BOOT',    desc: 'Portfolio loaded. Welcome.',            icon: '💾' },
  EXPLORER:      { title: 'EXPLORER',      desc: 'Reached the projects section.',         icon: '🗺️' },
  DEEP_DIVE:     { title: 'DEEP_DIVE',     desc: 'Opened a project page.',                icon: '🔍' },
  COMPLETIONIST: { title: 'COMPLETIONIST', desc: 'Read every project page.',              icon: '🏆' },
  NETWORKER:     { title: 'NETWORKER',     desc: 'Checked out GitHub or LinkedIn.',       icon: '🌐' },
  NIGHT_OWL:     { title: 'NIGHT_OWL',    desc: 'Browsing between midnight and 5am.',    icon: '🦉' },
  CHEAT_CODE:    { title: 'CHEAT_CODE',   desc: '↑↑↓↓←→←→BA. You know it.',             icon: '🎮' },
};

const ALL_PROJECTS = ['silverlink', 'scs', 'firesafety', 'uwb', 'uat', 'ai-finance'];

// ── Storage helpers ───────────────────────────────────────────────────────
function getUnlocked(): string[] {
  try { return JSON.parse(localStorage.getItem('ja_achievements') || '[]'); } catch { return []; }
}

function getVisited(): string[] {
  try { return JSON.parse(localStorage.getItem('ja_visited_projects') || '[]'); } catch { return []; }
}

function saveUnlocked(list: string[]) {
  try { localStorage.setItem('ja_achievements', JSON.stringify(list)); } catch {}
}

function saveVisited(list: string[]) {
  try { localStorage.setItem('ja_visited_projects', JSON.stringify(list)); } catch {}
}

// ── Fire a toast ──────────────────────────────────────────────────────────
// A small achievement.txt window (MASTER 2.1): black bar, white body, dark
// text, ink frame and hard shadow. Sonner keeps it non-blocking, pauses it on
// hover and lets it be dismissed; reduced motion is handled by the global
// prefers-reduced-motion rule in index.css. Position (bottom-left, above the
// floating controls) is set once on the Toaster in App.tsx. The chime only
// plays when the visitor has turned sound on.
function showToast(id: string) {
  const ach = ACHIEVEMENTS[id];
  if (!ach) return;
  play('achievement');
  toast.custom(
    (toastId) => (
      <div role="status" className="window w-72 max-w-[calc(100vw-2rem)] shadow-[4px_4px_0_0_var(--ink)]">
        <WindowBar title="achievement.txt" onClose={() => toast.dismiss(toastId)} closeLabel="Dismiss achievement" />
        <div className="window-body px-4 py-3 font-sans text-[15px] leading-snug">
          <p className="font-bold text-black">
            <span aria-hidden="true">{ach.icon} </span>Achievement unlocked: {ach.title}
          </p>
          <p className="mt-1">{ach.desc}</p>
        </div>
      </div>
    ),
    // Shrink to the card on phones too (Sonner stretches toasts full width
    // under 600px), so it sits bottom-left instead of across the page
    { duration: 3500, style: { width: 'auto', right: 'auto' } }
  );
}

// ── Public: unlock a single achievement ──────────────────────────────────
export function unlockAchievement(id: string) {
  const unlocked = getUnlocked();
  if (unlocked.includes(id)) return;
  unlocked.push(id);
  saveUnlocked(unlocked);
  showToast(id);
}

// ── Public: project visits ───────────────────────────────────────────────
// Achievements only follow a deliberate action. A project link click arms the
// unlock; the case page fires it once it has rendered (after navigation).
// Landing on a case-study URL directly records the visit but unlocks nothing.
let armedProject: string | null = null;

export function noteProjectOpen(projectId: string) {
  armedProject = projectId;
}

export function trackProjectVisit(projectId: string) {
  const visited = getVisited();
  if (!visited.includes(projectId)) {
    visited.push(projectId);
    saveVisited(visited);
  }
  if (armedProject !== projectId) return;
  armedProject = null;
  unlockAchievement('DEEP_DIVE');
  if (ALL_PROJECTS.every(k => visited.includes(k))) unlockAchievement('COMPLETIONIST');
}

// ── Hook: wire up home-page achievements ─────────────────────────────────
export function useHomeAchievements() {
  // Achievements now unlock only from deliberate actions (clicks, project visits,
  // easter eggs). Passive ones on load or scroll covered content for first-time
  // visitors, so they were removed.
}
