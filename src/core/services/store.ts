import { configureStore } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { AppState } from './app/types';
import rootEpic from './epics';
import rootReducer from './reducers';

export interface RootState {
  app: AppState;
}

// Create the epic middleware
const epicMiddleware = createEpicMiddleware<Action<any>, Action<any>, RootState>();

// Create the Redux store with the root reducer and apply the middleware
const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  middleware: [epicMiddleware] as any,
  devTools: true,
});

// Run the root epic
epicMiddleware.run(rootEpic);

export default store;
