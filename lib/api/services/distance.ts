import http from '@/lib/http';
import {
    DistanceResponse
} from '../types';

export const distanceService = {
    getDistanceToWarehouse: async (): Promise<DistanceResponse> => {
        const response = await http.get<DistanceResponse>('/distance/warehouse');
        return response.data;
    }
};
