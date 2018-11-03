//similer to vuex store
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducers from '../reducers';

//just for testing and logging purpose
const middleware = [];
if(process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

export default createStore(reducers, applyMiddleware(...middleware));


//flow
//create action
//dispatch action from where need (onPress method)
//make reducer (state or data formet + return of each action)
//bind reducer and action in component