import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ParticlesProps {
  colors: string[];
}

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
}

export default function Particles({ colors }: ParticlesProps) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 15,
        delay: Math.random() * 10,
        color: colors[i % colors.length],
      })),
    [colors],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full opacity-40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, 40, -30, 0],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
