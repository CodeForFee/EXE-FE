/**
 * DEPRECATED: This store is kept for backward compatibility.
 * New code should use useSessionStore instead.
 * 
 * This is a compatibility layer that wraps useSessionStore
 */
import { useSessionStore } from './useSessionStore';
import { UserResponse, AuthenticationRequest, RegistrationRequest } from '../api/types';
import { authService } from '../api/services/auth';
import { userService } from '../api/services/user';

interface UserState {
    user: UserResponse | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: UserResponse | null) => void;
    login: (request: AuthenticationRequest) => Promise<void>;
    register: (request: RegistrationRequest) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    fetchUser: () => Promise<void>;
}

/**
 * @deprecated Use useSessionStore instead for new code
 * This hook provides backward compatibility
 */
export const useUserStore = (): UserState => {
    const sessionUser = useSessionStore((state) => state.user);
    const setSession = useSessionStore((state) => state.setSession);
    const clearSession = useSessionStore((state) => state.clearSession);

    return {
        user: sessionUser,
        isLoading: false,
        error: null,

        setUser: (user: UserResponse | null) => {
            // Not supported in new auth system
            console.warn('setUser is deprecated. User is managed through session tokens.');
        },

        login: async (request: AuthenticationRequest) => {
            try {
                // Step 1: Login to backend
                const authResponse = await authService.loginClient(request);

                // Step 2: Set httpOnly cookies via API route
                await authService.loginServer({
                    accessToken: authResponse.token,
                    refreshToken: authResponse.token
                });

                // Step 3: Update session store
                setSession({
                    accessToken: authResponse.token,
                    refreshToken: authResponse.token
                });
            } catch (err: unknown) {
                throw err;
            }
        },

        register: async (request: RegistrationRequest) => {
            try {
                await authService.register(request);
            } catch (err: unknown) {
                throw err;
            }
        },

        logout: async () => {
            try {
                // Clear backend session
                await authService.logoutClient();

                // Clear server-side cookies
                await authService.logoutServer();

                // Clear client-side session
                clearSession();
            } catch (error: unknown) {
                console.error('Logout error:', error);
                // Clear session anyway
                clearSession();
            }
        },

        clearError: () => {
            // No-op for compatibility
        },

        fetchUser: async () => {
            // User is automatically loaded from token in session store
            // This is a no-op for compatibility
            const accessToken = useSessionStore.getState().accessToken;
            if (accessToken && sessionUser?.id) {
                try {
                    const fullUser = await userService.getUserById(sessionUser.id);
                    // Update would require re-encoding JWT, which we don't do client-side
                    console.log('User fetched:', fullUser);
                } catch (err: unknown) {
                    console.error("Failed to fetch user profile", err);
                }
            }
        }
    };
};
