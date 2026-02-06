import http from '@/lib/http';
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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
    /**
     * Register a new user
     */
    register: async (request: RegistrationRequest): Promise<UserResponse> => {
        const response = await http.post<UserResponse>('/auth/register', request);
        return response.data;
    },

    /**
     * Login - calls backend and then sets httpOnly cookies via API route
     */
    loginClient: async (request: AuthenticationRequest): Promise<AuthenticationResponse> => {
        const response = await http.post<AuthenticationResponse>('/auth/login', request, {
            skipAuth: true
        });
        return response.data;
    },

    /**
     * Set cookies on server side after successful login
     */
    loginServer: async (body: { accessToken: string; refreshToken?: string }): Promise<void> => {
        await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    },

    /**
     * Logout - clears backend session and httpOnly cookies
     */
    logoutClient: async (): Promise<void> => {
        try {
            await http.post<void>('/auth/logout', {});
        } catch (error) {
            console.error('Failed to logout from backend:', error);
        }
    },

    /**
     * Clear cookies on server side
     */
    logoutServer: async (): Promise<void> => {
        await fetch('/api/auth/logout', {
            method: 'POST',
        });
    },

    /**
     * Verify email token
     */
    verifyToken: async (token: string): Promise<VerifyTokenResponse> => {
        const response = await http.get<VerifyTokenResponse>(`/auth/verify`, {
            params: { token },
            skipAuth: true
        });
        return response.data;
    },

    /**
     * Introspect token validity
     */
    introspect: async (request: IntrospectRequest): Promise<IntrospectTokenResponse> => {
        const response = await http.post<IntrospectTokenResponse>('/auth/introspect', request);
        return response.data;
    },

    /**
     * Resend verification email
     */
    resendVerification: async (email: string): Promise<UserResponse> => {
        const response = await http.post<UserResponse>(`/auth/resend`, { email }, {
            skipAuth: true
        });
        return response.data;
    },

    /**
     * Google OAuth login - redirects to backend
     */
    googleLogin: () => {
        // Try to tell the backend where to return. 
        // Note: The backend must be configured to accept this redirect_uri for security reasons.
        const redirectUri = `${window.location.origin}/auth/google/callback`;
        window.location.href = `${API_URL}/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
    }
};
