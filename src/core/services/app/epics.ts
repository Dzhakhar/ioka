import { Action } from 'redux';
import { Epic, ofType } from 'redux-observable';
import {catchError, EMPTY, fromEvent, map, mergeMap, of, switchMap, take, throttleTime as slowDown} from 'rxjs';

import { RootState } from '../store';
import { appSlice } from './state';
import {PayloadAction} from "@reduxjs/toolkit";
import {getThrottleTime} from "./selectors";


export const onWsConnectEpic: Epic<Action<string>, Action<string>, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(appSlice.actions.setWsConnected.type),
        mergeMap((action: PayloadAction<WebSocket>) => {
            const wsMessage = fromEvent<MessageEvent<string>>(action.payload, 'message');
            const mergeMapHandler = (event: MessageEvent<string>) => {
                const data: [number, [number, number, number]] = JSON.parse(event.data);

                if (!data || typeof data[0] === 'undefined' || typeof data[1] === undefined) {
                    return EMPTY;
                }

                return [
                    appSlice.actions.addOrderBook({
                        price: data[1][0],
                        count: data[1][1],
                        amount: data[1][2],
                    })
                ];
            };

            const throttleTime = getThrottleTime(state$.value);

            return throttleTime > 0 ? wsMessage.pipe(
                slowDown(state$.value.app.throttleTime),
                mergeMap(mergeMapHandler),
            ) : wsMessage.pipe(
                mergeMap(mergeMapHandler),
            );
        })
    );
}



export const onThrottleEpic: Epic<Action<string>, Action<string>, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(appSlice.actions.toggleThrottle.type),
        map(() => {
            const {ws} = state$.value.app;
            ws?.close();

            return appSlice.actions.startWsConnection();
        })
    );
}
export const onWsDisconnectEpic: Epic<Action<string>, Action<string>, RootState> = (action$) => {
    return action$.pipe(
        ofType(appSlice.actions.setWsConnected.type),
        mergeMap((action: PayloadAction<WebSocket>) => {
            const wsMessage = fromEvent<MessageEvent<string>>(action.payload, 'close');

            return wsMessage.pipe(
                map(() => {
                    return appSlice.actions.abortWsConnection();
                }),
            );
        })
    );
}

export const wsConnectEpic: Epic<Action<string>, Action<string>, RootState> = (action$) => {
    return action$.pipe(
        ofType(appSlice.actions.startWsConnection.type),
        switchMap(() => {
            const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

            return fromEvent(ws, 'open').pipe(
                take(1),
                map(() => {
                    // subscribing
                    ws.send(JSON.stringify({
                        event: 'subscribe',
                        channel: 'book',
                        symbol: 'tBTCUSD',
                    }));

                    return appSlice.actions.setWsConnected(ws);
                }),
                catchError((error) => of(appSlice.actions.wsConnectError(error)))
            );
        })
    );
};
