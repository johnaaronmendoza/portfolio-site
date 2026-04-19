import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Interactive element selectors that trigger the expanded cursor state
const INTERACTIVE = 'button, a, [role="button"], input, textarea, select, label, [tabindex]';

type TrailPoint = { x: number; y: number; id: number };

export default function PixelCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [touchDevice, setTouchDevice] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const visibleRef = useRef(false);
  const trailIdRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Don't show on touch-only devices
    if (window.matchMedia('(hover: none)').matches) {
      setTouchDevice(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      // Trail — skip if reduced motion
      if (!reduced) {
        const id = trailIdRef.current++;
        setTrail(prev => [...prev.slice(-3), { x: e.clientX, y: e.clientY, id }]);
        setTimeout(() => {
          setTrail(prev => prev.filter(t => t.id !== id));
        }, 220);
      }
    };

    const onOver = (e: MouseEvent) => {
      setHover(!!(e.target as HTMLElement).closest(INTERACTIVE));
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => { visibleRef.current = false; setVisible(false); };
    const onEnter = () => { visibleRef.current = true;  setVisible(true);  };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []); // ← stable: no deps, registers once, uses ref for visible tracking

  // Inject cursor:none globally (only on non-touch)
  useEffect(() => {
    if (touchDevice) return;
    const style = document.createElement('style');
    style.id = 'pixel-cursor-hide';
    style.textContent = '* { cursor: none !important; }';
    document.head.appendChild(style);
    return () => document.getElementById('pixel-cursor-hide')?.remove();
  }, [touchDevice]);

  if (touchDevice || !visible) return null;

  // Size: 10px normal, 18px on hover, 8px on click
  const size = clicking ? 8 : hover ? 18 : 10;
  // Color: blue on hover, amber normally
  const color = hover ? '#3B82F6' : '#F59E0B';

  return (
    <>
      {/* Trailing pixel dots */}
      {trail.map((t, i) => (
        <div
          key={t.id}
          className="fixed pointer-events-none z-[99998]"
          style={{
            left: t.x,
            top: t.y,
            transform: 'translate(-50%, -50%)',
            width: 4,
            height: 4,
            backgroundColor: color,
            opacity: ((i + 1) / (trail.length + 1)) * 0.45,
          }}
        />
      ))}
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          width: size,
          height: size,
          backgroundColor: color,
          imageRendering: 'pixelated',
          transition: 'width 0.08s steps(1), height 0.08s steps(1), background-color 0.08s steps(1)',
        }}
      />
    </>
  );
}
