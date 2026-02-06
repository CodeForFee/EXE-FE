import http from '@/lib/http';
import {
    CartResponse,
    CartItemRequest,
    UpdateCartItemRequest
} from '../types';

export const cartService = {
    getCart: async (): Promise<CartResponse> => {
        const response = await http.get<CartResponse>('/cart');
        return response.data;
    },

    addItem: async (data: CartItemRequest): Promise<CartResponse> => {
        const response = await http.post<CartResponse>('/cart/items', data);
        return response.data;
    },

    updateItem: async (itemId: string, data: UpdateCartItemRequest): Promise<CartResponse> => {
        const response = await http.put<CartResponse>(`/cart/items/${itemId}`, data);
        return response.data;
    },

    removeItem: async (itemId: string): Promise<CartResponse> => {
        const response = await http.delete<CartResponse>(`/cart/items/${itemId}`);
        return response.data;
    },

    clearCart: async (): Promise<void> => {
        await http.delete<void>('/cart');
    }
};
