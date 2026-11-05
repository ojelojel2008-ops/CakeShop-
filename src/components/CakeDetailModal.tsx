import React, { useState } from 'react';
import { X, Star, Heart, Clock, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { CakeItem, CartItem } from '../types';

interface CakeDetailModalProps {
  cake: CakeItem | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CakeDetailModal: React.FC<CakeDetailModalProps> = ({
  cake,
  onClose,
  onAddToCart,
}) => {
  if (!cake) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(cake.flavors[0]);
  const [customInscription, setCustomInscription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [candleIncluded, setCandleIncluded] = useState(true);
  const [addedNotice, setAddedNotice] = useState(false);

  const currentSize = cake.sizes[selectedSizeIndex];
  const unitPrice = cake.price + currentSize.priceDelta;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `${cake.id}-${Date.now()}`,
      type: 'catalog',
      name: cake.name,
      image: cake.image,
      unitPrice,
      quantity,
      selectedFlavor,
      selectedSize: `${currentSize.name} (${currentSize.diameter})`,
      customMessage: customInscription.trim(),
      notes: candleIncluded ? 'Termasuk lilin dan pisau pemotong' : '',
    };

    onAddToCart(cartItem);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl overflow-hidden shadow-2xl border border-pink-100 max-h-[90vh] flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-200 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image & Story Badge */}
        <div className="md:w-1/2 relative bg-pink-50/50 min-h-[260px] md:min-h-full">
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent flex flex-col justify-end p-6 text-white">
            <span className="text-xs uppercase tracking-wider font-semibold text-pink-200 mb-1">
              {cake.categoryLabel}
            </span>
            <p className="text-xs italic text-stone-200 leading-relaxed font-serif-display">
              {cake.story}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Purchase Module */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="border-b border-pink-100 pb-4 mb-4">
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{cake.rating.toFixed(1)}</span>
              </span>
              <span>·</span>
              <span>{cake.reviewCount} ulasan</span>
              <span>·</span>
              <span className="text-pink-600 font-medium">{cake.leadTime}</span>
            </div>

            <h3 className="text-2xl font-bold text-stone-900 font-serif-display">
              {cake.name}
            </h3>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-pink-600 font-serif-display tabular-nums">
                Rp {unitPrice.toLocaleString('id-ID')}
              </span>
              {cake.originalPrice && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  Rp {(cake.originalPrice + currentSize.priceDelta).toLocaleString('id-ID')}
                </span>
              )}
            </div>

            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              {cake.description}
            </p>
          </div>

          {/* Configurator */}
          <div className="space-y-4 flex-1">
            {/* Size Selector */}
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1.5">
                Pilih Ukuran Kue:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {cake.sizes.map((s, idx) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                      selectedSizeIndex === idx
                        ? 'border-pink-500 bg-pink-50 text-pink-900 font-semibold ring-1 ring-pink-500'
                        : 'border-stone-200 hover:border-pink-200 text-stone-700'
                    }`}
                  >
                    <div className="font-medium">{s.name}</div>
                    <div className="text-[11px] text-stone-500">
                      {s.priceDelta === 0 ? 'Harga Dasar' : `+Rp ${s.priceDelta.toLocaleString('id-ID')}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Selector */}
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1.5">
                Pilihan Rasa Sponge:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {cake.flavors.map(flv => (
                  <button
                    key={flv}
                    onClick={() => setSelectedFlavor(flv)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      selectedFlavor === flv
                        ? 'border-pink-500 bg-pink-50 text-pink-700 font-semibold'
                        : 'border-stone-200 hover:border-pink-200 text-stone-600'
                    }`}
                  >
                    {flv}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Inscription Text */}
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1">
                Tulisan Pada Kue (Gratis):
              </label>
              <input
                type="text"
                maxLength={30}
                value={customInscription}
                onChange={e => setCustomInscription(e.target.value)}
                placeholder="Contoh: Happy Birthday Maya 💕"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-pink-500 focus:outline-hidden"
              />
              <span className="text-[10px] text-stone-400 mt-0.5 block">
                Maksimal 30 karakter. Kosongkan jika tanpa tulisan.
              </span>
            </div>

            {/* Candles toggle */}
            <div className="flex items-center justify-between p-2.5 bg-pink-50/60 rounded-xl border border-pink-100">
              <span className="text-xs font-medium text-stone-800">
                Sertakan Lilin & Pisau Potong Kue Gratis
              </span>
              <input
                type="checkbox"
                checked={candleIncluded}
                onChange={e => setCandleIncluded(e.target.checked)}
                className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 mt-4 border-t border-pink-100 flex items-center gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-stone-200 rounded-xl bg-white p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded-lg text-sm font-bold"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded-lg text-sm font-bold"
              >
                +
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAdd}
              className="flex-1 py-3 px-5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {addedNotice
                  ? 'Berhasil Ditambahkan!'
                  : `Tambah ke Keranjang · Rp ${totalPrice.toLocaleString('id-ID')}`}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
