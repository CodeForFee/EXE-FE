import { create } from 'zustand';
import { UserResponse, AuthenticationRequest, RegistrationRequest } from '../api/types';
import { authService } from '../api/services/auth';
import { userService } from '../api/services/user';
import Cookies from 'js-cookie';

interface UserState {
    user: UserResponse | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: UserResponse | null) => void;
    login: (request: AuthenticationRequest) => Promise<void>;
    register: (request: RegistrationRequest) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: true, // Start loading as we might fetch user on mount
    error: null,
    setUser: (user) => set({ user }),
    login: async (request: AuthenticationRequest) => {
        set({ isLoading: true, error: null });
        try {
            const authResponse = await authService.login(request);
            // After login, we can use the data from response OR fetch fresh data.
            // Using response data is faster.
            const user: UserResponse = {
                id: authResponse.userId,
                fullName: authResponse.fullName,
                email: request.email,
                status: 'ACTIVE',
                role: authResponse.roles.includes('ADMIN') ? 'ADMIN' : (authResponse.roles.includes('STAFF') ? 'STAFF' : 'USER'),
                address: "",
                phone: "",
                image: authResponse.image
            };
            set({ user, isLoading: false });
        } catch (err: any) {
            const message = err.response?.data?.message || 'Đăng nhập thất bại';
            set({ error: message, isLoading: false });
            throw err;
        }
    },
    register: async (request: RegistrationRequest) => {
        set({ isLoading: true, error: null });
        try {
            await authService.register(request);
            set({ isLoading: false });
        } catch (err: any) {
            const message = err.response?.data?.message || 'Đăng ký thất bại';
            set({ error: message, isLoading: false });
            throw err;
        }
    },
    logout: () => {
        authService.logout();
        set({ user: null });
    },
    clearError: () => set({ error: null }),
    fetchUser: async () => {
        set({ isLoading: true });
        const userId = Cookies.get('userId');
        const token = Cookies.get('accessToken');

        if (userId && token) {
            try {
                const user = await userService.getUserById(userId);
                set({ user, isLoading: false });
            } catch (err) {
                console.error("Failed to fetch user profile", err);
                // If fetch fails (e.g. token expired), we might want to logout
                // authService.logout(); // Optional: strict logout
                set({ user: null, isLoading: false });
            }
        } else {
            set({ user: null, isLoading: false });
        }
    }
}));
