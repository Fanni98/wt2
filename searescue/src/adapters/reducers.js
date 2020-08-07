import { combineReducers } from 'redux';

import user from './user/reducer';
import todo from './todo/reducer';

export default combineReducers({
    user, todo
});