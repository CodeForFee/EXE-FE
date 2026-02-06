import { create } from 'zustand';
import { FurnitureResponse, CategoryResponse, Page } from '../api/types';
import { furnitureService } from '../api/services/furniture';
import { categoryService } from '../api/services/category';

interface ProductState {
    products: FurnitureResponse[];
    categories: CategoryResponse[];
    isLoading: boolean;
    error: string | null;
    pagination: {
        page: number;
        size: number;
        totalPages: number;
        totalElements: number;
    };
    filters: {
        categoryId: string | null;
        sortBy: string;
        sortDir: string;
        search: string;
    };

    // Actions
    fetchProducts: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    setFilter: (key: keyof ProductState['filters'], value: string | null) => void;
    setPage: (page: number) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    categories: [],
    isLoading: false,
    error: null,
    pagination: {
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
    },
    filters: {
        categoryId: null,
        sortBy: 'createdAt',
        sortDir: 'DESC',
        search: ''
    },

    fetchProducts: async () => {
        const { pagination, filters } = get();
        set({ isLoading: true, error: null });
        try {
            let data: Page<FurnitureResponse>;

            if (filters.search) {
                // If searching by name
                data = await furnitureService.searchFurniture(filters.search, pagination.page, pagination.size);
            } else if (filters.categoryId && filters.categoryId !== 'all') {
                // Get by category
                // Note: Service getFurnitureByCategory returns List[], not Page.
                // We might need to adjust logic or service.
                // For now, let's just handle it. 
                const list = await furnitureService.getFurnitureByCategory(filters.categoryId);
                // Mock paging for list response
                data = {
                    content: list,
                    totalPages: 1,
                    totalElements: list.length,
                    size: list.length,
                    number: 0,
                    // ... other page fields mocked
                    pageable: {} as Page<FurnitureResponse>['pageable'], last: true, first: true, numberOfElements: list.length, empty: list.length === 0, sort: { empty: true, sorted: false, unsorted: true }
                };
            } else {
                // Get all with paging
                data = await furnitureService.getAllFurniture(
                    pagination.page,
                    pagination.size,
                    filters.sortBy,
                    filters.sortDir
                );
            }

            set({
                products: data.content,
                pagination: {
                    ...pagination,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements
                },
                isLoading: false
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
            set({ error: errorMessage, isLoading: false });
        }
    },

    fetchCategories: async () => {
        try {
            const data = await categoryService.getAllCategoriesNoPaging();
            set({ categories: data });
        } catch (error: unknown) {
            console.error("Failed to fetch categories", error);
        }
    },

    setFilter: (key, value) => {
        set((state) => ({
            filters: { ...state.filters, [key]: value },
            pagination: { ...state.pagination, page: 0 } // Reset page when filter changes
        }));
        get().fetchProducts();
    },

    setPage: (page) => {
        set((state) => ({
            pagination: { ...state.pagination, page }
        }));
        get().fetchProducts();
    }
}));
