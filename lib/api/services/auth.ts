import { apiClient } from '../client';
import {
    ApiResponse,
    AuthenticationRequest,
    AuthenticationResponse,
    IntrospectRequest,
    IntrospectTokenResponse,
    RegistrationRequest,
    UserResponse,
    VerifyTokenResponse
} from '../types';
import Cookies from 'js-cookie';

export const authService = {
    register: async (request: RegistrationRequest): Promise<UserResponse> => {
        const response = await apiClient.post<ApiResponse<UserResponse>>('/auth/register', request);
        return response.data.data;
    },

    login: async (request: AuthenticationRequest): Promise<AuthenticationResponse> => {
        const response = await apiClient.post<ApiResponse<AuthenticationResponse>>('/auth/login', request);
        if (response.data.data.token) {
            Cookies.set('accessToken', response.data.data.token, { expires: 7 });
            if (response.data.data.userId) {
                Cookies.set('userId', response.data.data.userId, { expires: 7 });
            }
        }
        return response.data.data;
    },

    refresh: async (refreshToken?: string): Promise<AuthenticationResponse> => {
        const response = await apiClient.post<ApiResponse<AuthenticationResponse>>('/auth/refresh');
        if (response.data.data.token) {
            Cookies.set('accessToken', response.data.data.token, { expires: 7 });
            // Refresh usually doesn't return userId, but if it does, set it.
            // AuthenticationResponse interface has userId.
            if (response.data.data.userId) {
                Cookies.set('userId', response.data.data.userId, { expires: 7 });
            }
        }
        return response.data.data;
    },

    verifyToken: async (token: string): Promise<VerifyTokenResponse> => {
        const response = await apiClient.get<ApiResponse<VerifyTokenResponse>>(`/auth/verify?token=${token}`);
        return response.data.data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post<ApiResponse<void>>('/auth/logout');
        Cookies.remove('accessToken');
        Cookies.remove('userId');
    },

    introspect: async (request: IntrospectRequest): Promise<IntrospectTokenResponse> => {
        const response = await apiClient.post<ApiResponse<IntrospectTokenResponse>>('/auth/introspect', request);
        return response.data.data;
    },

    resendVerification: async (email: string): Promise<UserResponse> => {
        const response = await apiClient.post<ApiResponse<UserResponse>>(`/auth/resend?email=${email}`);
        return response.data.data;
    },

    googleLogin: () => {
        // This usually redirects the browser to the backend Google auth endpoint
        window.location.href = `${apiClient.defaults.baseURL}/auth/google`;
    }
};
