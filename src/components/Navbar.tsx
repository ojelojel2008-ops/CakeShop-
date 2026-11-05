import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Cake } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
  onOpenTracker,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-pink-100/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark & Cute Cake Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 cursor-pointer focus:outline-hidden"
        >
          <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
            <Cake className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-stone-900 block font-serif-display leading-none">
              CakeShop
            </span>
            <span className="text-[10px] tracking-wider text-pink-600 font-semibold uppercase mt-0.5 block">
              Pemesanan Kue Online
            </span>
          </div>
        </button>

        {/* Zone 2: Essential Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-600">
          <button
            onClick={() => handleNavClick('menu')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'menu'
                ? 'text-pink-600 font-bold border-b-2 border-pink-500'
                : 'hover:text-stone-900'
            }`}
          >
            Katalog Kue
          </button>
          <button
            onClick={() => handleNavClick('custom-studio')}
            className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors py-1 cursor-pointer ${
              activeSection === 'custom-studio'
                ? 'text-pink-600 font-bold border-b-2 border-pink-500'
                : 'text-stone-700 hover:text-pink-600'
            }`}
          >
            <span>Custom Cake</span>
            <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded font-bold uppercase">
              Bikin Sendiri
            </span>
          </button>
          <button
            onClick={onOpenTracker}
            className="whitespace-nowrap shrink-0 hover:text-stone-900 text-stone-600 transition-colors py-1 cursor-pointer"
          >
            Lacak Pesanan
          </button>
        </nav>

        {/* Zone 3: Primary Action (Cart Button) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs sm:text-sm transition-all shadow-xs hover:shadow cursor-pointer active:scale-98 whitespace-nowrap"
            aria-label="Buka Keranjang Belanja"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Keranjang</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-pink-600 font-bold text-xs flex items-center justify-center tabular-nums ml-0.5">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 focus:outline-hidden cursor-pointer"
            aria-label="Menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-pink-100 bg-[#FFFDF9] px-4 py-3 space-y-1.5 shadow-md">
          <button
            onClick={() => handleNavClick('menu')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-stone-800 hover:bg-pink-50 hover:text-pink-600 transition-colors"
          >
            🎂 Katalog Kue
          </button>
          <button
            onClick={() => handleNavClick('custom-studio')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-pink-600 bg-pink-50 flex items-center justify-between"
          >
            <span>🎨 Custom Cake Studio</span>
            <span className="text-[10px] bg-pink-200 text-pink-800 px-2 py-0.5 rounded-full font-bold">
              Desain Sendiri
            </span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-stone-800 hover:bg-pink-50 hover:text-pink-600 transition-colors"
          >
            🚚 Lacak Pesanan Saya
          </button>
        </div>
      )}
    </header>
  );
};
