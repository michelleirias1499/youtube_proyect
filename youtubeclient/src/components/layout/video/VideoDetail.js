import React,{Fragment, useEffect, useState} from 'react';
import CommentItem from '../comment/CommentItem';
import Spinner from '../Spinner';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getVideo} from '../../../actions/video';
import {addlike, removelike} from '../../../actions/video';
import axios from 'axios';

const VideoDetail = ({video, getVideo, match, addlike, removelike, auth}) => {
    const [likes, setlikesArray] = useState([]);
    const [likesRender, setlikesRenders] = useState([]);
    useEffect(() => {
        
    },)
    //console.log("video id", video);
    //console.log("wea de likes",likesRender)
    if(!video){
        return <Spinner />;
    }
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    return(
        <div>
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
                <button className="ui red button" onClick={e => addlike(video.id.videoId)}>
                    <i className="heart icon"></i>{''}Likes
                </button>
                <div className="or"></div>
                <button className="ui blue button" onClick={e => removelike(video.id.videoId)}>
                    <i className="thumbs down outline icon"></i>{''}Dislike
                </button>
            </div>
            <div className="ui comments">
                <h3 className="ui dividing header">Comments</h3>
            </div>
            <CommentItem video={video.id.videoId} />
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