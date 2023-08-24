import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import LayoutReducer, { ILayoutState } from './Reducers/Layout/Layout';

export interface IAppState {
  layout: ILayoutState;
}

const reducers = combineReducers({
  layout: LayoutReducer
});

const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
  reducer: reducers,
  middleware: () => [ sagaMiddleware ]
});

export default Store;
