import http from '@/lib/http';
import {
    CreateFurnitureRequest,
    FurnitureResponse,
    Page,
    UpdateFurnitureRequest
} from '../types';

export const furnitureService = {
    getAllFurniture: async (
        page = 0,
        size = 10,
        sortBy = 'createdAt',
        sortDir = 'DESC'
    ): Promise<Page<FurnitureResponse>> => {
        const response = await http.get<Page<FurnitureResponse>>('/furniture', {
            params: { page, size, sortBy, sortDir },
            skipAuth: true
        });
        return response.data;
    },

    getFurnitureById: async (id: string): Promise<FurnitureResponse> => {
        const response = await http.get<FurnitureResponse>(`/furniture/${id}`, {
            skipAuth: true
        });
        return response.data;
    },

    createFurniture: async (request: CreateFurnitureRequest): Promise<FurnitureResponse> => {
        const response = await http.post<FurnitureResponse>('/furniture', request);
        return response.data;
    },

    updateFurniture: async (id: string, request: UpdateFurnitureRequest): Promise<FurnitureResponse> => {
        const response = await http.put<FurnitureResponse>(`/furniture/${id}`, request);
        return response.data;
    },

    deleteFurniture: async (id: string): Promise<void> => {
        await http.delete<void>(`/furniture/${id}`);
    },

    searchFurniture: async (
        name: string,
        page = 0,
        size = 10
    ): Promise<Page<FurnitureResponse>> => {
        const response = await http.get<Page<FurnitureResponse>>('/furniture/search', {
            params: { name, page, size },
            skipAuth: true
        });
        return response.data;
    },

    getFurnitureByCategory: async (categoryId: string): Promise<FurnitureResponse[]> => {
        const response = await http.get<FurnitureResponse[]>(`/furniture/category/${categoryId}`, {
            skipAuth: true
        });
        return response.data;
    }
};
