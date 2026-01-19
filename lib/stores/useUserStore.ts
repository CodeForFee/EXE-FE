import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserResponse, AuthenticationRequest, RegistrationRequest } from '../api/types';
import { authService } from '../api/services/auth';

interface UserState {
    user: UserResponse | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: UserResponse | null) => void;
    login: (request: AuthenticationRequest) => Promise<void>;
    register: (request: RegistrationRequest) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,
            error: null,
            setUser: (user) => set({ user }),
            login: async (request: AuthenticationRequest) => {
                set({ isLoading: true, error: null });
                try {
                    // Update: The service login returns AuthenticationResponse
                    // We might need to fetch the full user details after login if AuthenticationResponse doesn't have everything
                    // But looking at AuthenticationResponse, it has limited info.
                    // Let's assume for now we use the info from AuthResponse or fetch user profile.

                    const authResponse = await authService.login(request);

                    // We need to map AuthenticationResponse to UserResponse or fetch user info.
                    // Ideally, we'd call a 'me' endpoint or similar. 
                    // Let's construct a partial User from Response or just store what we have.
                    // The UserResponse in types.ts has more fields. 

                    // Allow me to assume we should just store the user info we have or fetch it.
                    // For now, let's map what we can and maybe update later.
                    const user: UserResponse = {
                        id: authResponse.userId,
                        fullName: authResponse.fullName,
                        email: request.email, // Email is in request, not response explicitly? Wait, response has token.
                        status: 'ACTIVE', // Default assumption or need extra call
                        role: authResponse.roles.includes('ADMIN') ? 'ADMIN' : (authResponse.roles.includes('STAFF') ? 'STAFF' : 'USER'),
                        address: "", // Missing in AuthResponse
                        phone: "", // Missing in AuthResponse
                        image: authResponse.image
                    };

                    set({ user, isLoading: false });
                } catch (err: any) {
                    const message = err.response?.data?.message || 'Đăng nhập thất bại';
                    set({ error: message, isLoading: false });
                    throw err; // Re-throw so UI can handle if needed
                }
            },
            register: async (request: RegistrationRequest) => {
                set({ isLoading: true, error: null });
                try {
                    const user = await authService.register(request);
                    // Register usually returns UserResponse but maybe not auto-login?
                    // UserResponse from register is fine.
                    // We don't auto-set user here unless BE returns token? 
                    // BE Register returns UserResponse (just data), usually need to Verify Email.
                    set({ isLoading: false });
                    // Not setting 'user' because they might need to verify email or login separate.
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
            clearError: () => set({ error: null })
        }),
        {
            name: 'unihome-user-storage',
            partialize: (state) => ({ user: state.user }), // Only persist user object
        }
    )
);
