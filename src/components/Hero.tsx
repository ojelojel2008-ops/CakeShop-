import React from 'react';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Truck, Clock, Cake } from 'lucide-react';

interface HeroProps {
  onStartCustom: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCustom, onExploreMenu }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F8] to-[#FFFDF9] py-10 md:py-14 border-b border-pink-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clear Story & Direct Action */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>Toko Kue Online Kreatif & Terpercaya</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15] font-serif-display text-balance">
              Every Cake Tells a <span className="text-pink-600 italic">Sweet Story.</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Pesan kue ulang tahun, bento cake mini ala Korea, dan perayaan spesial dengan mudah. Nikmati 14+ pilihan rasa lezat atau kreasikan kue unikmu sendiri!
            </p>

            {/* Clear Big Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Cake className="w-4 h-4" />
                <span>Pilih Dari Menu (14 Varian)</span>
              </button>

              <button
                onClick={onStartCustom}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-700 border-2 border-pink-200 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bikin Custom Cake Sendiri</span>
              </button>
            </div>

            {/* Simple Trust Metrics */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-stone-600 border-t border-pink-100">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Halal & Butter Murni</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-pink-600" />
                <span>Kurir Mobil Dingin (Aman)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Bisa Same-Day (3 Jam)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden bg-white p-3 shadow-xl border border-pink-200">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-pink-50">
                <img
                  src="/src/assets/images/hero_artisan_cake_1793860596512.jpg"
                  alt="CakeShop Artisanal Birthday Cake"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Bottom Card */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-pink-100 shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-pink-600 font-bold uppercase tracking-wider block">Koleksi Terpopuler</span>
                    <p className="text-xs font-bold text-stone-900 font-serif-display">Vintage Raspberry Celebration</p>
                  </div>
                  <button
                    onClick={onExploreMenu}
                    className="px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
