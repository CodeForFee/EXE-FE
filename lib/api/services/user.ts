import { apiClient } from '../client';
import {
    ApiResponse,
    ChangePasswordRequest,
    Page,
    UserCreateRequest,
    UserRequest,
    UserResponse
} from '../types';

export const userService = {
    getUserById: async (id: string): Promise<UserResponse> => {
        const response = await apiClient.get<ApiResponse<UserResponse>>(`/users/${id}`);
        return response.data.data;
    },

    getAllUsers: async (
        page = 0,
        size = 10,
        email?: string,
        sort = 'createdAt',
        direction = 'DESC'
    ): Promise<Page<UserResponse>> => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('size', size.toString());
        params.append('sort', sort);
        params.append('direction', direction);
        if (email) {
            params.append('email', email);
        }

        const response = await apiClient.get<ApiResponse<Page<UserResponse>>>(`/users/getAll?${params.toString()}`);
        // Note: The backend returns different structures based on email presence? 
        // Check Controller: 
        // if email -> data(userService.searchUsers(email, pageable)) which returns Page<UserResponse>
        // else -> data(userService.getAllUsersPaginated(pageable)) which returns Page<UserResponse>
        // So both return Page<UserResponse>.

        // However, the controller return type for getAll is ResponseEntity<ApiResponse<?>>.
        // We cast it to what we expect.
        return response.data.data as Page<UserResponse>;
    },

    createUser: async (request: UserCreateRequest): Promise<UserResponse> => {
        const response = await apiClient.post<ApiResponse<UserResponse>>('/users', request);
        return response.data.data;
    },

    updateUser: async (id: string, request: UserRequest): Promise<UserResponse> => {
        const response = await apiClient.put<ApiResponse<UserResponse>>(`/users/${id}`, request);
        return response.data.data;
    },

    updateUserStatus: async (id: string, status: 'ACTIVE' | 'BANNED' | 'UNVERIFIED'): Promise<UserResponse> => {
        const response = await apiClient.post<ApiResponse<UserResponse>>(`/users/${id}/status?status=${status}`);
        return response.data.data;
    },

    changePassword: async (id: string, request: ChangePasswordRequest): Promise<UserResponse> => {
        const response = await apiClient.put<ApiResponse<UserResponse>>(`/users/${id}/change-password`, request);
        return response.data.data;
    },

    deleteUser: async (id: string): Promise<void> => {
        await apiClient.delete<ApiResponse<void>>(`/users/${id}`);
    }
};
