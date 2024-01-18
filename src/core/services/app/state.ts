import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppSliceActions, AppState, Order, OrderStatus} from './types';

export const appSlice = createSlice<AppState, AppSliceActions>({
  name: 'app',
  initialState: {
    currentOrderId: '',
    isOrderCreateInProgress: false,
    isPaymentCreateInProgress: false,

    orderId: '',
    order: undefined,
    paymentResult: undefined,
  },
  reducers: {
    init(state: AppState) {
      return state;
    },
    createOrder(state: AppState) {
      return {
        ...state,
        isOrderCreateInProgress: true,
      };
    },
    setOrderId(state: AppState, action: PayloadAction<string>) {
      return {
        ...state,
        orderId: action.payload,
        isOrderCreateInProgress: false,
      };
    },
    setOrder(state: AppState, action: PayloadAction<Order>) {
      return {
        ...state,
        order: action.payload,
      }
    },
    createCardPayment(state: AppState) {
      return {
        ...state,
        isPaymentCreateInProgress: true,
      };
    },
    setPaymentResult(state: AppState, action: PayloadAction<OrderStatus>) {
      return {
        ...state,
        isPaymentCreateInProgress: false,
        paymentResult: action.payload,
      };
    },
  },
});
