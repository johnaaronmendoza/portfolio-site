/**
 * FloatingParticles - Ambient 8-bit particles
 * Design: Industrial Retro-Futurism
 * - Subtle floating 8-bit stars and pixels
 * - Drifts across the background
 * - Adds visual depth and atmosphere
 */

import { motion } from 'framer-motion';

export default function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() > 0.5 ? 2 : 3,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 8 + Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute bg-amber-400"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: '-10px',
          }}
          animate={{
            y: [0, window.innerHeight + 20],
            opacity: [0, 1, 1, 0],
            x: [0, Math.sin(particle.id) * 100],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
