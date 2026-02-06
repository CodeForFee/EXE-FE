import { create } from 'zustand';
import { Notification } from '../api/types';
import { notificationService } from '../api/services/notification';

interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;

    fetchNotifications: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,

    fetchNotifications: async () => {
        set({ isLoading: true });
        try {
            const data = await notificationService.getAllUnreadNotifications();
            set({
                notifications: data.content,
                unreadCount: data.totalElements,
                isLoading: false
            });
        } catch (error) {
            set({ isLoading: false });
        }
    },

    markAsRead: async (id: string) => {
        try {
            await notificationService.markRead(id);
            // Optimistic update
            const { notifications, unreadCount } = get();
            set({
                notifications: notifications.filter(n => n.id !== id),
                unreadCount: Math.max(0, unreadCount - 1)
            });
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    }
}));
