import { Action } from 'redux';
import { Epic, ofType } from 'redux-observable';
import {delay, from, map, mergeMap} from 'rxjs';

import { RootState } from '../store';
import { appSlice } from './state';
import {PayloadAction} from "@reduxjs/toolkit";
import {createOrderRequest, CreateOrderResponse} from "../../http/createOrderRequest";
import {CardData, CreateOrderPayload} from "./types";
import {getOrderByIdRequest, GetOrderResponse} from "../../http/getOrderByIdRequest";
import {createCardPaymentRequest, CreateCardPaymentResponse} from "../../http/createCardPaymentRequest";

export const onOrderCreateEpic: Epic<Action<string>, Action<string>, RootState> = (action$) => {
    return action$.pipe(
        ofType(appSlice.actions.createOrder.type),
        mergeMap((action: PayloadAction<CreateOrderPayload>) => {
            return from(
                createOrderRequest(action.payload)
            ).pipe(
                map((response: CreateOrderResponse) => {
                    return appSlice.actions.setOrderId(response.order.id);
                })
            );
        })
    );
}

export const onPaymentStartedEpic: Epic<Action<string>, Action<string>, RootState> = (action$) => {
    return action$.pipe(
        ofType(appSlice.actions.setOrderId.type),
        delay(3 * 1000),
        mergeMap((action: PayloadAction<string>) => {
            return from(
                getOrderByIdRequest(action.payload),
            ).pipe(
                map((response: GetOrderResponse) => {
                    return appSlice.actions.setOrder(response);
                }),
            );
        }),
    );
}

export const onCardPaymentCreatedEpic: Epic<Action<string>, Action<string>, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(appSlice.actions.createCardPayment.type),
        delay(3 * 1000),
        mergeMap((action: PayloadAction<CardData>) => {
            return from(
                createCardPaymentRequest(state$.value.app.orderId, action.payload),
            ).pipe(
                map((response: CreateCardPaymentResponse) => {
                    return appSlice.actions.setPaymentResult(response.status);
                }),
            );
        }),
    );
}
