import http from './axios-config';
import {Order} from "../services/app/types";

export type GetOrderResponse = Order;

export const getOrderByIdRequest = async (orderId: string): Promise<GetOrderResponse> => {
    const response = await http.get<GetOrderResponse>(`${import.meta.env.VITE_API_URL}/v2/orders/${orderId}`);

    return response.data;
}