import { InjectionToken } from '@angular/core';
import {
  createStore,
  Store,
  compose,
  StoreEnhancer,
  applyMiddleware,
  Middleware
} from 'redux';

import {
  AppState,
  default as reducer
} from './app.reducer';

import logger from 'redux-logger';
import {loadState} from './reducers/localStorage';

export const AppStore = new InjectionToken('App.store');




export function createAppStore() {

  const persistedState = loadState();
  const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(logger),
   )
  return store;
}

export const appStoreProviders = [
   { provide: AppStore, useFactory: createAppStore }
];
