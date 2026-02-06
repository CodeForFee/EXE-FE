import { useSessionStore } from "@/lib/stores/useSessionStore";
import { ApiResponse } from "@/lib/api/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CustomOptions extends RequestInit {
    baseURL?: string | undefined;
    params?: Record<string, string | number | boolean | undefined>;
    skipAuth?: boolean;
}

interface ErrorResponse {
    code: number;
    message: string;
}

// Helper: Check runtime
const isServerRuntime = () => typeof window === "undefined";

// Custom error classes
export class HttpError extends Error {
    status: number;
    payload: ErrorResponse;

    constructor(payload: ErrorResponse) {
        super(payload.message);
        this.status = payload.code;
        this.payload = payload;
    }
}

export class EntityError extends HttpError {
    constructor(payload: ErrorResponse) {
        super(payload);
        this.name = "EntityError";
    }
}

// Token Refresh Interceptor
class TokenRefreshInterceptor {
    private refreshPromise: Promise<string> | null = null;
    private isRefreshing = false;

    async getValidToken(): Promise<string | null> {
        if (isServerRuntime()) {
            try {
                const { cookies } = await import("next/headers");
                const cookieStore = await cookies();
                return cookieStore.get("accessToken")?.value || null;
            } catch (error) {
                console.error("Error getting token from cookies:", error);
                return null;
            }
        } else {
            // Client: get token from store
            return useSessionStore.getState().accessToken || null;
        }
    }

    async refreshToken(): Promise<string> {
        // Server cannot refresh token
        if (isServerRuntime()) {
            throw new Error("REFRESH_TOKEN_NOT_SUPPORTED_ON_SERVER");
        }

        // If already refreshing, wait for the existing promise
        if (this.isRefreshing && this.refreshPromise) {
            return this.refreshPromise;
        }

        // Create new refresh promise
        this.isRefreshing = true;
        this.refreshPromise = this.performRefresh();

        try {
            const newToken = await this.refreshPromise;
            return newToken;
        } finally {
            this.isRefreshing = false;
            this.refreshPromise = null;
        }
    }

    private async performRefresh(): Promise<string> {
        const refreshToken = useSessionStore.getState().refreshToken;

        if (!refreshToken) {
            throw new Error("NO_REFRESH_TOKEN");
        }

        try {
            // Call refresh API route (client → server → backend)
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                throw new Error("INVALID_REFRESH_RESPONSE");
            }

            const result: ApiResponse<{ token: string; refreshToken?: string }> = await response.json();

            if (!result.data?.token) {
                throw new Error("INVALID_REFRESH_RESPONSE");
            }

            const newAccessToken = result.data.token;
            const newRefreshToken = result.data.refreshToken || refreshToken;

            // Update Zustand store with new tokens
            useSessionStore.getState().setSession({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            });

            return newAccessToken;
        } catch (error) {
            // Refresh failed -> Clear session and redirect
            this.clearSessionAndRedirect();
            throw error;
        }
    }

    clearSessionAndRedirect() {
        if (isServerRuntime()) {
            throw new Error("UNAUTHORIZED");
        } else {
            // Client: clear store and redirect
            useSessionStore.getState().clearSession();
            if (typeof window !== "undefined") {
                window.location.href = `/login`;
            }
        }
    }

    handleAuthError() {
        this.clearSessionAndRedirect();
    }
}

const tokenInterceptor = new TokenRefreshInterceptor();

async function httpRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: string,
    options?: CustomOptions,
    retryCount = 0
): Promise<ApiResponse<T>> {
    const maxRetries = 1; // Only retry once after refreshing token

    // Prepare body
    const body = options?.body
        ? options.body instanceof FormData
            ? options.body
            : JSON.stringify(options.body)
        : undefined;

    // Get auth token
    const authToken = options?.skipAuth
        ? null
        : await tokenInterceptor.getValidToken();

    // Prepare headers
    const baseHeaders: Record<string, string> = {};

    if (!(body instanceof FormData)) {
        baseHeaders["Content-Type"] = "application/json";
    }

    if (authToken) {
        baseHeaders["Authorization"] = `Bearer ${authToken}`;
    }

    // Prepare URL
    const baseUrl = options?.baseURL === undefined
        ? API_URL
        : options.baseURL;

    const fullUrl = url.startsWith("/")
        ? `${baseUrl}${url}`
        : `${baseUrl}/${url}`;

    // Add query params if exists
    const urlWithParams = options?.params
        ? `${fullUrl}?${new URLSearchParams(
            Object.entries(options.params)
                .filter(([_, v]) => v !== undefined)
                .map(([k, v]) => [k, String(v)])
        ).toString()}`
        : fullUrl;

    // Make request
    const res = await fetch(urlWithParams, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        } as HeadersInit,
        body,
        method,
    });

    const payload: ApiResponse<T> = await res.json();

    // Handle 401 - Token expired
    if (res.status === 401 && !options?.skipAuth) {
        // Server: cannot refresh, throw error
        if (isServerRuntime()) {
            tokenInterceptor.handleAuthError();
        }

        // Client: Only retry if not exceeded maxRetries
        if (retryCount < maxRetries) {
            try {
                console.log("Token expired, refreshing...");

                // Refresh token
                await tokenInterceptor.refreshToken();

                console.log("Token refreshed successfully, retrying request...");

                // Retry request with new token
                return httpRequest<T>(method, url, options, retryCount + 1);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                tokenInterceptor.handleAuthError();
                throw refreshError;
            }
        } else {
            // Exceeded retry limit
            console.error("Max retry attempts exceeded");
            tokenInterceptor.handleAuthError();
        }
    }

    // Handle other errors
    if (!res.ok) {
        const errorPayload: ErrorResponse = {
            code: payload.code || res.status,
            message: payload.message || 'An error occurred'
        };

        if (res.status === 422) {
            throw new EntityError(errorPayload);
        } else {
            throw new HttpError(errorPayload);
        }
    }

    return payload;
}

const http = {
    get<T>(url: string, options?: CustomOptions) {
        return httpRequest<T>("GET", url, options);
    },

    post<T>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body">
    ) {
        return httpRequest<T>("POST", url, { ...options, body });
    },

    put<T>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body">
    ) {
        return httpRequest<T>("PUT", url, { ...options, body });
    },

    delete<T>(url: string, options?: Omit<CustomOptions, "body">) {
        return httpRequest<T>("DELETE", url, options);
    },

    patch<T>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body">
    ) {
        return httpRequest<T>("PATCH", url, { ...options, body });
    },
};

export default http;
