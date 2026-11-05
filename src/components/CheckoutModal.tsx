import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Truck,
  Store,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { CartItem, OrderData } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  voucherDiscount: number;
  voucherCode?: string;
  onOrderCompleted: (order: OrderData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  voucherDiscount,
  voucherCode,
  onOrderCompleted,
}) => {
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // Delivery details
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  
  // Default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [deliveryDate, setDeliveryDate] = useState(defaultDateStr);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('13:00 - 16:00 WIB (Sore)');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bca' | 'mandiri' | 'gopay' | 'shopeepay'>('qris');
  
  // Form submission & validation errors
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);
  const deliveryFee = deliveryMethod === 'delivery' ? 25000 : 0;
  const total = Math.max(0, subtotal + deliveryFee - voucherDiscount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Mohon isi nama lengkap pemesan.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 9) {
      setErrorMsg('Mohon isi nomor WhatsApp aktif untuk konfirmasi pengiriman.');
      return;
    }
    if (deliveryMethod === 'delivery' && !deliveryAddress.trim()) {
      setErrorMsg('Mohon isi alamat lengkap pengiriman untuk kurir kue.');
      return;
    }
    if (!deliveryDate) {
      setErrorMsg('Mohon tentukan tanggal pengantaran atau pengambilan kue.');
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateCode = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const orderNumber = `CS-${dateCode}-${randomSuffix}`;

    const newOrder: OrderData = {
      orderNumber,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || `${customerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      deliveryMethod,
      deliveryDate,
      deliveryTimeSlot,
      deliveryAddress: deliveryMethod === 'pickup' ? 'Ambil Sendiri di Toko CakeShop' : deliveryAddress.trim(),
      deliveryNote: deliveryNote.trim(),
      paymentMethod,
      items,
      subtotal,
      deliveryFee,
      discount: voucherDiscount,
      voucherCode,
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderCompleted(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-pink-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-serif-display">
              Form Pemesanan CakeShop
            </h3>
            <p className="text-xs text-stone-500">
              Isi data pengiriman & pilih metode pembayaran
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl transition-colors cursor-pointer"
            aria-label="Tutup formulir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Data Pemesan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-pink-500" />
              <span>1. Data Pemesan</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Contoh: Jessica Anggraini"
                  className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-stone-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  No. WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-stone-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Email (Untuk Bukti Invoice)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-stone-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pilihan Pengiriman & Jadwal */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-pink-500" />
              <span>2. Pengiriman & Jadwal</span>
            </h4>

            {/* Delivery Method Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  deliveryMethod === 'delivery'
                    ? 'border-pink-500 bg-pink-50/70 ring-1 ring-pink-500'
                    : 'border-stone-200 hover:border-pink-200 bg-white'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Kurir Chilled Car</p>
                  <p className="text-[11px] text-stone-500">Mobil berpendingin (+Rp 25.000)</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  deliveryMethod === 'pickup'
                    ? 'border-pink-500 bg-pink-50/70 ring-1 ring-pink-500'
                    : 'border-stone-200 hover:border-pink-200 bg-white'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Ambil Sendiri di Toko</p>
                  <p className="text-[11px] text-stone-500">Self Pick-up (Gratis)</p>
                </div>
              </button>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Tanggal Pengantaran / Pick-up *
                </label>
                <input
                  type="date"
                  required
                  value={deliveryDate}
                  onChange={e => setDeliveryDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-stone-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Slot Waktu Pengantaran *
                </label>
                <select
                  value={deliveryTimeSlot}
                  onChange={e => setDeliveryTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-stone-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-stone-900"
                >
                  <option value="10:00 - 13:00 WIB (Siang)">10:00 - 13:00 WIB (Slot Siang)</option>
                  <option value="13:00 - 16:00 WIB (Sore)">13:00 - 16:00 WIB (Slot Sore)</option>
                  <option value="16:00 - 19:00 WIB (Malam)">16:00 - 19:00 WIB (Slot Malam)</option>
                </select>
              </div>
            </div>

            {/* Address input if delivery */}
            {deliveryMethod === 'delivery' && (
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Alamat Lengkap & Patokan Rumah *
                </label>
                <textarea
                  required
                  rows={2}
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder="Jl. Mawar No. 12, Kelurahan, Kecamatan, Patokan depan gerbang kayu..."
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-stone-900 resize-none"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Catatan Pengiriman (Opsional)
              </label>
              <input
                type="text"
                value={deliveryNote}
                onChange={e => setDeliveryNote(e.target.value)}
                placeholder="Contoh: Titipkan di satpam jika tidak ada orang di rumah"
                className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-200 focus:border-pink-500 text-stone-900"
              />
            </div>
          </div>

          {/* Section 3: Metode Pembayaran */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-pink-500" />
              <span>3. Metode Pembayaran</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'qris', name: 'QRIS', desc: 'Semua E-Wallet' },
                { id: 'bca', name: 'BCA Transfer', desc: 'BCA 828-102-8889' },
                { id: 'mandiri', name: 'Mandiri', desc: 'Transfer Bank' },
                { id: 'gopay', name: 'GoPay / Shopee', desc: 'Instant QR' },
              ].map(pay => (
                <button
                  type="button"
                  key={pay.id}
                  onClick={() => setPaymentMethod(pay.id as any)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMethod === pay.id
                      ? 'border-pink-500 bg-pink-50/80 ring-1 ring-pink-500 font-bold'
                      : 'border-stone-200 hover:border-pink-200 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900">{pay.name}</p>
                  <p className="text-[10px] text-stone-500">{pay.desc}</p>
                </button>
              ))}
            </div>

            {/* Payment instruction simulator box */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
              <QrCode className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                {paymentMethod === 'qris' && (
                  <span>
                    Kode QRIS dinamis akan ditampilkan otomatis pada invoice. Anda juga dapat langsung konfirmasi pesanan ke WhatsApp admin CakeShop.
                  </span>
                )}
                {paymentMethod === 'bca' && (
                  <span>
                    Transfer ke <strong>BCA 828-102-8889</strong> a.n. <strong>CakeShop Sweet Story</strong>. Simpan bukti transfer untuk admin WhatsApp.
                  </span>
                )}
                {paymentMethod === 'mandiri' && (
                  <span>
                    Transfer ke <strong>Mandiri 137-00-192837-1</strong> a.n. <strong>CakeShop Nusantara</strong>.
                  </span>
                )}
                {paymentMethod === 'gopay' && (
                  <span>
                    Scan QR GoPay / ShopeePay instan bebas biaya admin.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Ringkasan Biaya */}
          <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal ({items.length} kue)</span>
              <span className="tabular-nums font-medium text-stone-900">
                Rp {subtotal.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Ongkos Kirim ({deliveryMethod === 'delivery' ? 'Chilled Car' : 'Self Pick-up'})</span>
              <span className="tabular-nums font-medium text-stone-900">
                {deliveryFee === 0 ? 'Gratis' : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
              </span>
            </div>
            {voucherDiscount > 0 && (
              <div className="flex justify-between text-pink-600">
                <span>Diskon Kupon ({voucherCode})</span>
                <span className="tabular-nums font-semibold">
                  -Rp {voucherDiscount.toLocaleString('id-ID')}
                </span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 text-stone-900 font-bold">
              <span className="text-sm">Total Tagihan</span>
              <span className="text-xl text-pink-600 font-serif-display tabular-nums">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:bg-stone-300 text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isSubmitting ? (
                <span>Memproses Pesanan...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konfirmasi & Buat Pesanan · Rp {total.toLocaleString('id-ID')}</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-stone-400 mt-2">
              Pesanan akan otomatis terhubung dengan WhatsApp resmi CakeShop untuk kemudahan follow-up.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};
