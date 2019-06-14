import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createRootReducer } from './store';
import { loadState } from './helpers/localStorageHelper';

const persistedState = loadState();

export const store = createStore(createRootReducer(), persistedState as any, composeWithDevTools({})());

store.subscribe(() => {
  // TODO: enable store saving in production
  // saveState(store.getState());
});