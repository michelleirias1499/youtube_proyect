import {
    GET_VIDEO,
    VIDEO_ERROR,
    ADD_VIDEO,
    ADD_COMMENT,
    UPDATE_LIKES,
    HANDLE_LIKE,
    HANDLE_DISLIKE
}from '../actions/types';

const initialState ={
    videos:[],
    video: null,
    loading: true,
    error:{},
    likes: 0,
    dislikes: 0,
    active: null
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_VIDEO:
            return{
                ...state,
                videos: payload,
                loading: false
            };
        case ADD_VIDEO:
            return{
                ...state,
                videos: [...state.videos, payload],
                loading: false
            };
        case VIDEO_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            };
        case ADD_COMMENT:
            return{
                ...state,
                video: {...state.video, comments: payload},
                loading: false
            }
        case UPDATE_LIKES:
            return{
                ...state,
                videos: state.videos.map(video => video === payload.id ? {...video, likes: payload.likes}: video), 
                loading: false
            }
        case HANDLE_LIKE:
            return{
                ...state,
                likes: state.likes + 1,
                dislikes: state.active === "dislike" ? state.dislikes - 1 : state.dislikes,
                active: "like"
            }
        case HANDLE_DISLIKE:
            return {
                ...state,
                likes: state.active === "like" ? state.likes - 1 : state.likes,
                active: "dislike",
                dislikes: state.dislikes + 1
            }
        default: return state;
    }
}

