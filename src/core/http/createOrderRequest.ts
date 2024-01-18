import {CreateOrderPayload} from "../services/app/types";
import http from './axios-config';

export type CreateOrderResponse = {
    order: {
        id: string;
        status: string;
    }
}

export const createOrderRequest = async ({amount, currency, captureMethod}: CreateOrderPayload): Promise<CreateOrderResponse> => {
    const response = await http.post<CreateOrderResponse>(`${import.meta.env.VITE_API_URL}/v2/orders`, {
        amount,
        currency,
        capture_method: captureMethod,
    });

    return response.data;
}