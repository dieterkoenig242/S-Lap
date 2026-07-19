import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FlavorSection from './components/FlavorSection';
import RefillSection from './components/RefillSection';
import ShopSection from './components/ShopSection';
import AgeGate, { isAgeVerified } from './components/AgeGate';
import CookieBanner from './components/CookieBanner';
import {
  flavors,
  heroGradient,
  refillGradient,
  shopGradient,
} from './data/flavors';
import { cartItemCount, emptyEntry, type Cart, type CartKind } from './cart';

export default function App() {
  const [verified, setVerified] = useState(isAgeVerified);
  const [activeSection, setActiveSection] = useState('hero');
  const [cart, setCart] = useState<Cart>({});

  const onActive = useCallback((id: string) => setActiveSection(id), []);

  const changeCart = useCallback(
    (flavorId: string, kind: CartKind, delta: number) => {
      setCart((prev) => {
        const entry = prev[flavorId] ?? emptyEntry;
        const next = { ...entry, [kind]: Math.max(0, entry[kind] + delta) };
        return { ...prev, [flavorId]: next };
      });
    },
    [],
  );

  const activeFlavor = flavors.find((f) => f.id === activeSection);
  const gradient =
    activeSection === 'hero'
      ? heroGradient
      : activeSection === 'refill'
        ? refillGradient
        : activeSection === 'shop'
          ? shopGradient
          : (activeFlavor?.gradient ?? heroGradient);
  const theme = activeFlavor?.theme ?? 'dark';

  return (
    <>
      {/* Global gradient background */}
      <div className="fixed inset-0 z-[-1]">
        <AnimatePresence mode="wait">
          <motion.div
            key={gradient}
            className="absolute inset-0"
            style={{ background: gradient }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      <Navbar theme={theme} cartCount={cartItemCount(cart)} />

      <main>
        <HeroSection onActive={onActive} />
        {flavors.map((flavor) => (
          <FlavorSection
            key={flavor.id}
            flavor={flavor}
            onActive={onActive}
            onAddCartridge={(id) => changeCart(id, 'cartridges', 1)}
            onAddStarterKit={(id) => changeCart(id, 'kits', 1)}
          />
        ))}
        <RefillSection
          onActive={onActive}
          onAddBottle={(id) => changeCart(id, 'bottles', 1)}
        />
        <ShopSection cart={cart} onChange={changeCart} onActive={onActive} />
      </main>

      {!verified && <AgeGate onVerified={() => setVerified(true)} />}
      {verified && <CookieBanner />}
    </>
  );
}
