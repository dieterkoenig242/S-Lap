import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus } from 'lucide-react';
import Particles from './Particles';
import {
  CARTRIDGE_PRICE,
  STARTER_KIT_PRICE,
  type Flavor,
} from '../data/flavors';

interface FlavorSectionProps {
  flavor: Flavor;
  onActive: (id: string) => void;
  onAddCartridge: (id: string) => void;
  onAddStarterKit: (id: string) => void;
}

export default function FlavorSection({
  flavor,
  onActive,
  onAddCartridge,
  onAddStarterKit,
}: FlavorSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [imgSrc, setImgSrc] = useState(flavor.image);

  useEffect(() => {
    if (inView) onActive(flavor.id);
  }, [inView, flavor.id, onActive]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });
  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const isLight = flavor.theme === 'light';
  const textColor = isLight ? '#2A1810' : '#FFFFFF';

  return (
    <section
      id={flavor.id}
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-[100dvh] snap-start overflow-hidden"
      style={{ color: textColor }}
    >
      <Particles colors={flavor.particleColors} />

      {/* Massive Watermark */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 0.08, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-serif text-[35vw] leading-none font-black tracking-[-0.08em] uppercase select-none md:text-[25vw]">
          {flavor.watermark}
        </span>
      </motion.div>

      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col items-center justify-between gap-12 px-6 md:flex-row md:gap-0 md:px-12">
        {/* Flavor Artwork */}
        <motion.div
          className="flex h-[45dvh] flex-1 items-end justify-center md:h-full"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="translate-y-6 md:translate-y-16"
          >
            <img
              src={imgSrc}
              onError={() => setImgSrc(flavor.imageFallback)}
              alt={`${flavor.edition} – ${flavor.name}`}
              className="h-[42dvh] w-auto max-w-none rounded-3xl object-cover shadow-2xl drop-shadow-2xl md:h-[72vh]"
              loading="lazy"
            />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="flex-1 pb-16 text-center md:pb-0 md:pl-12 md:text-left"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <p
            className="mb-3 text-xs font-light tracking-[0.4em] uppercase opacity-70 md:text-sm"
          >
            {flavor.name}
          </p>
          <h2 className="font-serif text-4xl leading-tight font-black tracking-tight whitespace-pre-line drop-shadow-lg md:text-6xl">
            {flavor.edition}
          </h2>
          <p className="mt-2 font-serif text-xl font-medium whitespace-pre-line opacity-80 md:text-2xl">
            {flavor.subtitle}
          </p>
          <p className="mt-6 text-base leading-relaxed font-light whitespace-pre-line drop-shadow-md md:text-lg">
            {flavor.description}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
            <button
              onClick={() => onAddCartridge(flavor.id)}
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wider uppercase shadow-lg transition-transform hover:scale-[1.04]"
              style={{
                backgroundColor: textColor,
                color: isLight ? '#FFF8EC' : '#0A1628',
              }}
            >
              <Plus size={16} />
              Kartusche · {CARTRIDGE_PRICE} €
            </button>
            <button
              onClick={() => onAddStarterKit(flavor.id)}
              className="flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-light tracking-wider uppercase transition-all hover:scale-[1.04]"
              style={{ borderColor: textColor, color: textColor }}
            >
              <Plus size={16} />
              Mit Akku · {STARTER_KIT_PRICE} €
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
