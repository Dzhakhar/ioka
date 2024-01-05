import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppSliceActions, AppState, OrderBook} from './types';

export const appSlice = createSlice<AppState, AppSliceActions>({
  name: 'app',
  initialState: {
    ws: undefined,
    orderBooks: [],
    currentSymbol: 'BTC',
    throttleTime: 0,
  },
  reducers: {
    init(state: AppState) {
      return state;
    },
    startWsConnection(state: AppState) {
      return state;
    },
    wsConnectError(state: AppState) {
      return {
        ...state,
        wsError: 'Failed to connect to wss',
      };
    },
    setWsConnected(state: AppState, action: PayloadAction<WebSocket>) {
      return {
        ...state,
        wsError: undefined,
        ws: action.payload,
      }
    },
    abortWsConnection(state: AppState) {
      state.ws?.close();

      return {
        ...state,
        ws: undefined,
      }
    },
    addOrderBook(state: AppState, action: PayloadAction<OrderBook>) {
      return {
        ...state,
        orderBooks: [action.payload, ...state.orderBooks].slice(0, 20),
      };
    },
    toggleThrottle(state: AppState) {
      return {
        ...state,
        throttleTime: state.throttleTime === 0 ? 5000 : 0,
      }
    },
  },
});
