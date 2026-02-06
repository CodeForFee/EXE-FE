import http from '@/lib/http';
import {
    Page,
    BoostUsageResponse,
    CreateBoostUsageRequest,
    UpdateBoostUsageRequest,
    BoostStatus
} from '../types';

export const boostUsageService = {
    getBoostUsageById: async (id: string): Promise<BoostUsageResponse> => {
        const response = await http.get<BoostUsageResponse>(`/boost-usage/${id}`);
        return response.data;
    },

    getBoostUsages: async (status?: BoostStatus, params?: { page?: number; size?: number }): Promise<Page<BoostUsageResponse>> => {
        const response = await http.get<Page<BoostUsageResponse>>('/boost-usage', {
            params: { ...params, status }
        });
        return response.data;
    },

    getBoostUsagesByUserBoostId: async (userBoostId: string, params?: { page?: number; size?: number }): Promise<Page<BoostUsageResponse>> => {
        const response = await http.get<Page<BoostUsageResponse>>(`/boost-usage/user-boost/${userBoostId}`, { params });
        return response.data;
    },

    getBoostUsagesByPostId: async (postId: string, params?: { page?: number; size?: number }): Promise<Page<BoostUsageResponse>> => {
        const response = await http.get<Page<BoostUsageResponse>>(`/boost-usage/post/${postId}`, { params });
        return response.data;
    },

    createBoostUsage: async (data: CreateBoostUsageRequest): Promise<BoostUsageResponse> => {
        const response = await http.post<BoostUsageResponse>('/boost-usage', data);
        return response.data;
    },

    cancelBoostUsage: async (id: string): Promise<void> => {
        await http.post<void>(`/boost-usage/${id}/cancel`, {});
    },

    updateBoostUsage: async (id: string, data: UpdateBoostUsageRequest): Promise<BoostUsageResponse> => {
        const response = await http.put<BoostUsageResponse>(`/boost-usage/${id}`, data);
        return response.data;
    }
};
