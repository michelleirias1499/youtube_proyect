import React,{Fragment, useEffect} from 'react';
import CommentItem from '../comment/CommentItem';
import Spinner from '../Spinner';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getVideo} from '../../../actions/video';


const VideoDetail = ({video, getVideo, match}) => {
    useEffect(() => {
        //getVideo(match.params.id);
    }, [getVideo])
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
            </div>
            <CommentItem video={video.id.videoId} />
        </div>
        
    );
};

VideoDetail.propTypes = {
    getVideo: PropTypes.func.isRequired
}

export default connect(null, {getVideo})(VideoDetail)