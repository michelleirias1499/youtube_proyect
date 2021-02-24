import React,{Fragment, useEffect, useState, useReducer} from 'react';
import CommentItem from '../comment/CommentItem';
import Spinner from '../Spinner';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getVideo} from '../../../actions/video';
import {addlike, removelike} from '../../../actions/video';
import axios from 'axios';
import './video.css';
import '../comment/comments.css'

const HANDLE_LIKE = Symbol("HANDLE_LIKE");
const HANDLE_DISLIKE = Symbol("HANDLE_DISLIKE");
const initialState = {
  likes: 0,
  dislikes: 0,
  active: null
};

const reducer = (state, action) => {
    const { likes, dislikes, active } = state;
  
    switch (action.type) {
      case HANDLE_LIKE:
        return {
          ...state,
          likes: state.likes + 1,
          dislikes: active === "dislike" ? dislikes - 1 : dislikes,
          active: "like"
        };
      case HANDLE_DISLIKE:
        return {
          ...state,
          likes: active === "like" ? likes - 1 : likes,
          active: "dislike",
          dislikes: dislikes + 1
        };
      default:
        return state;
    }
  };

const VideoDetail = ({video, getVideo, match, addlike, removelike, auth}) => {
    const [likesRender, setlikesRenders] = useState([]);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {likes, dislikes, active} = state;

    function getlikes(){
        return active !== "like" ? dispatch({ type: HANDLE_LIKE }) : null
    }
    function getdislike(){
        return active !== "dislike" ? dispatch({ type: HANDLE_DISLIKE }) : null
    }
    useEffect(() => {
        
    },)

    if(!video){
        return <Spinner />;
    }
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    return(
        <div className="video-box">
            <div className="ui embed">
                <iframe title="video player" src={videoSrc}/>
            </div>
            <div className="ui segment">
                <h4 className="ui header">
                    {video.snippet.title}
                </h4>
                <p>{video.snippet.description}</p>
            </div>
            <div className="ui buttons">
                <button className="ui red button" onClick={e => {addlike(video.id.videoId); getlikes()}}>
                    <i className="heart icon"></i> {likes}Likes
                </button>
                <div className="or"></div>
                <button className="ui blue button" onClick={e => {removelike(video.id.videoId); getdislike()}}>
                    <i className="thumbs down outline icon"></i>{dislikes}Dislike
                </button>
            </div>
            <div className="ui comments coment-form">
                <h3 className="ui dividing header">Comments</h3>
                <CommentItem video={video.id.videoId} />
            </div>
            
        </div>
        
    );
};

const mapStateToProps = state => ({
    auth: state.auth
})

VideoDetail.propTypes = {
    getVideo: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    video: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {getVideo, addlike, removelike})(VideoDetail)