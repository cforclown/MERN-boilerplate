import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import LayoutReducer, { ILayoutState } from './Reducers/Layout/Layout';
import AlertDialogReducer, { IAlertDialogState } from './Reducers/AlertDialog/AlertDialog';

export interface IAppState {
  layout: ILayoutState;
  alertDialog: IAlertDialogState;
}

const reducers = combineReducers({
  layout: LayoutReducer,
  alertDialog: AlertDialogReducer
});

const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
  reducer: reducers,
  middleware: () => [ sagaMiddleware ]
});

export default Store;
