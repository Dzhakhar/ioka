import { Action } from 'redux';
import { combineEpics, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';

import { RootState } from './store';
import {onCardPaymentCreatedEpic, onOrderCreateEpic, onPaymentStartedEpic} from "./app/epics";

type AppAction = {
  type: string;
};

const rootEpic = (action$: Observable<Action<AppAction>>, state$: StateObservable<RootState>) =>
  combineEpics(
      onOrderCreateEpic,
      onPaymentStartedEpic,
      onCardPaymentCreatedEpic,
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  )(action$ as any, state$, []);

export default rootEpic;
