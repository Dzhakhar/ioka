import { Action } from 'redux';
import { combineEpics, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';

import { RootState } from './store';
import {onThrottleEpic, onWsConnectEpic, onWsDisconnectEpic, wsConnectEpic} from "./app/epics";

type AppAction = {
  type: string;
};

const rootEpic = (action$: Observable<Action<AppAction>>, state$: StateObservable<RootState>) =>
  combineEpics(
      wsConnectEpic,
      onWsConnectEpic,
      onWsDisconnectEpic,
      onThrottleEpic,
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  )(action$ as any, state$, []);

export default rootEpic;
