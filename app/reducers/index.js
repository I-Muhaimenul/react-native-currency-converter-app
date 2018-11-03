//reducers is similer to vuex mutation
import { combineReducers } from 'redux';

import currencies from './currencies';
import themes from './themes';

export default combineReducers({
    currencies,
    themes
});