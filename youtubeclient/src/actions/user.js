import axios from 'axios';
import {setAlert} from './alert';
import{
    GET_USER,
    USER_ERROR
}from './types';

//Get current users profile

export const getCurrentProfile =() => async dispatch =>{
    try {
        const res = await axios.get('/api/users/me');
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};