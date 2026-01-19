import { apiClient } from '../client';
import {
    ApiResponse,
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
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            sort,
            direction
        });
        const response = await apiClient.get<ApiResponse<Page<Notification>>>(`/notifications/unread?${params.toString()}`);
        return response.data.data;
    },

    getAllNotifications: async (
        page = 0,
        size = 10,
        sort = 'createdAt',
        direction = 'DESC'
    ): Promise<Page<Notification>> => {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            sort,
            direction
        });
        const response = await apiClient.get<ApiResponse<Page<Notification>>>(`/notifications/latest-unread?${params.toString()}`);
        return response.data.data;
    },

    createTestNotification: async (request: NotificationRequest): Promise<Notification> => {
        const response = await apiClient.post<ApiResponse<Notification>>('/notifications', request);
        return response.data.data;
    },

    markRead: async (id: string): Promise<void> => {
        await apiClient.post<ApiResponse<void>>(`/notifications/read?id=${id}`);
    }
};
