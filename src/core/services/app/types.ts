import {PayloadAction} from '@reduxjs/toolkit';

export type Order = {
  id: string;
  status: OrderStatus;
  amount: number;
  currency: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  REQUIRES_ACTION = 'REQUIRES_ACTION',
  APPROVED = 'APPROVED',
  CAPTURED = 'CAPTURED',
  CANCELLED = 'CANCELLED',
  DECLINED = 'DECLINED'
}

export type CardData = {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  save: boolean;
}

export interface AppState {
  currentOrderId: string;
  isOrderCreateInProgress: boolean;
  isPaymentCreateInProgress: boolean;
  orderId: string;

  paymentResult?: OrderStatus;
  order?: Order;
}

export type CreateOrderPayload = {
  amount: number;
  currency: string;
  captureMethod: string;
}

export type AppSliceActions = {
  init: (state: AppState) => AppState;
  createOrder: (state: AppState, action: PayloadAction<CreateOrderPayload>) => AppState;
  setOrderId: (state: AppState, action: PayloadAction<string>) => AppState;
  setOrder: (state: AppState, action: PayloadAction<Order>) => AppState;
  createCardPayment: (state: AppState, action: PayloadAction<CardData>) => AppState;
  setPaymentResult: (state: AppState, action: PayloadAction<OrderStatus>) => AppState;
};
