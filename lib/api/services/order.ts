import http from '@/lib/http';
import {
    Page,
    OrderResponse,
    CreateOrderRequest,
    UpdateOrderStatusRequest,
    OrderStatus
} from '../types';

export const orderService = {
    placeOrder: async (data: CreateOrderRequest): Promise<OrderResponse> => {
        const response = await http.post<OrderResponse>('/orders', data);
        return response.data;
    },

    getMyOrders: async (params?: { page?: number; size?: number; status?: OrderStatus }): Promise<Page<OrderResponse>> => {
        const response = await http.get<Page<OrderResponse>>('/orders/me', { params });
        return response.data;
    },

    getOrder: async (orderId: string): Promise<OrderResponse> => {
        const response = await http.get<OrderResponse>(`/orders/${orderId}`);
        return response.data;
    },

    getOrdersForAdmin: async (params?: { page?: number; size?: number; status?: OrderStatus; userId?: string }): Promise<Page<OrderResponse>> => {
        const response = await http.get<Page<OrderResponse>>('/admin/orders', { params });
        return response.data;
    },

    updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<OrderResponse> => {
        const data: UpdateOrderStatusRequest = { status };
        const response = await http.patch<OrderResponse>(`/orders/${orderId}/status`, data);
        return response.data;
    },

    cancelOrder: async (orderId: string): Promise<OrderResponse> => {
        const response = await http.delete<OrderResponse>(`/orders/${orderId}`);
        return response.data;
    }
};
