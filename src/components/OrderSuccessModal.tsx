import React, { useState } from 'react';
import {
  CheckCircle2,
  Share2,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  Copy,
  Check,
  QrCode,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { OrderData } from '../types';

interface OrderSuccessModalProps {
  order: OrderData | null;
  onClose: () => void;
  onTrackOrder: (orderNumber: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onTrackOrder,
}) => {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build WhatsApp Message
  const constructWhatsAppUrl = () => {
    const itemsList = order.items
      .map((it, idx) => {
        let details = `${idx + 1}. *${it.name}* (x${it.quantity}) - Rp ${(it.unitPrice * it.quantity).toLocaleString('id-ID')}`;
        if (it.selectedFlavor) details += `\n   - Rasa: ${it.selectedFlavor}`;
        if (it.selectedSize) details += `\n   - Ukuran: ${it.selectedSize}`;
        if (it.customMessage) details += `\n   - Tulisan Kue: "${it.customMessage}"`;
        if (it.notes) details += `\n   - Catatan: ${it.notes}`;
        return details;
      })
      .join('\n');

    const message = `Halo Admin CakeShop! 🍰✨\nSaya ingin konfirmasi pemesanan kue dengan rincian berikut:\n\n*No. Pesanan:* ${order.orderNumber}\n*Nama Pemesan:* ${order.customerName}\n*No. WhatsApp:* ${order.customerPhone}\n*Pengiriman:* ${order.deliveryMethod === 'delivery' ? 'Kurir Mobil Khusus Kue (Chilled Car)' : 'Ambil Sendiri di Toko'}\n*Tanggal & Jam:* ${order.deliveryDate} (${order.deliveryTimeSlot})\n*Alamat:* ${order.deliveryAddress}\n\n*Rincian Kue:*\n${itemsList}\n\n*Total Pembayaran:* Rp ${order.total.toLocaleString('id-ID')} (${order.paymentMethod.toUpperCase()})\n\nMohon konfirmasi dan info nomor antrean baking ya. Terima kasih! 🌸`;

    return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-6">
        
        {/* Celebration Header Banner */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 p-6 text-white text-center relative">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <span className="text-xs uppercase tracking-widest font-semibold text-pink-100">
            Every Cake Tells a Sweet Story
          </span>
          <h3 className="text-2xl font-bold font-serif-display mt-0.5">
            Pesanan Manismu Berhasil Dibuat!
          </h3>
          <p className="text-xs text-pink-100 mt-1 max-w-md mx-auto">
            Terima kasih telah mempercayakan momen spesialmu pada CakeShop. Kami siap memanggang dengan penuh cinta.
          </p>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Order Number Box */}
          <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                Nomor Pesanan Anda
              </span>
              <span className="text-lg font-bold text-stone-900 font-mono">
                {order.orderNumber}
              </span>
            </div>
            <button
              onClick={handleCopyOrderNumber}
              className="p-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin No.</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Schedule summary */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-400 flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-pink-500" />
                Tanggal
              </span>
              <span className="font-semibold text-stone-800">{order.deliveryDate}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-400 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-pink-500" />
                Slot Jam
              </span>
              <span className="font-semibold text-stone-800 truncate block">{order.deliveryTimeSlot}</span>
            </div>
          </div>

          {/* Direct WhatsApp Call-to-Action */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 space-y-2.5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-emerald-950">
                  Konfirmasi Otomatis ke WhatsApp Admin
                </h4>
                <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                  Kirim rincian pesanan ke nomor admin resmi kami untuk verifikasi cepat dan update foto kue saat dibuat.
                </p>
              </div>
            </div>

            <a
              href={constructWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim Rincian Pesanan ke WhatsApp Admin</span>
            </a>
          </div>

          {/* QRIS / Payment simulation display */}
          {order.paymentMethod === 'qris' && (
            <div className="bg-white rounded-2xl p-4 border border-stone-200 text-center space-y-2">
              <span className="text-xs font-bold text-stone-800 block">
                QRIS Standar Pembayaran Nasional
              </span>
              {/* Dynamic QR SVG */}
              <div className="w-36 h-36 mx-auto bg-stone-100 p-2 rounded-xl border border-stone-200 flex items-center justify-center">
                <div className="text-center space-y-1">
                  <QrCode className="w-20 h-20 text-stone-800 mx-auto" />
                  <span className="text-[9px] text-stone-500 font-mono block">NMID: ID1029384756</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-500">
                Scan menggunakan BCA, Mandiri, GoPay, OVO, ShopeePay, atau DANA.
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={() => {
                onClose();
                onTrackOrder(order.orderNumber);
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lacak Status Proses Kue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3 px-5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
