import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './adapters/reducers';
export default function configureStore(preloadedState) {
    return createStore(
      rootReducer,
      preloadedState,
      compose(
        applyMiddleware(
          ...[thunk,logger]
        ),
      ),
    );
}