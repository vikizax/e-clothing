import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';

import { persistStore } from 'redux-persist';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';

// since using saga no need for thunk
// import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

// const middlewares = [thunk];

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };