import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  Cake,
  Flame,
  Truck,
  Package,
  MessageCircle,
} from 'lucide-react';
import { OrderData } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: OrderData[];
  initialOrderNumber?: string;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
  initialOrderNumber = '',
}) => {
  const [searchCode, setSearchCode] = useState(initialOrderNumber);
  const [searchedOrder, setSearchedOrder] = useState<OrderData | null>(() => {
    if (initialOrderNumber) {
      return recentOrders.find(o => o.orderNumber.toLowerCase() === initialOrderNumber.toLowerCase()) || null;
    }
    return recentOrders.length > 0 ? recentOrders[0] : null;
  });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toLowerCase();
    const found = recentOrders.find(
      o =>
        o.orderNumber.toLowerCase() === query ||
        o.customerPhone.includes(query) ||
        o.customerName.toLowerCase().includes(query)
    );
    setSearchedOrder(found || null);
  };

  // Steps in baking process
  const TRACKING_STEPS = [
    {
      id: 'step-1',
      title: 'Pesanan Diterima & Terjadwal',
      desc: 'Rincian rasa, ukuran, dan pesan kue telah masuk antrean dapur.',
      icon: CheckCircle2,
      done: true,
      time: 'Terkonfirmasi',
    },
    {
      id: 'step-2',
      title: 'Pemanggangan Sponge Artisan',
      desc: 'Bahan butter premium dipanggang dengan suhu presisi.',
      icon: Flame,
      done: true,
      time: 'Sedang Proses',
    },
    {
      id: 'step-3',
      title: 'Piping & Dekorasi Hand-Crafted',
      desc: 'Chef pastry menghias buttercream, topping, dan menulis pesan.',
      icon: Cake,
      done: searchedOrder?.status === 'ready' || searchedOrder?.status === 'delivered',
      time: 'Berikutnya',
    },
    {
      id: 'step-4',
      title: 'Pengemasan Dingin & Siap Dikirim',
      desc: 'Kue dikemas dalam insulated thermal box berpendingin.',
      icon: Truck,
      done: searchedOrder?.status === 'delivered',
      time: 'Estimasi Pengantaran',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-pink-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-serif-display">
              Lacak Status Pesanan Kue
            </h3>
            <p className="text-xs text-stone-500">
              Pantau proses pembuatan dan jadwal pengantaran kuemu
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl transition-colors cursor-pointer"
            aria-label="Tutup pelacak"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCode}
                onChange={e => setSearchCode(e.target.value)}
                placeholder="Masukkan No. Pesanan (misal CS-202611...) atau No. HP"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-stone-200 focus:border-pink-500 focus:outline-hidden text-stone-800"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Cari
            </button>
          </form>

          {/* Searched Order Result */}
          {searchedOrder ? (
            <div className="space-y-6">
              {/* Order Info Card */}
              <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-stone-900">
                    {searchedOrder.orderNumber}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Sedang Dipersiapkan
                  </span>
                </div>
                <div className="text-xs text-stone-600 space-y-0.5">
                  <p>
                    <span className="text-stone-400">Pemesan:</span> {searchedOrder.customerName} ({searchedOrder.customerPhone})
                  </p>
                  <p>
                    <span className="text-stone-400">Jadwal:</span> {searchedOrder.deliveryDate} · {searchedOrder.deliveryTimeSlot}
                  </p>
                  <p>
                    <span className="text-stone-400">Tujuan:</span> {searchedOrder.deliveryAddress}
                  </p>
                </div>
              </div>

              {/* Visual Timeline Tracker */}
              <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs space-y-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Tahapan Pengerjaan Kue
                </h4>

                <div className="space-y-6 relative pl-3">
                  <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-pink-100" />

                  {TRACKING_STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.id} className="relative flex items-start gap-4">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                            step.done
                              ? 'bg-pink-500 text-white shadow-xs'
                              : 'bg-stone-100 border border-stone-200 text-stone-400'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-stone-900">{step.title}</h5>
                            <span className="text-[10px] text-pink-600 font-semibold">{step.time}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items in this order */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
                <h5 className="text-xs font-bold text-stone-800">Kue dalam Pesanan Ini:</h5>
                <div className="space-y-2">
                  {searchedOrder.items.map(it => (
                    <div key={it.id} className="text-xs flex justify-between text-stone-600">
                      <span>
                        {it.name} (x{it.quantity})
                        {it.customMessage && <span className="italic text-pink-600 block text-[11px]">"{it.customMessage}"</span>}
                      </span>
                      <span className="font-semibold text-stone-800 tabular-nums">
                        Rp {(it.unitPrice * it.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
              <Package className="w-10 h-10 text-stone-400 mx-auto" />
              <h4 className="text-sm font-bold text-stone-800">Belum Ada Pesanan Ditemukan</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Silakan masukkan nomor pesanan Anda atau lakukan pemesanan baru melalui menu kue kami.
              </p>
            </div>
          )}

          {/* Customer Care WhatsApp banner */}
          <div className="pt-2 flex items-center justify-between p-3.5 bg-pink-50 rounded-2xl border border-pink-100 text-xs">
            <span className="text-stone-700">Butuh bantuan darurat pengiriman?</span>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20CakeShop,%20saya%20ingin%20tanya%20status%20pesanan%20kue"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 font-semibold hover:text-pink-700 flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
