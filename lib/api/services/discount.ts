import http from '@/lib/http';
import {
    ApplyDiscountRequest,
    CreateDiscountRequest,
    DiscountResponse,
    UpdateDiscountRequest
} from '../types';

export const discountService = {
    getAllDiscounts: async (): Promise<DiscountResponse[]> => {
        const response = await http.get<DiscountResponse[]>('/discounts');
        return response.data;
    },

    getActiveDiscounts: async (): Promise<DiscountResponse[]> => {
        const response = await http.get<DiscountResponse[]>('/discounts/active');
        return response.data;
    },

    getDiscountById: async (id: string): Promise<DiscountResponse> => {
        const response = await http.get<DiscountResponse>(`/discounts/${id}`);
        return response.data;
    },

    createDiscount: async (request: CreateDiscountRequest): Promise<DiscountResponse> => {
        const response = await http.post<DiscountResponse>('/discounts', request);
        return response.data;
    },

    updateDiscount: async (id: string, request: UpdateDiscountRequest): Promise<DiscountResponse> => {
        const response = await http.put<DiscountResponse>(`/discounts/${id}`, request);
        return response.data;
    },

    deleteDiscount: async (id: string): Promise<void> => {
        await http.delete<void>(`/discounts/${id}`);
    },

    applyDiscountToFurniture: async (discountId: string, request: ApplyDiscountRequest): Promise<void> => {
        await http.post<void>(`/discounts/${discountId}/apply`, request);
    },

    removeDiscountFromFurniture: async (discountId: string, furnitureId: string): Promise<void> => {
        await http.delete<void>(`/discounts/${discountId}/furniture/${furnitureId}`);
    }
};
