import React,{Fragment} from 'react';
import CommentItem from '../comment/CommentItem';
import Spinner from '../Spinner';
import {addlike, removelike} from '../../../actions/video';
import {connect} from 'react-redux';
const VideoDetail = ({video}) => {
    if(!video){
        return <Spinner />;
    }
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    return(
        <div className="">
            <div className="ui embed">
                <iframe title="video player" src={videoSrc}/>
            </div>
            <div className="ui segment">
                <h4 className="ui header">
                    {video.snippet.title}
                </h4>
                <p>{video.snippet.description}</p>
            </div>
        </div>

    );
};



export default connect()(VideoDetail);