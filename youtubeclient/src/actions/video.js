import axios from 'axios';
import{setAlert} from './alert';
import{GET_VIDEO, VIDEO_ERROR, ADD_VIDEO, ADD_COMMENT, UPDATE_LIKES, HANDLE_LIKE, HANDLE_DISLIKE} from './types';

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
        //console.log('entro!')
        const res=await axios.post('/api/video',{video}, config);
        dispatch({
            type: ADD_VIDEO,
            payload:res.data
        });
       
    } catch (error) {
        //console.log('Este es el error',error);
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
    let commentAdded = false;
    try {
        //console.log('entro!')
        const res=await axios.post(`/api/video/comment/${video}`,formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload:res.data
        });
        dispatch(setAlert('Comment added', 'success'));
        console.log("este es eel res", res,res.status, res.status == 200 )
        if (res && res.status && res.status == 200){
            console.log("comment exitoso")
            commentAdded = true
        } 
        return commentAdded
    } catch (error) {
        //console.log('Este es el error',error);
        dispatch({
            type: VIDEO_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
        dispatch(setAlert('You must have an account to comment', 'danger'));
        return commentAdded;
    }
};
//add likes
export const addlike = (video) => async dispatch => {
    try {
        const res = axios.put(`/api/video/like/${video}`);
        dispatch({
            type: {UPDATE_LIKES},
            payload: {video, likes:res.data}
        });
        dispatch(setAlert('Like added', 'success'))
    } catch (error) {
        dispatch({
            type: VIDEO_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

//Remove likes
export const removelike = (video) => async dispatch => {
    try {
        const res = axios.put(`/api/video/unlike/${video}`);
        dispatch({
            type: {UPDATE_LIKES},
            payload: {video, likes:res.data}
        });
        dispatch(setAlert('Like removed', 'danger'))
    } catch (error) {
        dispatch({
            type: VIDEO_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

