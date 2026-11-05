export interface CakeItem {
  id: string;
  name: string;
  category: 'birthday' | 'bento' | 'wedding' | 'cheesecake' | 'cupcake';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  story: string;
  leadTime: string;
  flavors: string[];
  sizes: Array<{ name: string; diameter: string; priceDelta: number }>;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export type CakeShape = 'round' | 'heart' | 'square';

export interface CakeSizeOption {
  id: string;
  name: string;
  diameter: string;
  servings: string;
  basePrice: number;
}

export interface SpongeFlavorOption {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
}

export interface FrostingColorOption {
  id: string;
  name: string;
  hex: string;
  borderHex: string;
  textColor: string;
}

export interface PipingStyleOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface CustomCakeConfig {
  shape: CakeShape;
  size: CakeSizeOption;
  spongeFlavor: SpongeFlavorOption;
  frostingColor: FrostingColorOption;
  pipingStyle: PipingStyleOption;
  toppings: string[]; // IDs of selected toppings
  inscription: {
    text: string;
    font: 'cursive' | 'serif' | 'clean';
    color: string;
  };
  candle: {
    type: string;
    label: string;
    price: number;
  };
  greetingCard: {
    included: boolean;
    to: string;
    from: string;
    message: string;
  };
  specialNotes: string;
  totalPrice: number;
}

export interface CartItem {
  id: string;
  type: 'catalog' | 'custom';
  name: string;
  image?: string;
  unitPrice: number;
  quantity: number;
  selectedFlavor?: string;
  selectedSize?: string;
  customMessage?: string;
  customConfig?: CustomCakeConfig;
  notes?: string;
}

export interface OrderData {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryMethod: 'pickup' | 'delivery';
  deliveryDate: string;
  deliveryTimeSlot: string;
  deliveryAddress: string;
  deliveryNote?: string;
  paymentMethod: 'qris' | 'bca' | 'mandiri' | 'gopay' | 'shopeepay';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  voucherCode?: string;
  total: number;
  status: 'pending' | 'confirmed' | 'baking' | 'ready' | 'delivered';
  createdAt: string;
}
