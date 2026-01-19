import { apiClient } from '../client';
import {
    ApiResponse,
    CreateFurnitureRequest,
    FurnitureResponse,
    Page,
    UpdateFurnitureRequest
} from '../types';

export const furnitureService = {
    createFurniture: async (request: CreateFurnitureRequest): Promise<FurnitureResponse> => {
        const response = await apiClient.post<ApiResponse<FurnitureResponse>>('/furniture', request);
        return response.data.data;
    },

    getFurnitureById: async (id: string): Promise<FurnitureResponse> => {
        const response = await apiClient.get<ApiResponse<FurnitureResponse>>(`/furniture/${id}`);
        return response.data.data;
    },

    getAllFurniture: async (
        page = 0,
        size = 10,
        sortBy = 'createdAt',
        sortDir = 'DESC'
    ): Promise<Page<FurnitureResponse>> => {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            sortBy,
            sortDir
        });
        const response = await apiClient.get<ApiResponse<Page<FurnitureResponse>>>(`/furniture?${params.toString()}`);
        return response.data.data;
    },

    getFurnitureByCategory: async (categoryId: string): Promise<FurnitureResponse[]> => {
        const response = await apiClient.get<ApiResponse<FurnitureResponse[]>>(`/furniture/category/${categoryId}`);
        return response.data.data;
    },

    searchFurniture: async (
        name: string,
        page = 0,
        size = 10
    ): Promise<Page<FurnitureResponse>> => {
        const params = new URLSearchParams({
            name,
            page: page.toString(),
            size: size.toString()
        });
        const response = await apiClient.get<ApiResponse<Page<FurnitureResponse>>>(`/furniture/search?${params.toString()}`);
        return response.data.data;
    },

    updateFurniture: async (id: string, request: UpdateFurnitureRequest): Promise<FurnitureResponse> => {
        const response = await apiClient.put<ApiResponse<FurnitureResponse>>(`/furniture/${id}`, request);
        return response.data.data;
    },

    deleteFurniture: async (id: string): Promise<void> => {
        await apiClient.delete<ApiResponse<void>>(`/furniture/${id}`);
    }
};
