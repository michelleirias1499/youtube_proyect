import axios from 'axios';
import{setAlert} from './alert';
import{GET_VIDEO, VIDEO_ERROR, ADD_VIDEO} from './types';

//Get video by id
export const getVideos = () => async dispatch => {
    try {
        const res = axios.get('/api/video');
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
        console.log('el es res', res);
    } catch (error) {
        console.log('Este es el error',error);
        dispatch({
            type: VIDEO_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

