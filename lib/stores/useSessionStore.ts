import { create } from "zustand";
import { UserResponse } from "@/lib/api/types";
import { decodeJWT } from "@/lib/utils/helper";

interface SessionState {
    accessToken: string | null;
    refreshToken: string | null;
    user: UserResponse | null;

    setSession: (params: {
        accessToken: string;
        refreshToken?: string;
    }) => void;

    updateUser: (user: UserResponse) => void;

    clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
    accessToken: null,
    refreshToken: null,
    user: null,

    /* ===== INIT / LOGIN ===== */
    setSession: ({ accessToken, refreshToken }) => {
        try {
            // Decode JWT to extract user info
            const decoded = decodeJWT<{
                userId?: string;
                sub?: string; // some JWTs use 'sub' for user id
                email?: string;
                fullName?: string;
                role?: string;
                roles?: string[];
                image?: string; // Add image field from JWT
                phone?: string;
                address?: string;
            }>(accessToken);

            // Map the decoded token to UserResponse
            const user: UserResponse = {
                id: decoded.userId || decoded.sub || '',
                email: decoded.email || '',
                fullName: decoded.fullName || '',
                role: (decoded.role || (decoded.roles?.[0]?.includes('ADMIN') ? 'ADMIN' : 
                       decoded.roles?.[0]?.includes('STAFF') ? 'STAFF' : 'USER')) as 'ADMIN' | 'STAFF' | 'USER',
                status: 'ACTIVE',
                address: decoded.address || '',
                phone: decoded.phone || '',
                image: decoded.image || '', // Get image from JWT if available
            };

            set({
                accessToken,
                refreshToken: refreshToken || null,
                user,
            });
        } catch (error) {
            console.error("Invalid access token", error);
            set({
                accessToken: null,
                refreshToken: null,
                user: null,
            });
        }
    },

    /* ===== UPDATE USER ===== */
    updateUser: (user: UserResponse) => {
        set({ user });
    },

    /* ===== LOGOUT / EXPIRED ===== */
    clearSession: () => {
        set({
            accessToken: null,
            refreshToken: null,
            user: null,
        });
    },
}));
