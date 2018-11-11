//similer to vuex store
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
//just for testing and logging purpose
const middleware = [sagaMiddleware];
if(process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
//flow
//create action
//dispatch action from where need (onPress method)
//make reducer (state or data formet + return of each action)
//bind reducer and action in component