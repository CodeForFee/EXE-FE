import http from '@/lib/http';
import {
    Page,
    ChatRoom,
    ChatRoomResponse,
    ChatMessage,
    ChatMessageResponse
} from '../types';

export const chatService = {
    getAllChatRooms: async (): Promise<ChatRoom[]> => {
        const response = await http.get<ChatRoom[]>('/chat/rooms');
        return response.data;
    },

    getChatMessages: async (roomId: string, params?: { page?: number; size?: number; sort?: string }): Promise<Page<ChatMessage>> => {
        const response = await http.get<Page<ChatMessage>>(`/chat/rooms/${roomId}/messages`, { params });
        return response.data;
    },

    loadMessages: async (roomId: string, params?: { before?: string; limit?: number }): Promise<ChatMessageResponse[]> => {
        const response = await http.get<ChatMessageResponse[]>(`/chat/rooms/${roomId}/load-messages`, { params });
        return response.data;
    },

    getOrCreateChatRoom: async (userAId: string): Promise<ChatRoomResponse> => {
        const response = await http.post<ChatRoomResponse>('/chatroom', {}, {
            params: { userAId }
        });
        return response.data;
    }
};
