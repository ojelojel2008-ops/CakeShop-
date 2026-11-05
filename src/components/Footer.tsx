import React from 'react';
import { Cake, Heart, MessageCircle, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTracker }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-10 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand & Slogan column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Cake className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif-display">
                CakeShop
              </span>
            </div>

            <p className="text-sm text-pink-300 font-serif-display italic">
              "Every Cake Tells a Sweet Story"
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Bisnis kuliner kreatif pemesanan kue online terpercaya dengan keunggulan layanan Custom Cake interaktif. Menghadirkan rasa manis dan kehangatan di setiap perayaan Anda.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-pink-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Menu & Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Katalog Kue Siap Pesan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom-studio')}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Custom Cake Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stories')}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Cerita Manis Pelanggan
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Lacak Pesanan Anda
                </button>
              </li>
            </ul>
          </div>

          {/* Kategori Kue Populer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Kategori Kue
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Bento Mini Korea</li>
              <li>Kue Ulang Tahun Vintage</li>
              <li>Kue Cokelat & Keju</li>
              <li>Kue Bertingkat Pesta</li>
              <li>Pastry & Cupcakes</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} CakeShop Indonesia. Every Cake Tells a Sweet Story.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Kebijakan Privasi</span>
            <span className="hover:text-stone-400 cursor-pointer">Syarat & Ketentuan</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
