import React from 'react';
import { toast } from 'sonner';
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
function showToast(id: string) {
  const ach = ACHIEVEMENTS[id];
  if (!ach) return;
  play('achievement');
  toast.custom(
    () => (
      <div style={{
        border: '3px solid #F59E0B',
        background: '#000',
        padding: '10px 14px',
        boxShadow: '4px 4px 0px 0px #F59E0B',
        fontFamily: '"Press Start 2P", monospace',
        minWidth: '240px',
        maxWidth: '300px',
      }}>
        <div style={{ color: '#F59E0B', fontSize: '8px', marginBottom: '6px', letterSpacing: '0.5px' }}>
          {ach.icon} ACHIEVEMENT UNLOCKED
        </div>
        <div style={{ color: '#ffffff', fontSize: '9px', marginBottom: '3px' }}>
          {ach.title}
        </div>
        <div style={{ color: '#6b7280', fontSize: '8px', lineHeight: '1.5' }}>
          {ach.desc}
        </div>
      </div>
    ),
    { duration: 3500, position: 'top-right' }
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

// ── Public: record project visit + check DEEP_DIVE / COMPLETIONIST ───────
export function trackProjectVisit(projectId: string) {
  const visited = getVisited();
  if (!visited.includes(projectId)) {
    visited.push(projectId);
    saveVisited(visited);
  }
  if (visited.length === 1) unlockAchievement('DEEP_DIVE');
  if (ALL_PROJECTS.every(k => visited.includes(k))) unlockAchievement('COMPLETIONIST');
}

// ── Hook: wire up home-page achievements ─────────────────────────────────
export function useHomeAchievements() {
  // Achievements now unlock only from deliberate actions (clicks, project visits,
  // easter eggs). Passive ones on load or scroll covered content for first-time
  // visitors, so they were removed.
}
