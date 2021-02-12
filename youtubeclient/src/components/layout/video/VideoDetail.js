import React,{Fragment} from 'react';
import CommentItem from '../comment/CommentItem';
import Spinner from '../Spinner';

const VideoDetail = ({video}) => {
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
            <div className="ui comments">
                <h3 className="ui dividing header">Comments</h3>
                <div className="comment"></div>
            </div>
            <CommentItem />
        </div>

    );
};

export default VideoDetail;