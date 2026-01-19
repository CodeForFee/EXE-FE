import { apiClient } from '../client';
import {
    ApiResponse,
    ApplyDiscountRequest,
    CreateDiscountRequest,
    DiscountResponse,
    UpdateDiscountRequest
} from '../types';

export const discountService = {
    createDiscount: async (request: CreateDiscountRequest): Promise<DiscountResponse> => {
        const response = await apiClient.post<ApiResponse<DiscountResponse>>('/discounts', request);
        return response.data.data;
    },

    getDiscountById: async (id: string): Promise<DiscountResponse> => {
        const response = await apiClient.get<ApiResponse<DiscountResponse>>(`/discounts/${id}`);
        return response.data.data;
    },

    getAllDiscounts: async (): Promise<DiscountResponse[]> => {
        const response = await apiClient.get<ApiResponse<DiscountResponse[]>>('/discounts');
        return response.data.data;
    },

    getActiveDiscounts: async (): Promise<DiscountResponse[]> => {
        const response = await apiClient.get<ApiResponse<DiscountResponse[]>>('/discounts/active');
        return response.data.data;
    },

    updateDiscount: async (id: string, request: UpdateDiscountRequest): Promise<DiscountResponse> => {
        const response = await apiClient.put<ApiResponse<DiscountResponse>>(`/discounts/${id}`, request);
        return response.data.data;
    },

    deleteDiscount: async (id: string): Promise<void> => {
        await apiClient.delete<ApiResponse<void>>(`/discounts/${id}`);
    },

    applyDiscountToFurniture: async (discountId: string, request: ApplyDiscountRequest): Promise<void> => {
        await apiClient.post<ApiResponse<void>>(`/discounts/${discountId}/apply`, request);
    },

    removeDiscountFromFurniture: async (discountId: string, furnitureId: string): Promise<void> => {
        await apiClient.delete<ApiResponse<void>>(`/discounts/${discountId}/furniture/${furnitureId}`);
    }
};
