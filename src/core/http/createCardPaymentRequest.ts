import {CardData, OrderStatus} from "../services/app/types";
import http from './axios-config';

export type CreateCardPaymentResponse = {
    status: OrderStatus;
}

export const createCardPaymentRequest = async (
    orderId: string,
    {
        cvc,
        number,
        name,
        save,
        expiry
    }: CardData): Promise<CreateCardPaymentResponse> => {
    const response = await http.post<CreateCardPaymentResponse>(`${import.meta.env.VITE_API_URL}/v2/orders/${orderId}/payments/card`, {
        pan: number,
        exp: expiry,
        holder: name,
        cvc,
        save,
    });

    return response.data;
}