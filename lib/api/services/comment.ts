import http from '@/lib/http';
import {
    Page,
    CommentResponse,
    CreateCommentRequest,
    UpdateCommentRequest
} from '../types';

export const commentService = {
    createComment: async (postId: string, data: CreateCommentRequest): Promise<CommentResponse> => {
        const response = await http.post<CommentResponse>(`/comments/post/${postId}`, data);
        return response.data;
    },

    getCommentsByPostId: async (postId: string, params?: { page?: number; size?: number }): Promise<Page<CommentResponse>> => {
        const response = await http.get<Page<CommentResponse>>(`/comments/post/${postId}`, { params });
        return response.data;
    },

    updateComment: async (id: string, data: UpdateCommentRequest): Promise<CommentResponse> => {
        const response = await http.put<CommentResponse>(`/comments/${id}`, data);
        return response.data;
    },

    deleteComment: async (id: string): Promise<void> => {
        await http.delete<void>(`/comments/${id}`);
    },

    getCommentById: async (id: string): Promise<CommentResponse> => {
        const response = await http.get<CommentResponse>(`/comments/${id}`);
        return response.data;
    },

    getCommentsByUserId: async (userId: string, params?: { page?: number; size?: number }): Promise<Page<CommentResponse>> => {
        const response = await http.get<Page<CommentResponse>>(`/comments/user/${userId}`, { params });
        return response.data;
    },

    getReplies: async (id: string, params?: { page?: number; size?: number }): Promise<Page<CommentResponse>> => {
        const response = await http.get<Page<CommentResponse>>(`/comments/reply/${id}`, { params });
        return response.data;
    }
};

