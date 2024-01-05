import {PayloadAction} from "@reduxjs/toolkit";

export type OrderBook = {
  count: number;
  price: number;
  amount: number;
}

export interface AppState {
  ws?: WebSocket;
  wsError?: string;

  orderBooks: OrderBook[];
  currentSymbol: string;
  throttleTime: number;
}

export type AppSliceActions = {
  init: (state: AppState) => AppState;
  startWsConnection: (state: AppState) => AppState;
  wsConnectError: (state: AppState) => AppState;
  setWsConnected: (state: AppState, action: PayloadAction<WebSocket>) => AppState;
  addOrderBook: (state: AppState, action: PayloadAction<OrderBook>) => AppState;
  abortWsConnection: (state: AppState) => AppState;
  toggleThrottle: (state: AppState) => AppState;
};
