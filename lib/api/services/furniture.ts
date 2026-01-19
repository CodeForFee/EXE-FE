import { apiClient } from '../client';
import {
    ApiResponse,
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
        const response = await apiClient.get<ApiResponse<Page<FurnitureResponse>>>(
            `/furniture?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
        );
        return response.data.data;
    },

    getFurnitureById: async (id: string): Promise<FurnitureResponse> => {
        const response = await apiClient.get<ApiResponse<FurnitureResponse>>(`/furniture/${id}`);
        return response.data.data;
    },

    createFurniture: async (request: CreateFurnitureRequest): Promise<FurnitureResponse> => {
        const response = await apiClient.post<ApiResponse<FurnitureResponse>>('/furniture', request);
        return response.data.data;
    },

    updateFurniture: async (id: string, request: UpdateFurnitureRequest): Promise<FurnitureResponse> => {
        const response = await apiClient.put<ApiResponse<FurnitureResponse>>(`/furniture/${id}`, request);
        return response.data.data;
    },

    deleteFurniture: async (id: string): Promise<void> => {
        await apiClient.delete<ApiResponse<void>>(`/furniture/${id}`);
    },

    searchFurniture: async (
        name: string,
        page = 0,
        size = 10
    ): Promise<Page<FurnitureResponse>> => {
        const response = await apiClient.get<ApiResponse<Page<FurnitureResponse>>>(
            `/furniture/search?name=${name}&page=${page}&size=${size}`
        );
        return response.data.data;
    },

    getFurnitureByCategory: async (categoryId: string): Promise<FurnitureResponse[]> => {
        const response = await apiClient.get<ApiResponse<FurnitureResponse[]>>(`/furniture/category/${categoryId}`);
        return response.data.data;
    }
};
