import http from '@/lib/http';
import {
    Page,
    FurnitureReviewResponse,
    SubmitReviewRequest
} from '../types';

export const reviewService = {
    submitReview: async (furnitureId: string, data: SubmitReviewRequest): Promise<FurnitureReviewResponse> => {
        const response = await http.post<FurnitureReviewResponse>(`/furniture/${furnitureId}/reviews`, data);
        return response.data;
    },

    getReviews: async (furnitureId: string, params?: { page?: number; size?: number }): Promise<Page<FurnitureReviewResponse>> => {
        const response = await http.get<Page<FurnitureReviewResponse>>(`/furniture/${furnitureId}/reviews`, { params });
        return response.data;
    },

    deleteReview: async (furnitureId: string): Promise<void> => {
        await http.delete<void>(`/furniture/${furnitureId}/reviews`);
    }
};
