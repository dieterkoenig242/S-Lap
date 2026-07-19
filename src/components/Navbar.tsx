import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { ThemeMode } from '../data/flavors';

interface NavbarProps {
  theme: ThemeMode;
  cartCount: number;
}

export default function Navbar({ theme, cartCount }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const color = theme === 'light' ? '#2A1810' : '#FFFFFF';

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'py-5' : 'py-8'
      }`}
      style={{ color }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        <a
          href="#hero"
          className="font-serif text-xl font-bold tracking-[0.2em] md:text-2xl"
        >
          STEAM LAB
          <span className="ml-3 hidden text-sm font-normal tracking-[0.3em] opacity-60 md:inline">
            SLAB
          </span>
        </a>
        <div className="flex items-center gap-8">
          <a
            href="#kiwi-erdbeere"
            className="hidden text-sm font-light tracking-[0.2em] uppercase opacity-80 transition-opacity hover:opacity-100 md:inline"
          >
            Sorten
          </a>
          <a
            href="#shop"
            className="relative flex items-center gap-2 text-sm font-light tracking-[0.2em] uppercase opacity-80 transition-opacity hover:opacity-100"
          >
            <ShoppingCart size={18} />
            Shop
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-4 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                style={{ backgroundColor: color, color: theme === 'light' ? '#FFF8EC' : '#0A1628' }}
              >
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
}
