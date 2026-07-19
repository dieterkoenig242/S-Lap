import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'slab-cookie-consent';

export function hasCookieChoice(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !hasCookieChoice());

  const choose = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 z-[90] w-full px-4 pb-4 md:px-6 md:pb-6"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#0A1628]/95 p-5 shadow-2xl backdrop-blur-md md:flex-row md:gap-6 md:p-6">
            <Cookie className="hidden shrink-0 text-white/60 md:block" size={32} />
            <p className="text-center text-xs font-light leading-relaxed text-white/70 md:text-left md:text-sm">
              Wir verwenden Cookies, um dir das beste Erlebnis auf unserer
              Website zu ermöglichen. Technisch notwendige Cookies sind für den
              Betrieb erforderlich, weitere nutzen wir nur mit deiner
              Zustimmung.
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => choose('declined')}
                className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-light tracking-wider text-white/70 uppercase transition-colors hover:border-white/40"
              >
                Ablehnen
              </button>
              <button
                onClick={() => choose('accepted')}
                className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-wider text-[#0A1628] uppercase transition-transform hover:scale-[1.03]"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
