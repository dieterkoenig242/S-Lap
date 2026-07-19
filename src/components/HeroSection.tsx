import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Droplets, Recycle, Zap } from 'lucide-react';
import Particles from './Particles';

interface HeroSectionProps {
  onActive: (id: string) => void;
}

const features = [
  { icon: Recycle, label: 'Wiederauffüllbares Pod-System' },
  { icon: Droplets, label: 'Platz für 2 Liquids' },
  { icon: Zap, label: 'Austauschbarer Akku' },
];

export default function HeroSection({ onActive }: HeroSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [logoSrc, setLogoSrc] = useState('/images/logo.png');
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    if (inView) onActive('hero');
  }, [inView, onActive]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[100dvh] snap-start flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <Particles colors={['#FFFFFF', '#81D4FA', '#B3E5FC', '#4FC3F7']} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        {!logoFailed ? (
          <motion.img
            src={logoSrc}
            onError={() =>
              logoSrc === '/images/logo.png'
                ? setLogoSrc('/images/logo.svg')
                : setLogoFailed(true)
            }
            alt="Slab Logo"
            className="h-[40dvh] w-auto object-contain drop-shadow-2xl md:h-[48vh]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <h1 className="font-serif text-7xl font-black tracking-tight drop-shadow-2xl md:text-9xl">
            Slab
          </h1>
        )}
        <p className="mt-6 text-sm font-light tracking-[0.5em] text-white/70 uppercase md:text-base">
          Steam Lab · Premium Vapes
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed font-light text-white/60 md:text-lg">
          Sechs Geschmackswelten. Ein System.
          <br />
          Wiederauffüllbar, austauschbar, unverwechselbar.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-xs font-light tracking-wider text-white/60 uppercase md:text-sm"
            >
              <Icon size={18} className="text-white/80" />
              {label}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#kiwi-erdbeere"
        className="absolute bottom-8 flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Entdecken</span>
        <ChevronDown size={20} />
      </motion.a>
    </section>
  );
}
