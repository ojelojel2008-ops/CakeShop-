import React, { useState } from 'react';
import { Search, Star, Sparkles, Plus, Eye, Check, Flame, Clock } from 'lucide-react';
import { CATALOG_CAKES } from '../data/cakes';
import { CakeItem, CartItem } from '../types';
import { CakeDetailModal } from './CakeDetailModal';

interface CakeMenuProps {
  onAddToCart: (item: CartItem) => void;
  onNavigateToCustom: () => void;
}

type CategoryFilter = 'all' | 'birthday' | 'bento' | 'cheesecake' | 'wedding' | 'cupcake';

export const CakeMenu: React.FC<CakeMenuProps> = ({
  onAddToCart,
  onNavigateToCustom,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(null);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // Filter cakes
  const filteredCakes = CATALOG_CAKES.filter(cake => {
    const matchesCategory = selectedCategory === 'all' || cake.category === selectedCategory;
    const matchesSearch =
      cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cake.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cake.flavors.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (cake: CakeItem) => {
    const defaultSize = cake.sizes[0];
    const cartItem: CartItem = {
      id: `${cake.id}-${Date.now()}`,
      type: 'catalog',
      name: cake.name,
      image: cake.image,
      unitPrice: cake.price,
      quantity: 1,
      selectedFlavor: cake.flavors[0],
      selectedSize: `${defaultSize.name} (${defaultSize.diameter})`,
      notes: 'Standard recipe · Tanpa tulisan tambahan',
    };
    onAddToCart(cartItem);
    setQuickAddedId(cake.id);
    setTimeout(() => setQuickAddedId(null), 2000);
  };

  return (
    <section id="menu" className="py-12 lg:py-16 bg-[#FFFDF9] border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-pink-600 mb-1">
              Koleksi Kue Lengkap (14 Varian)
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif-display">
              Pilihan Kue & Rasa Lezat
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 max-w-xl">
              Dari bento cake mini ala Korea, cokelat Belgia lumer, tiramisu kopi, hingga kue ulang tahun bertingkat.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari rasa: Cokelat, Tiramisu, Biscoff, Bento..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-stone-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-stone-800 placeholder-stone-400 shadow-xs"
            />
          </div>
        </div>

        {/* Category Filter Tabs - Simple, Large & Clean with Icons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {[
            { id: 'all', label: 'Semua Kue', icon: '🍰' },
            { id: 'birthday', label: 'Kue Ulang Tahun', icon: '🎂' },
            { id: 'bento', label: 'Bento Mini Korea', icon: '🍱' },
            { id: 'cheesecake', label: 'Cheesecake Panggang', icon: '🧀' },
            { id: 'wedding', label: 'Kue Bertingkat', icon: '💍' },
            { id: 'cupcake', label: 'Cupcake & Tart', icon: '🧁' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategory === tab.id
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'bg-white hover:bg-pink-50 text-stone-700 border border-stone-200/80 hover:border-pink-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Cake Product Grid: Clean 3-Column Desktop */}
        {filteredCakes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredCakes.map(cake => {
              const isAdded = quickAddedId === cake.id;
              return (
                <div
                  key={cake.id}
                  className="group bg-white rounded-3xl border border-stone-200/80 hover:border-pink-300 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container with tag */}
                  <div className="relative aspect-4/3 bg-pink-50/40 overflow-hidden cursor-pointer" onClick={() => setSelectedCake(cake)}>
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Single subtle tag */}
                    {cake.isBestSeller && (
                      <span className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs">
                        Favorit
                      </span>
                    )}
                    {cake.isNew && !cake.isBestSeller && (
                      <span className="absolute top-3 left-3 bg-pink-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs">
                        Varian Baru
                      </span>
                    )}

                    {/* Lead time badge */}
                    <span className="absolute bottom-3 right-3 bg-white/95 text-stone-800 text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-pink-500" />
                      <span>{cake.leadTime}</span>
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Category & Rating */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                        <span className="font-bold text-[11px] text-pink-600 uppercase tracking-wide">
                          {cake.categoryLabel}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-stone-700 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="tabular-nums">{cake.rating.toFixed(1)}</span>
                        </span>
                        <span>·</span>
                        <span className="text-[11px]">({cake.reviewCount} ulasan)</span>
                      </div>

                      {/* Product Name */}
                      <h3
                        onClick={() => setSelectedCake(cake)}
                        className="text-base font-bold text-stone-900 group-hover:text-pink-600 transition-colors line-clamp-1 font-serif-display cursor-pointer"
                      >
                        {cake.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {cake.description}
                      </p>

                      {/* Flavor variants preview chips */}
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {cake.flavors.slice(0, 3).map((flv, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium"
                          >
                            {flv}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & Action */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase font-medium">Harga Mulai</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold text-pink-600 font-serif-display tabular-nums">
                            Rp {cake.price.toLocaleString('id-ID')}
                          </span>
                          {cake.originalPrice && (
                            <span className="text-xs text-stone-400 line-through tabular-nums">
                              Rp {cake.originalPrice.toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuickAdd(cake)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                              : 'border-stone-200 hover:border-pink-500 hover:bg-pink-50 text-stone-700 hover:text-pink-600'
                          }`}
                          title="Pesan Cepat (Ukuran Standar)"
                          aria-label="Pesan Cepat"
                        >
                          {isAdded ? <Check className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setSelectedCake(cake)}
                          className="px-3.5 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Pilih Varian
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-stone-900">Kue Tidak Ditemukan</h4>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Coba kata kunci lain seperti "Cokelat", "Tiramisu", "Bento", atau buat sendiri di Custom Cake Studio.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold"
            >
              Lihat Semua Kue
            </button>
          </div>
        )}

      </div>

      {/* Modal Detail & Customizer */}
      <CakeDetailModal
        cake={selectedCake}
        onClose={() => setSelectedCake(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
