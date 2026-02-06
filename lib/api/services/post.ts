import http from '@/lib/http';
import {
    Page,
    PostResponse,
    CreatePostRequest,
    UpdatePostRequest,
    CreatePostDetailRequest,
    PostDetailResponse
} from '../types';

export const postService = {
    createPost: async (data: CreatePostRequest): Promise<PostResponse> => {
        const response = await http.post<PostResponse>('/posts', data);
        return response.data;
    },

    createPostDetail: async (postId: string, data: CreatePostDetailRequest): Promise<PostDetailResponse> => {
        const response = await http.post<PostDetailResponse>(`/posts/${postId}/details`, data);
        return response.data;
    },

    getPostById: async (id: string): Promise<PostResponse> => {
        const response = await http.get<PostResponse>(`/posts/${id}`);
        return response.data;
    },

    getAllPosts: async (params?: { page?: number; size?: number; sort?: string; direction?: string }): Promise<Page<PostResponse>> => {
        const response = await http.get<Page<PostResponse>>('/posts', { params });
        return response.data;
    },

    getPostsByUserId: async (userId: string, params?: { page?: number; size?: number; sort?: string; direction?: string }): Promise<Page<PostResponse>> => {
        const response = await http.get<Page<PostResponse>>(`/posts/user/${userId}`, { params });
        return response.data;
    },

    getPostsByCategory: async (categoryId: string, params?: { page?: number; size?: number; sort?: string; direction?: string }): Promise<Page<PostResponse>> => {
        const response = await http.get<Page<PostResponse>>(`/posts/category/${categoryId}`, { params });
        return response.data;
    },

    searchPosts: async (title: string, params?: { page?: number; size?: number; sort?: string; direction?: string }): Promise<Page<PostResponse>> => {
        const response = await http.get<Page<PostResponse>>('/posts/search', {
            params: { ...params, title }
        });
        return response.data;
    },

    updatePost: async (id: string, data: UpdatePostRequest): Promise<PostResponse> => {
        const response = await http.put<PostResponse>(`/posts/${id}`, data);
        return response.data;
    },

    deletePost: async (id: string): Promise<void> => {
        await http.put<void>(`/posts/${id}/delete`, {});
    }
};
