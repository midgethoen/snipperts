import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from '../../container/DevTools/DevTools';
import * as reducers from '../reducers';

const rootReducer = combineReducers(reducers);

export function configureStore(initialState = {}) {
  let finalCreateStore;

  if (process.env.CLIENT) {
    finalCreateStore = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(thunk)(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
