import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomCakeStudio } from './components/CustomCakeStudio';
import { CakeMenu } from './components/CakeMenu';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { CartItem, OrderData } from './types';
import { MessageCircle } from 'lucide-react';

const CART_STORAGE_KEY = 'cakeshop_cart_items';
const ORDERS_STORAGE_KEY = 'cakeshop_orders_history';

export default function App() {
  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recent orders state with localStorage
  const [recentOrders, setRecentOrders] = useState<OrderData[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number }>({
    code: '',
    discount: 0,
  });
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [trackingOrderNumber, setTrackingOrderNumber] = useState('');
  const [activeSection, setActiveSection] = useState('menu');

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // safe
    }
  }, [cartItems]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(recentOrders));
    } catch {
      // safe
    }
  }, [recentOrders]);

  // Navigation scroll helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        it =>
          it.id === item.id ||
          (it.type === 'catalog' &&
            it.name === item.name &&
            it.selectedSize === item.selectedSize &&
            it.selectedFlavor === item.selectedFlavor &&
            it.customMessage === item.customMessage)
      );

      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + item.quantity,
        };
        return next;
      }
      return [...prev, item];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(it => {
          if (it.id === id) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(it => it.id !== id));
  };

  const handleProceedToCheckout = (voucher: { code: string; discount: number }) => {
    setAppliedVoucher(voucher);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (order: OrderData) => {
    setRecentOrders(prev => [order, ...prev]);
    setCompletedOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleOpenTrackerForOrder = (orderNum: string) => {
    setTrackingOrderNumber(orderNum);
    setIsTrackerModalOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-stone-800">
      
      {/* Simple Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTracker={() => {
          setTrackingOrderNumber('');
          setIsTrackerModalOpen(true);
        }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartCustom={() => handleNavigate('custom-studio')}
          onExploreMenu={() => handleNavigate('menu')}
        />

        {/* Clean Sticky Switcher Bar */}
        <div className="sticky top-16 z-30 bg-[#FFFDF9]/95 backdrop-blur-md py-2.5 border-b border-pink-100/80 px-4">
          <div className="max-w-xs mx-auto flex items-center justify-center p-1 bg-stone-100 rounded-2xl">
            <button
              onClick={() => handleNavigate('menu')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeSection === 'menu'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🎂</span>
              <span>Menu Kue</span>
            </button>
            <button
              onClick={() => handleNavigate('custom-studio')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeSection === 'custom-studio'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🎨</span>
              <span>Custom Cake</span>
            </button>
          </div>
        </div>

        {/* Cake Menu Catalog */}
        <CakeMenu
          onAddToCart={handleAddToCart}
          onNavigateToCustom={() => handleNavigate('custom-studio')}
        />

        {/* Custom Cake Studio (USP Core Feature) */}
        <CustomCakeStudio
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Ultra Minimal Clean Footer */}
      <footer className="py-6 border-t border-pink-100 bg-white text-center text-xs text-stone-500">
        <p>© {new Date().getFullYear()} CakeShop · Every Cake Tells a Sweet Story</p>
      </footer>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        voucherDiscount={appliedVoucher.discount}
        voucherCode={appliedVoucher.code}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Success & WhatsApp Invoice Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setIsSuccessModalOpen(false)}
        onTrackOrder={handleOpenTrackerForOrder}
      />

      {/* Real-time Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerModalOpen}
        onClose={() => setIsTrackerModalOpen(false)}
        recentOrders={recentOrders}
        initialOrderNumber={trackingOrderNumber}
      />

      {/* Floating WhatsApp Quick Contact Button */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20Admin%20CakeShop,%20saya%20ingin%20tanya%20seputar%20pemesanan%20kue"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group cursor-pointer"
        aria-label="Konsultasi Kue via WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold">
          Tanya Pastry Chef
        </span>
      </a>

    </div>
  );
}
