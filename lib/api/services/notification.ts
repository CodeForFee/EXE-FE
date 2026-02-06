import http from '@/lib/http';
import {
    Notification,
    NotificationRequest,
    Page
} from '../types';

export const notificationService = {
    getAllUnreadNotifications: async (
        page = 0,
        size = 10,
        sort = 'createdAt',
        direction = 'DESC'
    ): Promise<Page<Notification>> => {
        const response = await http.get<Page<Notification>>('/notifications/unread', {
            params: { page, size, sort, direction }
        });
        return response.data;
    },

    getAllNotifications: async (
        page = 0,
        size = 10,
        sort = 'createdAt',
        direction = 'DESC'
    ): Promise<Page<Notification>> => {
        const response = await http.get<Page<Notification>>('/notifications/latest-unread', {
            params: { page, size, sort, direction }
        });
        return response.data;
    },

    createTestNotification: async (request: NotificationRequest): Promise<Notification> => {
        const response = await http.post<Notification>('/notifications', request);
        return response.data;
    },

    markRead: async (id: string): Promise<void> => {
        await http.post<void>('/notifications/read', {}, { params: { id } });
    }
};
