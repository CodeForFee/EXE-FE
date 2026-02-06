import http from '@/lib/http';
import {
    ChangePasswordRequest,
    Page,
    UserCreateRequest,
    UserRequest,
    UserResponse
} from '../types';

export const userService = {
    getUserById: async (id: string): Promise<UserResponse> => {
        const response = await http.get<UserResponse>(`/users/${id}`);
        return response.data;
    },

    getAllUsers: async (
        page = 0,
        size = 10,
        email?: string,
        sort = 'createdAt',
        direction = 'DESC'
    ): Promise<Page<UserResponse>> => {
        const params: Record<string, string> = {
            page: page.toString(),
            size: size.toString(),
            sort: sort,
            direction: direction,
        };
        if (email) {
            params.email = email;
        }

        const response = await http.get<Page<UserResponse>>('/users/getAll', { params });
        return response.data;
    },

    createUser: async (request: UserCreateRequest): Promise<UserResponse> => {
        const response = await http.post<UserResponse>('/users', request);
        return response.data;
    },

    updateUser: async (id: string, request: UserRequest): Promise<UserResponse> => {
        const response = await http.put<UserResponse>(`/users/${id}`, request);
        return response.data;
    },

    updateUserStatus: async (id: string, status: 'ACTIVE' | 'BANNED' | 'UNVERIFIED'): Promise<UserResponse> => {
        const response = await http.post<UserResponse>(`/users/${id}/status`, {}, {
            params: { status }
        });
        return response.data;
    },

    changePassword: async (id: string, request: ChangePasswordRequest): Promise<UserResponse> => {
        const response = await http.put<UserResponse>(`/users/${id}/change-password`, request);
        return response.data;
    },

    deleteUser: async (id: string): Promise<void> => {
        await http.delete<void>(`/users/${id}`);
    }
};
