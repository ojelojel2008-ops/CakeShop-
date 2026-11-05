import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (appliedVoucher: { code: string; discount: number }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number } | null>(null);
  const [voucherError, setVoucherError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const handleApplyVoucher = () => {
    setVoucherError('');
    const code = voucherInput.trim().toUpperCase();
    if (code === 'SWEETSTORY') {
      const discount = Math.min(25000, subtotal);
      setAppliedVoucher({ code, discount });
    } else if (code === 'FIRSTCAKE') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedVoucher({ code, discount });
    } else {
      setVoucherError('Kode voucher tidak valid. Coba: SWEETSTORY');
    }
  };

  const discountAmount = appliedVoucher ? appliedVoucher.discount : 0;
  const total = Math.max(0, subtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col border-l border-pink-100">
          
          {/* Header */}
          <div className="p-6 border-b border-pink-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif-display">
                  Keranjang Belanja
                </h3>
                <span className="text-xs text-stone-500">
                  {items.length} {items.length === 1 ? 'produk' : 'produk'} dipilih
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Tutup keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-stone-800 font-serif-display">
                  Keranjangmu Masih Kosong
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Yuk jelajahi koleksi kue istimewa kami atau rancang custom cake impianmu!
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3">
                    {/* Item Thumbnail */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-pink-50 border border-pink-100"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-100 to-rose-50 border border-pink-200 flex items-center justify-center text-pink-600 shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                    )}

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-stone-900 leading-snug line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-500 p-1 rounded-lg transition-colors cursor-pointer"
                          title="Hapus"
                          aria-label="Hapus item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Configurations description */}
                      <div className="mt-1 space-y-0.5 text-[11px] text-stone-500">
                        {item.selectedFlavor && (
                          <p>
                            <span className="text-stone-700 font-medium">Rasa:</span> {item.selectedFlavor}
                          </p>
                        )}
                        {item.selectedSize && (
                          <p>
                            <span className="text-stone-700 font-medium">Ukuran:</span> {item.selectedSize}
                          </p>
                        )}
                        {item.customMessage && (
                          <p className="text-pink-600 italic">
                            <span className="font-semibold text-stone-700 not-italic">Tulisan:</span> "{item.customMessage}"
                          </p>
                        )}
                        {item.customConfig && (
                          <div className="flex items-center gap-1.5 pt-1 text-[10px] text-stone-600">
                            <span
                              className="w-3 h-3 rounded-full border shadow-xs inline-block"
                              style={{ backgroundColor: item.customConfig.frostingColor.hex }}
                            />
                            <span>{item.customConfig.frostingColor.name}</span>
                            <span>·</span>
                            <span>{item.customConfig.pipingStyle.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-white rounded text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-white rounded text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-stone-900 tabular-nums">
                      Rp {(item.unitPrice * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Drawer */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-pink-100 space-y-4">
              {/* Voucher Code */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={voucherInput}
                      onChange={e => setVoucherInput(e.target.value)}
                      placeholder="Kode kupon: SWEETSTORY"
                      className="w-full pl-9 pr-3 py-2 text-xs uppercase font-medium bg-stone-50 rounded-xl border border-stone-200 focus:border-pink-500 focus:outline-hidden"
                    />
                  </div>
                  <button
                    onClick={handleApplyVoucher}
                    className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Terapkan
                  </button>
                </div>
                {appliedVoucher && (
                  <p className="mt-1 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Kupon {appliedVoucher.code} aktif: Hemat Rp {appliedVoucher.discount.toLocaleString('id-ID')}</span>
                  </p>
                )}
                {voucherError && (
                  <p className="mt-1 text-[11px] text-rose-500">{voucherError}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-stone-900">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between text-pink-600">
                    <span>Diskon Voucher</span>
                    <span className="tabular-nums font-semibold">
                      -Rp {discountAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-stone-200">
                  <span className="text-sm font-bold text-stone-900">Total Pembayaran</span>
                  <span className="text-lg font-bold text-pink-600 font-serif-display tabular-nums">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onProceedToCheckout(appliedVoucher || { code: '', discount: 0 });
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Lanjut Isi Data & Pemesanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
