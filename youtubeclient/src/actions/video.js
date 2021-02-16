import axios from 'axios';
import{setAlert} from './alert';
import{GET_VIDEO, VIDEO_ERROR, ADD_VIDEO, ADD_COMMENT} from './types';

//Get video by id
export const getVideo = () => async dispatch => {
    try {
        const res = axios.get('/api/video/:id');
        dispatch({
            type: GET_VIDEO,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: VIDEO_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

export const postvideo = (video) => async dispatch => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        console.log('entro!')
        const res=await axios.post('/api/video',{video}, config);
        dispatch({
            type: ADD_VIDEO,
            payload:res.data
        });
       
    } catch (error) {
        console.log('Este es el error',error);
        dispatch({
            type: VIDEO_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

export const commentVideo = (video, formData) => async dispatch => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        console.log('entro!')
        const res=await axios.post(`/api/video/comment/${video}`,formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload:res.data
        });
        dispatch(setAlert('Comment added', 'success'))
        console.log('el es res', res);
    } catch (error) {
        console.log('Este es el error',error);
        dispatch({
            type: VIDEO_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
        dispatch(setAlert('You must have an account to comment', 'danger'));
    }
};
//add likes
export const addlike = (video) => async dispatch => {
    try {
        const res = axios.put('/api/video/:id');
        dispatch({
            type: GET_VIDEO,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: VIDEO_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

