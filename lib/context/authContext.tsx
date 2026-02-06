"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useSessionStore } from "@/lib/stores/useSessionStore";
import { userService } from "@/lib/api/services/user";

interface AuthContextType {
    setTokenFromContext: (accessToken: string, refreshToken?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
    children,
    initialAccessToken,
    initialRefreshToken
}: {
    children: ReactNode;
    initialAccessToken?: string | null;
    initialRefreshToken?: string | null;
}) => {
    const setSession = useSessionStore((state) => state.setSession);
    const updateUser = useSessionStore((state) => state.updateUser);
    const [isHydrated, setIsHydrated] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const setTokenFromContext = (accessToken: string, refreshToken?: string) => {
        setSession({ accessToken, refreshToken });
    };

    useEffect(() => {
        const initializeAuth = async () => {
            // Case 1: Has both access token and refresh token → OK, hydrate normally
            if (initialAccessToken && initialRefreshToken) {
                setSession({ accessToken: initialAccessToken, refreshToken: initialRefreshToken });

                // Fetch full user profile to get image and other details
                const user = useSessionStore.getState().user;
                if (user?.id) {
                    try {
                        const fullUser = await userService.getUserById(user.id);
                        updateUser(fullUser);
                    } catch (error) {
                        console.error("Failed to fetch full user profile:", error);
                    }
                }

                setIsHydrated(true);
                return;
            }

            // Case 2: No refresh token → Not logged in
            if (!initialRefreshToken) {
                setIsHydrated(true);
                return;
            }

            // Case 3: Has refresh token but NO access token
            // → Call API to get new access token
            if (!initialAccessToken && initialRefreshToken) {
                console.log("Access token missing, refreshing from cookies...");
                setIsRefreshing(true);

                try {
                    // Call API route to refresh access token
                    const response = await fetch('/api/auth/refresh', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refreshToken: initialRefreshToken }),
                    });

                    if (!response.ok) {
                        throw new Error("Invalid refresh token response");
                    }

                    const result = await response.json();
                    const newAccessToken = result.data?.token;

                    if (!newAccessToken) {
                        throw new Error("Invalid refresh token response");
                    }

                    // Set in Zustand store
                    setSession({
                        accessToken: newAccessToken,
                        refreshToken: initialRefreshToken
                    });

                    // Fetch full user profile after refresh
                    const user = useSessionStore.getState().user;
                    if (user?.id) {
                        try {
                            const fullUser = await userService.getUserById(user.id);
                            updateUser(fullUser);
                        } catch (fetchError) {
                            console.error("Failed to fetch full user profile:", fetchError);
                        }
                    }

                } catch (error) {
                    console.error("Failed to refresh token:", error);

                    // Refresh failed → Clear cookies and redirect
                    try {
                        await fetch('/api/auth/logout', { method: 'POST' });
                    } catch (logoutError) {
                        console.error("Failed to clear cookies:", logoutError);
                    }

                    // Redirect to login
                    window.location.href = "/login";
                    return;
                } finally {
                    setIsRefreshing(false);
                }
            }

            setIsHydrated(true);
        };

        initializeAuth();
    }, [initialAccessToken, initialRefreshToken, setSession, updateUser]);

    // Show loading while hydrating or refreshing
    if (!isHydrated || isRefreshing) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ setTokenFromContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within AuthProvider");
    }
    return context;
};
