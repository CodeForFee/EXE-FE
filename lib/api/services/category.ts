import { apiClient } from '../client';
import {
    ApiResponse,
    CategoryResponse,
    CreateCategoryRequest,
    Page,
    UpdateCategoryRequest
} from '../types';

export const categoryService = {
    getAllCategories: async (
        page = 0,
        size = 10,
        sortBy = 'name',
        sortDir = 'ASC'
    ): Promise<Page<CategoryResponse>> => {
        const response = await apiClient.get<ApiResponse<Page<CategoryResponse>>>(
            `/category?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
        );
        return response.data.data;
    },

    getAllCategoriesNoPaging: async (): Promise<CategoryResponse[]> => {
        const response = await apiClient.get<ApiResponse<CategoryResponse[]>>('/category/all');
        return response.data.data;
    },

    getCategoryById: async (id: string): Promise<CategoryResponse> => {
        const response = await apiClient.get<ApiResponse<CategoryResponse>>(`/category/${id}`);
        return response.data.data;
    },

    createCategory: async (request: CreateCategoryRequest): Promise<CategoryResponse> => {
        const response = await apiClient.post<ApiResponse<CategoryResponse>>('/category', request);
        return response.data.data;
    },

    updateCategory: async (id: string, request: UpdateCategoryRequest): Promise<CategoryResponse> => {
        const response = await apiClient.put<ApiResponse<CategoryResponse>>(`/category/${id}`, request);
        return response.data.data;
    },

    deleteCategory: async (id: string): Promise<void> => {
        await apiClient.delete<ApiResponse<void>>(`/category/${id}`);
    }
};
