import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import comment from './comment';

export default combineReducers({
    alert, 
    auth,
    user,
    comment
});