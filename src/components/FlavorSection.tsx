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

  return (
    <section
      id={flavor.id}
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-[100dvh] snap-start overflow-hidden text-white"
    >
      {/* Vollbild-Titelbild der Sorte */}
      <div className="absolute inset-0">
        <img
          src={imgSrc}
          onError={() => setImgSrc(flavor.imageFallback)}
          alt={`${flavor.edition} – ${flavor.name}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* Scrim für Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
      </div>

      <Particles colors={flavor.particleColors} />

      {/* Massive Watermark */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 0.1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-serif text-[35vw] leading-none font-black tracking-[-0.08em] uppercase select-none md:text-[25vw]">
          {flavor.watermark}
        </span>
      </motion.div>

      <div className="relative mx-auto flex h-full w-full max-w-[1400px] flex-col items-center justify-end gap-6 px-6 pb-10 md:flex-row md:items-center md:justify-between md:gap-0 md:px-12 md:pb-0">
        {/* Vape im Sorten-Design */}
        <motion.div
          className="flex flex-1 items-center justify-center"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          >
            {/* Gerät: Pod-Vape mit dem Titelbild als Wrap */}
            <div
              className="relative h-[30dvh] w-auto overflow-hidden rounded-[1.6rem] border border-white/25 shadow-2xl md:h-[54vh] md:rounded-[2.2rem]"
              style={{ aspectRatio: '9 / 19.5' }}
            >
              <img
                src={imgSrc}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
              />
              {/* Glanz */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-black/45" />
              {/* Mundstück */}
              <div className="absolute top-0 left-1/2 h-[7%] w-[46%] -translate-x-1/2 rounded-b-2xl bg-black/85 shadow-md" />
              {/* Etikett unten */}
              <div className="absolute bottom-0 left-0 w-full bg-black/70 px-3 py-2.5 text-center backdrop-blur-sm md:py-4">
                <p className="font-serif text-base leading-none font-black italic md:text-2xl">
                  Slab
                </p>
                <p className="mt-1 hidden text-[9px] font-light tracking-[0.25em] text-white/70 uppercase md:block">
                  {flavor.edition}
                </p>
              </div>
              {/* LED */}
              <span
                className="absolute right-[12%] bottom-[18%] h-2 w-2 rounded-full md:h-2.5 md:w-2.5"
                style={{ backgroundColor: flavor.accent, boxShadow: `0 0 10px ${flavor.accent}` }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="flex-1 text-center md:pl-12 md:text-left"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <p className="mb-3 text-xs font-light tracking-[0.4em] uppercase opacity-80 md:text-sm">
            {flavor.name}
          </p>
          <h2 className="font-serif text-4xl leading-tight font-black tracking-tight whitespace-pre-line drop-shadow-lg md:text-6xl">
            {flavor.edition}
          </h2>
          <p className="mt-2 hidden font-serif text-xl font-medium whitespace-pre-line opacity-90 md:block md:text-2xl">
            {flavor.subtitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed font-light whitespace-pre-line drop-shadow-md md:mt-6 md:text-lg">
            {flavor.description}
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:mt-8 md:items-start">
            <button
              onClick={() => onAddCartridge(flavor.id)}
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-wider text-black uppercase shadow-lg transition-transform hover:scale-[1.04]"
            >
              <Plus size={16} />
              Kartusche · {CARTRIDGE_PRICE} €
            </button>
            <button
              onClick={() => onAddStarterKit(flavor.id)}
              className="flex items-center gap-2 rounded-full border border-white/70 bg-black/25 px-6 py-3 text-sm font-light tracking-wider text-white uppercase backdrop-blur-sm transition-all hover:scale-[1.04] hover:border-white"
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
