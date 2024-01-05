import { createSelector, Selector } from '@reduxjs/toolkit';
import {RootState} from "../store";
import {OrderBook} from "./types";

const selectSelf = (state: RootState) => state;

export const isWsConnected: Selector<RootState, boolean> = createSelector(selectSelf, (state: RootState) => {
    return Boolean(state.app.ws);
});

export const getThrottleTime: Selector<RootState, number> = createSelector(selectSelf, (state: RootState) => {
    return state.app.throttleTime;
});
export const getOrderBooks: Selector<RootState, OrderBook[]> = createSelector(selectSelf, (state: RootState) => {
    return state.app.orderBooks;
});
export const getCurrentSymbol: Selector<RootState, string> = createSelector(selectSelf, (state: RootState) => {
    return state.app.currentSymbol;
});