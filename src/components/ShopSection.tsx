import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Minus, Plus, BatteryCharging, Droplets } from 'lucide-react';
import Particles from './Particles';
import {
  CARTRIDGE_PRICE,
  STARTER_KIT_PRICE,
  flavors,
} from '../data/flavors';
import type { Cart } from '../cart';

interface ShopSectionProps {
  cart: Cart;
  onChange: (flavorId: string, kind: 'cartridges' | 'kits', delta: number) => void;
  onActive: (id: string) => void;
}

export default function ShopSection({ cart, onChange, onActive }: ShopSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) onActive('shop');
  }, [inView, onActive]);

  const total = flavors.reduce((sum, f) => {
    const entry = cart[f.id];
    if (!entry) return sum;
    return (
      sum +
      entry.cartridges * CARTRIDGE_PRICE +
      entry.kits * STARTER_KIT_PRICE
    );
  }, 0);

  const itemCount = Object.values(cart).reduce(
    (sum, e) => sum + e.cartridges + e.kits,
    0,
  );

  return (
    <section
      id="shop"
      ref={ref}
      className="relative h-[100dvh] snap-start overflow-hidden"
    >
      <Particles colors={['#81D4FA', '#FFFFFF', '#4FC3F7', '#B3E5FC']} />

      <div className="mx-auto flex h-full max-w-[1400px] flex-col px-6 pt-24 pb-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="font-serif text-4xl font-black tracking-tight md:text-5xl">
            Stell dir dein Set zusammen
          </h2>
          <p className="mt-3 text-sm font-light text-white/60 md:text-base">
            Jede Kartusche {CARTRIDGE_PRICE} € · Starter-Set mit Akku{' '}
            {STARTER_KIT_PRICE} € · Pod wiederauffüllbar mit 2 Liquids
          </p>
        </motion.div>

        {/* Configurator */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 grid flex-1 grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3"
        >
          {flavors.map((f) => {
            const entry = cart[f.id] ?? { cartridges: 0, kits: 0 };
            return (
              <div
                key={f.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-10 w-10 shrink-0 rounded-full border border-white/20"
                    style={{ background: f.gradient }}
                  />
                  <div>
                    <p className="font-serif text-lg leading-tight font-bold">
                      {f.edition}
                    </p>
                    <p className="text-xs font-light text-white/50">{f.name}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <QuantityRow
                    icon={<Droplets size={14} />}
                    label={`Kartusche · ${CARTRIDGE_PRICE} €`}
                    value={entry.cartridges}
                    onDec={() => onChange(f.id, 'cartridges', -1)}
                    onInc={() => onChange(f.id, 'cartridges', 1)}
                  />
                  <QuantityRow
                    icon={<BatteryCharging size={14} />}
                    label={`Mit Akku · ${STARTER_KIT_PRICE} €`}
                    value={entry.kits}
                    onDec={() => onChange(f.id, 'kits', -1)}
                    onInc={() => onChange(f.id, 'kits', 1)}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:flex-row md:px-8"
        >
          <p className="text-sm font-light text-white/70">
            {itemCount === 0
              ? 'Noch nichts ausgewählt – stell dir oben deine Kombination zusammen.'
              : `${itemCount} Artikel ausgewählt`}
          </p>
          <div className="flex items-center gap-6">
            <p className="font-serif text-2xl font-black">
              {total.toFixed(2).replace('.', ',')} €
            </p>
            <button
              disabled={itemCount === 0}
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold tracking-wider text-[#0A1628] uppercase transition-transform enabled:hover:scale-[1.04] disabled:opacity-30"
              onClick={() =>
                alert(
                  'Demo-Shop: Die Bestellfunktion wird mit einem echten Zahlungsanbieter verbunden.',
                )
              }
            >
              Bestellen
            </button>
          </div>
        </motion.div>

        <footer className="mt-4 text-center text-[10px] leading-relaxed font-light text-white/40">
          Steam Lab (Slab) · Verkauf nur an Personen ab 18 Jahren · Nikotin
          kann abhängig machen · Impressum · Datenschutz · AGB
        </footer>
      </div>
    </section>
  );
}

interface QuantityRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
}

function QuantityRow({ icon, label, value, onDec, onInc }: QuantityRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2">
      <span className="flex items-center gap-2 text-xs font-light text-white/70">
        {icon}
        {label}
      </span>
      <span className="flex items-center gap-2">
        <button
          onClick={onDec}
          disabled={value === 0}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 transition-colors enabled:hover:border-white/60 disabled:opacity-30"
          aria-label="Weniger"
        >
          <Minus size={12} />
        </button>
        <span className="w-5 text-center text-sm font-semibold tabular-nums">
          {value}
        </span>
        <button
          onClick={onInc}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/60"
          aria-label="Mehr"
        >
          <Plus size={12} />
        </button>
      </span>
    </div>
  );
}
