import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'seller' | 'admin';
}

interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'unihome-user-storage',
        }
    )
);
