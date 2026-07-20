import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FlaskConical, Plus } from 'lucide-react';
import Particles from './Particles';
import { BOTTLE_PRICE, flavors } from '../data/flavors';

interface RefillSectionProps {
  onActive: (id: string) => void;
  onAddBottle: (flavorId: string) => void;
}

export default function RefillSection({ onActive, onAddBottle }: RefillSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [imgSrc, setImgSrc] = useState('/images/refill-bottle.jpg');

  useEffect(() => {
    if (inView) onActive('refill');
  }, [inView, onActive]);

  return (
    <section
      id="refill"
      ref={ref}
      className="relative h-[100dvh] snap-start overflow-hidden text-white"
    >
      <Particles colors={['#3AC6C6', '#8FE8E8', '#FFFFFF', '#1B7A8A']} />

      {/* Massive Watermark */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 0.08, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-serif text-[30vw] leading-none font-black tracking-[-0.08em] uppercase select-none md:text-[20vw]">
          REFILL
        </span>
      </motion.div>

      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col items-center justify-between gap-8 px-6 md:flex-row md:gap-0 md:px-12">
        {/* Bottle Artwork */}
        <motion.div
          className="flex h-[38dvh] flex-1 items-end justify-center md:h-full"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          <motion.img
            src={imgSrc}
            onError={() => setImgSrc('/images/refill-bottle.svg')}
            alt="Slab Nachfüllflasche mit Logo"
            className="h-[36dvh] w-auto max-w-none object-contain drop-shadow-2xl md:h-[68vh]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            loading="lazy"
          />
        </motion.div>

        {/* Text + flavor picker */}
        <motion.div
          className="flex-1 pb-10 text-center md:pb-0 md:pl-12 md:text-left"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <p className="mb-3 text-xs font-light tracking-[0.4em] uppercase opacity-70 md:text-sm">
            Original Slab Liquid
          </p>
          <h2 className="font-serif text-4xl leading-tight font-black tracking-tight drop-shadow-lg md:text-6xl">
            Nachfüllflaschen.
            <br />
            Mit Slab-Logo.
          </h2>
          <p className="mt-6 text-base leading-relaxed font-light drop-shadow-md md:text-lg">
            Dein Pod ist wiederauffüllbar – unsere Liquids kommen in der
            Original-Flasche mit Slab-Logo.
            <br />
            Alle sechs Sorten, für {BOTTLE_PRICE} € pro Flasche.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2 md:justify-start">
            {flavors.map((f) => (
              <button
                key={f.id}
                onClick={() => onAddBottle(f.id)}
                className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-xs font-light tracking-wider uppercase backdrop-blur-sm transition-all hover:scale-[1.05] hover:border-white/60"
              >
                <Plus size={12} />
                {f.edition}
              </button>
            ))}
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs font-light text-white/50 md:justify-start">
            <FlaskConical size={14} />
            Sorte anklicken und direkt in den Warenkorb legen · {BOTTLE_PRICE} € / Flasche
          </p>

          {/* So funktioniert das Nachfüllen */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <img
              src="/images/vape-pod.png"
              alt="So wird der Pod nachgefüllt: Pod abziehen, drehen, Liquid einfüllen"
              className="mx-auto max-h-40 w-auto object-contain p-3 md:max-h-48"
              loading="lazy"
            />
            <p className="bg-[#07222B] px-4 py-2.5 text-center text-[11px] font-light tracking-wider text-white/80 uppercase">
              Pod abziehen · Liquid einfüllen · Platz für 2 Liquids
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
