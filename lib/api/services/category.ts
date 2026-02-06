import http from '@/lib/http';
import {
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
        const response = await http.get<Page<CategoryResponse>>('/category', {
            params: { page, size, sortBy, sortDir }
        });
        return response.data;
    },

    getAllCategoriesNoPaging: async (): Promise<CategoryResponse[]> => {
        const response = await http.get<CategoryResponse[]>('/category/all');
        return response.data;
    },

    getCategoryById: async (id: string): Promise<CategoryResponse> => {
        const response = await http.get<CategoryResponse>(`/category/${id}`);
        return response.data;
    },

    createCategory: async (request: CreateCategoryRequest): Promise<CategoryResponse> => {
        const response = await http.post<CategoryResponse>('/category', request);
        return response.data;
    },

    updateCategory: async (id: string, request: UpdateCategoryRequest): Promise<CategoryResponse> => {
        const response = await http.put<CategoryResponse>(`/category/${id}`, request);
        return response.data;
    },

    deleteCategory: async (id: string): Promise<void> => {
        await http.delete<void>(`/category/${id}`);
    }
};
