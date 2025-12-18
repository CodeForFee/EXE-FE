import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => {
                const existingItem = state.items.find((i) => i.id === item.id);
                if (existingItem) {
                    return {
                        items: state.items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                    };
                }
                return { items: [...state.items, item] };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i.id !== id),
            })),
            updateQuantity: (id, delta) => set((state) => ({
                items: state.items.map((i) =>
                    i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
                ),
            })),
            clearCart: () => set({ items: [] }),
            getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            getSubtotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: 'unihome-cart-storage',
        }
    )
);
