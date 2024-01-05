import { combineReducers } from 'redux';

import { appSlice } from './app/state';

const rootReducer = combineReducers({
  app: appSlice.reducer,
});

export default rootReducer;
