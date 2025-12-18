// Product Types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  seller: {
    id: string;
    name: string;
    verified: boolean;
    rating?: number;
  };
  condition: "new" | "like-new" | "used" | "refurbished";
  location: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "buyer" | "seller" | "both";
  verified: boolean;
  createdAt: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

// Address Types
export interface Address {
  id?: string;
  name: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  isDefault?: boolean;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  user: User;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

// Combo Types
export interface Combo {
  id: string;
  title: string;
  description: string;
  products: Product[];
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  available: boolean;
}

