import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'slab-age-verified';

export function isAgeVerified(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

interface AgeGateProps {
  onVerified: () => void;
}

export default function AgeGate({ onVerified }: AgeGateProps) {
  const [denied, setDenied] = useState(false);

  const confirm = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    onVerified();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-6 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0A1628] p-8 text-center shadow-2xl md:p-12"
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <ShieldCheck className="mx-auto mb-6 text-white/70" size={48} />
          <h2 className="font-serif text-3xl font-black tracking-tight">
            Jugendschutz
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-white/70">
            Diese Website enthält Produkte, die Nikotin enthalten können und
            nur für Erwachsene bestimmt sind. Bitte bestätige, dass du
            mindestens <strong className="font-semibold text-white">18 Jahre</strong> alt bist.
          </p>
          {denied ? (
            <p className="mt-8 rounded-lg bg-red-500/10 p-4 text-sm text-red-300">
              Der Zugang zu dieser Website ist erst ab 18 Jahren erlaubt.
            </p>
          ) : (
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={confirm}
                className="rounded-full bg-white py-3.5 text-sm font-semibold tracking-[0.15em] text-[#0A1628] uppercase transition-transform hover:scale-[1.02]"
              >
                Ich bin über 18
              </button>
              <button
                onClick={() => setDenied(true)}
                className="rounded-full border border-white/20 py-3.5 text-sm font-light tracking-[0.15em] text-white/70 uppercase transition-colors hover:border-white/40"
              >
                Ich bin unter 18
              </button>
            </div>
          )}
          <p className="mt-6 text-[11px] font-light leading-relaxed text-white/40">
            Rauchen und Dampfen kann deine Gesundheit gefährden. Verkauf nur an
            Personen ab 18 Jahren.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
