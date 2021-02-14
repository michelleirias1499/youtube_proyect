import {
    GET_VIDEO,
    VIDEO_ERROR,
    ADD_VIDEO
}from '../actions/types';

const initialState ={
    videos:[],
    video: null,
    loading: true,
    error:{}
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_VIDEO:
            return{
                ...state,
                posts: payload,
                loading: false
            };
        case ADD_VIDEO:
            return{
                ...state,
                posts: [...state.videos, payload],
                loading: false
            };
        case VIDEO_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            };
        default: return state;
    }
}
