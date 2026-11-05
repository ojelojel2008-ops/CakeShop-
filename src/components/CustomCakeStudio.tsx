import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Check,
  ShoppingBag,
  RotateCcw,
  Cake,
  Flame,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import {
  CAKE_SIZES,
  SPONGE_FLAVORS,
  FROSTING_COLORS,
  PIPING_STYLES,
  TOPPINGS,
  CANDLE_OPTIONS,
} from '../data/cakes';
import { CustomCakeConfig, CakeShape, CartItem } from '../types';

interface CustomCakeStudioProps {
  onAddToCart: (item: CartItem) => void;
}

const INSCRIPTION_TEMPLATES = [
  'Happy Birthday!',
  'Love Always',
  'Happy Graduation',
  'Happy Anniversary',
  'Sweet 17th',
  'Proud of You 💕',
];

export const CustomCakeStudio: React.FC<CustomCakeStudioProps> = ({
  onAddToCart,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Selections
  const [shape, setShape] = useState<CakeShape>('round');
  const [selectedSize, setSelectedSize] = useState(CAKE_SIZES[1]); // Round 14cm
  const [selectedFlavor, setSelectedFlavor] = useState(SPONGE_FLAVORS[0]); // Vanilla
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTING_COLORS[0]); // Baby Pink
  const [selectedPiping, setSelectedPiping] = useState(PIPING_STYLES[0]); // Vintage Ruffle
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['top-strawberry', 'top-gold']);
  const [inscriptionText, setInscriptionText] = useState('Happy Birthday');
  const [inscriptionColor, setInscriptionColor] = useState('#BE185D');
  const [selectedCandle, setSelectedCandle] = useState(CANDLE_OPTIONS[0]);
  const [addedSuccessAlert, setAddedSuccessAlert] = useState(false);

  // Toggle Topping
  const toggleTopping = (id: string) => {
    setSelectedToppings(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  // Dynamic price
  const toppingsTotal = selectedToppings.reduce((acc, tId) => {
    const item = TOPPINGS.find(t => t.id === tId);
    return acc + (item ? item.price : 0);
  }, 0);

  const totalPrice =
    selectedSize.basePrice +
    selectedFlavor.price +
    selectedPiping.price +
    toppingsTotal +
    selectedCandle.price;

  // Preset Shortcuts
  const applyPreset = (presetType: 'bento' | 'choco' | 'heart') => {
    if (presetType === 'bento') {
      setShape('round');
      setSelectedSize(CAKE_SIZES[0]); // Bento 10cm
      setSelectedFlavor(SPONGE_FLAVORS[0]); // Vanilla
      setSelectedFrosting(FROSTING_COLORS[0]); // Baby Pink
      setSelectedPiping(PIPING_STYLES[1]);
      setSelectedToppings(['top-strawberry', 'top-cherry']);
      setInscriptionText('Love Always');
      setInscriptionColor('#BE185D');
      setSelectedCandle(CANDLE_OPTIONS[3]); // Lilin gratis
      setCurrentStep(3);
    } else if (presetType === 'choco') {
      setShape('round');
      setSelectedSize(CAKE_SIZES[2]); // 16cm
      setSelectedFlavor(SPONGE_FLAVORS[1]); // Belgian Choco
      setSelectedFrosting(FROSTING_COLORS[6]); // Mocha
      setSelectedPiping(PIPING_STYLES[2]);
      setSelectedToppings(['top-biscoff', 'top-gold']);
      setInscriptionText('Happy Birthday');
      setInscriptionColor('#4A2C1D');
      setSelectedCandle(CANDLE_OPTIONS[0]);
      setCurrentStep(3);
    } else if (presetType === 'heart') {
      setShape('heart');
      setSelectedSize(CAKE_SIZES[3]); // Heart 18cm
      setSelectedFlavor(SPONGE_FLAVORS[2]); // Red Velvet
      setSelectedFrosting(FROSTING_COLORS[0]); // Baby Pink
      setSelectedPiping(PIPING_STYLES[0]);
      setSelectedToppings(['top-strawberry', 'top-gold', 'top-flowers']);
      setInscriptionText('Forever With You');
      setInscriptionColor('#BE185D');
      setSelectedCandle(CANDLE_OPTIONS[1]);
      setCurrentStep(3);
    }
  };

  const handleAddToCart = () => {
    const config: CustomCakeConfig = {
      shape,
      size: selectedSize,
      spongeFlavor: selectedFlavor,
      frostingColor: selectedFrosting,
      pipingStyle: selectedPiping,
      toppings: selectedToppings,
      inscription: {
        text: inscriptionText.trim(),
        font: 'cursive',
        color: inscriptionColor,
      },
      candle: {
        type: selectedCandle.id,
        label: selectedCandle.label,
        price: selectedCandle.price,
      },
      greetingCard: {
        included: true,
        to: '',
        from: '',
        message: 'Selamat merayakan momen manis!',
      },
      specialNotes: '',
      totalPrice,
    };

    const cartItem: CartItem = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      name: `Custom ${shape === 'heart' ? 'Hati' : shape === 'square' ? 'Kotak' : 'Bulat'} (${selectedSize.name})`,
      unitPrice: totalPrice,
      quantity: 1,
      customConfig: config,
      selectedFlavor: selectedFlavor.name,
      selectedSize: `${selectedSize.diameter} (${selectedSize.servings})`,
      customMessage: inscriptionText.trim(),
      notes: `${selectedFrosting.name} · Lilin: ${selectedCandle.label}`,
    };

    onAddToCart(cartItem);
    setAddedSuccessAlert(true);
    setTimeout(() => setAddedSuccessAlert(false), 3000);
  };

  return (
    <div className="py-6 sm:py-10">
      
      {/* 3 Quick-Pick Cards */}
      <div className="mb-8">
        <div className="text-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
            Cara Paling Cepat & Populer
          </span>
          <h3 className="text-xl font-bold text-stone-900 font-serif-display mt-0.5">
            Pilih Desain Siap Pakai (1-Klik)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
          <button
            onClick={() => applyPreset('bento')}
            className="p-4 rounded-2xl bg-pink-50 hover:bg-pink-100/80 border-2 border-pink-200 text-left transition-all hover:scale-101 shadow-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl">🍱</span>
              <span className="text-xs font-bold text-pink-700 bg-white px-2 py-0.5 rounded-full">
                Rp 85.000
              </span>
            </div>
            <h4 className="text-sm font-bold text-stone-900 group-hover:text-pink-700">
              Bento Mini Korea Pink
            </h4>
            <p className="text-[11px] text-stone-600 mt-0.5">
              Sponge vanilla lembut, cream baby pink, buah stroberi, dan tulisan manis.
            </p>
          </button>

          <button
            onClick={() => applyPreset('choco')}
            className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-200 text-left transition-all hover:scale-101 shadow-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl">🍫</span>
              <span className="text-xs font-bold text-amber-800 bg-white px-2 py-0.5 rounded-full">
                Rp 267.000
              </span>
            </div>
            <h4 className="text-sm font-bold text-stone-900 group-hover:text-amber-800">
              Cokelat Belgia Lumer
            </h4>
            <p className="text-[11px] text-stone-600 mt-0.5">
              Cokelat pekat moist, biskuit Biscoff renyah, serpihan emas 24k.
            </p>
          </button>

          <button
            onClick={() => applyPreset('heart')}
            className="p-4 rounded-2xl bg-rose-50 hover:bg-rose-100/80 border-2 border-rose-200 text-left transition-all hover:scale-101 shadow-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl">❤️</span>
              <span className="text-xs font-bold text-rose-700 bg-white px-2 py-0.5 rounded-full">
                Rp 375.000
              </span>
            </div>
            <h4 className="text-sm font-bold text-stone-900 group-hover:text-rose-700">
              Kue Hati Romantis
            </h4>
            <p className="text-[11px] text-stone-600 mt-0.5">
              Red velvet cream cheese bentuk hati dengan edible flower & stroberi.
            </p>
          </button>
        </div>
      </div>

      {/* Main Studio 2-Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Visual Cake Preview */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="bg-gradient-to-b from-[#FFF5F8] to-[#FFF0F5] border-2 border-pink-200/90 rounded-3xl p-6 relative shadow-md text-center">
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-100 px-3 py-1 rounded-lg">
                Preview Kue Langsung
              </span>
              <span className="text-xs font-bold text-stone-700">
                {selectedSize.name} ({selectedSize.diameter})
              </span>
            </div>

            {/* Interactive Cake Illustration */}
            <div className="relative aspect-square max-w-[320px] mx-auto flex items-center justify-center py-6 select-none">
              
              {/* Stand */}
              <div className="absolute -bottom-1 w-64 h-12 bg-gradient-to-b from-stone-200 to-stone-300 rounded-[50%] shadow-lg z-0 opacity-90" />

              {/* Cake */}
              <div className="relative z-10 flex flex-col items-center">
                
                {/* Candle Flame */}
                <div className="relative z-30 mb-0 flex flex-col items-center">
                  <div className="w-3 h-4 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full animate-bounce shadow-md duration-700" />
                  <div
                    className="w-2 h-9 rounded-t-sm shadow-xs"
                    style={{
                      background:
                        selectedCandle.id === 'candle-number'
                          ? 'linear-gradient(to right, #F59E0B, #FDE68A)'
                          : 'linear-gradient(to right, #F472B6, #FFF, #60A5FA)',
                    }}
                  />
                </div>

                {/* Cake Top Oval */}
                <div
                  className={`relative z-20 flex items-center justify-center transition-all duration-300 ${
                    selectedSize.id === 'size-bento'
                      ? 'w-48 h-24'
                      : selectedSize.id === 'size-two-tier'
                      ? 'w-56 h-28'
                      : 'w-52 h-26'
                  } ${shape === 'heart' ? 'rounded-[40%_40%_50%_50%]' : 'rounded-[50%]'}`}
                  style={{
                    backgroundColor: selectedFrosting.hex,
                    border: `4px solid ${selectedFrosting.borderHex}`,
                    boxShadow: `inset 0 3px 10px rgba(255,255,255,0.7), 0 3px 10px ${selectedFrosting.borderHex}40`,
                  }}
                >
                  {/* Piping border */}
                  <div
                    className="absolute inset-1 rounded-[50%] pointer-events-none"
                    style={{
                      border: `3px dotted ${selectedFrosting.borderHex}`,
                    }}
                  />

                  {/* Toppings icons */}
                  <div className="absolute inset-0 flex items-center justify-around px-2 pointer-events-none">
                    {selectedToppings.includes('top-strawberry') && (
                      <span className="text-xl transform -translate-y-2 -rotate-12 drop-shadow-sm">🍓</span>
                    )}
                    {selectedToppings.includes('top-cherry') && (
                      <span className="text-xl transform -translate-y-3 drop-shadow-sm">🍒</span>
                    )}
                    {selectedToppings.includes('top-macaron') && (
                      <span className="text-xl transform -translate-y-1 rotate-12 drop-shadow-sm">🧁</span>
                    )}
                    {selectedToppings.includes('top-gold') && (
                      <span className="text-xs text-amber-500 font-bold">✨</span>
                    )}
                    {selectedToppings.includes('top-biscoff') && (
                      <span className="text-base transform -translate-y-1">🍪</span>
                    )}
                  </div>

                  {/* Inscription Text Live on Cake */}
                  <div className="relative z-10 px-3 text-center max-w-[85%]">
                    <p
                      className="font-serif italic text-sm sm:text-base font-bold leading-tight truncate"
                      style={{
                        color: inscriptionColor,
                        textShadow: '0 1px 2px rgba(255,255,255,0.9)',
                      }}
                    >
                      {inscriptionText.trim() || 'Tulis Ucapanmu'}
                    </p>
                  </div>
                </div>

                {/* Cake Cylinder Body */}
                <div
                  className={`relative -mt-12 z-10 transition-all duration-300 ${
                    selectedSize.id === 'size-bento'
                      ? 'w-48 h-24'
                      : selectedSize.id === 'size-two-tier'
                      ? 'w-56 h-34'
                      : 'w-52 h-28'
                  } ${shape === 'heart' ? 'rounded-[30%_30%_50%_50%]' : 'rounded-b-[50%]'}`}
                  style={{
                    background: `linear-gradient(180deg, ${selectedFrosting.hex} 0%, ${selectedFrosting.borderHex}40 60%, ${selectedFrosting.borderHex}80 100%)`,
                    borderLeft: `4px solid ${selectedFrosting.borderHex}`,
                    borderRight: `4px solid ${selectedFrosting.borderHex}`,
                    borderBottom: `6px solid ${selectedFrosting.borderHex}`,
                  }}
                >
                  <div
                    className="absolute inset-x-2 bottom-1 h-3 rounded-full opacity-80"
                    style={{
                      borderBottom: `3px dotted ${selectedFrosting.borderHex}`,
                    }}
                  />

                  {selectedSize.id === 'size-two-tier' && (
                    <div
                      className="absolute -bottom-7 -left-5 -right-5 h-10 rounded-b-[50%] z-0"
                      style={{
                        background: `linear-gradient(180deg, ${selectedFrosting.hex} 0%, ${selectedFrosting.borderHex}80 100%)`,
                        border: `3px solid ${selectedFrosting.borderHex}`,
                      }}
                    />
                  )}
                </div>

              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-pink-200 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[11px] text-stone-500 block">Total Harga Kue:</span>
                <span className="text-2xl font-bold text-pink-600 font-serif-display tabular-nums">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pesan Kue Ini</span>
              </button>
            </div>

            {addedSuccessAlert && (
              <div className="mt-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kue custom berhasil masuk ke keranjang belanja!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 3 Guided Easy Steps */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Step Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-stone-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setCurrentStep(1)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                currentStep === 1
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 bg-transparent'
              }`}
            >
              1. Bentuk & Ukuran
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                currentStep === 2
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 bg-transparent'
              }`}
            >
              2. Rasa & Warna
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                currentStep === 3
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 bg-transparent'
              }`}
            >
              3. Tulisan & Lilin
            </button>
          </div>

          {/* STEP 1: BENTUK & UKURAN */}
          {currentStep === 1 && (
            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-5">
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-2.5">Pilih Bentuk Kue:</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setShape('round')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      shape === 'round'
                        ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold ring-2 ring-pink-300'
                        : 'border-stone-200 hover:border-pink-200 text-stone-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-current mx-auto mb-1.5" />
                    <span className="text-xs font-semibold">Bulat (Round)</span>
                  </button>
                  <button
                    onClick={() => setShape('heart')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      shape === 'heart'
                        ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold ring-2 ring-pink-300'
                        : 'border-stone-200 hover:border-pink-200 text-stone-700'
                    }`}
                  >
                    <Heart className="w-8 h-8 mx-auto mb-1.5 text-current fill-current/20" />
                    <span className="text-xs font-semibold">Hati (Heart)</span>
                  </button>
                  <button
                    onClick={() => setShape('square')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      shape === 'square'
                        ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold ring-2 ring-pink-300'
                        : 'border-stone-200 hover:border-pink-200 text-stone-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-md border-2 border-current mx-auto mb-1.5" />
                    <span className="text-xs font-semibold">Kotak (Square)</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-2.5">Pilih Ukuran & Porsi:</h3>
                <div className="space-y-2">
                  {CAKE_SIZES.map(sz => (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        selectedSize.id === sz.id
                          ? 'border-pink-500 bg-pink-50/70 ring-2 ring-pink-300 font-semibold'
                          : 'border-stone-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedSize.id === sz.id
                              ? 'border-pink-600 bg-pink-600 text-white'
                              : 'border-stone-300'
                          }`}
                        >
                          {selectedSize.id === sz.id && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-stone-900">{sz.name}</span>
                          <span className="text-xs text-stone-500 ml-2">({sz.diameter} · {sz.servings})</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-pink-600 tabular-nums">
                        Rp {sz.basePrice.toLocaleString('id-ID')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Lanjut: Rasa & Warna →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: RASA & WARNA */}
          {currentStep === 2 && (
            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-5">
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-2.5">Pilih Rasa Sponge Kue:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SPONGE_FLAVORS.map(flv => (
                    <button
                      key={flv.id}
                      onClick={() => setSelectedFlavor(flv)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        selectedFlavor.id === flv.id
                          ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-300'
                          : 'border-stone-200 hover:border-pink-200'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full border border-stone-300 shrink-0 shadow-xs"
                        style={{ backgroundColor: flv.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">{flv.name}</p>
                        <p className="text-[10px] text-pink-600 font-semibold">
                          {flv.price === 0 ? 'Termasuk' : `+Rp ${flv.price.toLocaleString('id-ID')}`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-2.5">Pilih Warna Buttercream Frosting:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {FROSTING_COLORS.map(fc => (
                    <button
                      key={fc.id}
                      onClick={() => setSelectedFrosting(fc)}
                      className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                        selectedFrosting.id === fc.id
                          ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-300 font-bold'
                          : 'border-stone-200 hover:border-pink-200'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border shadow-xs shrink-0"
                        style={{ backgroundColor: fc.hex, borderColor: fc.borderHex }}
                      />
                      <span className="text-xs font-medium text-stone-800 truncate">{fc.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  ← Kembali
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Lanjut: Tulisan & Lilin →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: TULISAN & LILIN */}
          {currentStep === 3 && (
            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-5">
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">Tulis Ucapan di Atas Kue:</h3>
                <p className="text-xs text-stone-500 mb-2">
                  Ditulis tangan langsung oleh chef pastry kami menggunakan buttercream.
                </p>
                <input
                  type="text"
                  maxLength={30}
                  value={inscriptionText}
                  onChange={e => setInscriptionText(e.target.value)}
                  placeholder="Contoh: Happy Birthday Maya 💕"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-stone-900 text-xs font-medium"
                />

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {INSCRIPTION_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInscriptionText(tmpl)}
                      className="px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 text-[11px] font-semibold cursor-pointer"
                    >
                      {tmpl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-2">Topping Dekorasi Tambahan:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TOPPINGS.map(top => {
                    const isChecked = selectedToppings.includes(top.id);
                    return (
                      <button
                        key={top.id}
                        onClick={() => toggleTopping(top.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'border-pink-500 bg-pink-50/80 font-bold'
                            : 'border-stone-200 hover:border-pink-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-lg">{top.icon}</span>
                          <span className="text-xs text-stone-800 truncate">{top.name}</span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ml-1 ${
                            isChecked ? 'border-pink-600 bg-pink-600 text-white' : 'border-stone-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-2">Pilihan Lilin Ulang Tahun:</h3>
                <div className="space-y-1.5">
                  {CANDLE_OPTIONS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCandle(c)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                        selectedCandle.id === c.id
                          ? 'border-pink-500 bg-pink-50 text-pink-900 font-bold'
                          : 'border-stone-200 hover:border-pink-200 text-stone-700'
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="font-semibold tabular-nums">
                        {c.price === 0 ? 'Gratis' : `+Rp ${c.price.toLocaleString('id-ID')}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  ← Kembali
                </button>
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Selesai & Masukkan Keranjang</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
