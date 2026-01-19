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

export const authService = {
    register: async (request: RegistrationRequest): Promise<UserResponse> => {
        const response = await apiClient.post<ApiResponse<UserResponse>>('/auth/register', request);
        return response.data.data;
    },

    login: async (request: AuthenticationRequest): Promise<AuthenticationResponse> => {
        const response = await apiClient.post<ApiResponse<AuthenticationResponse>>('/auth/login', request);
        if (response.data.data.token) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', response.data.data.token);
                // Optionally store user details
                localStorage.setItem('user', JSON.stringify(response.data.data));
            }
        }
        return response.data.data;
    },

    refresh: async (refreshToken?: string): Promise<AuthenticationResponse> => {
        // Note: Refresh token is typically handled via HTTP-only cookie by the backend, 
        // so we might not need to pass it explicitly if the browser handles cookies.
        // However, if the BE expects it in body or param, we pass it.
        // Based on Controller: @CookieValue(value = "refresh_token", required = false) String refreshToken
        // It seems it reads from Cookie. so we just make the call.
        const response = await apiClient.post<ApiResponse<AuthenticationResponse>>('/auth/refresh');
        if (response.data.data.token) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', response.data.data.token);
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
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        }
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
