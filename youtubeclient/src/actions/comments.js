import axios from 'axios';
import {setAlert} from './alert';
import{
    GET_COMMENT,
    COMMENT_ERROR
}from './types';

//GET POSTS
export const getComment = () => async dispatch =>{
    try {
        const res = await axios.get('/api/comments');

        dispatch({
            type: GET_COMMENT, 
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        });
    }
}