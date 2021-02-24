import React from 'react';
import './VideoItem.css';
import{ADD_VIDEO, VIDEO_ERROR} from '../../../actions/types';
import axios from 'axios';

const VideoItem = ({video, onVideoSelect}) => {
    
    return (
        <div onClick={()=> {onVideoSelect(video)}} className="video-card">
            <div className="video-info">
                <img 
                    className="video-image" 
                    alt={video.snippet.title} 
                    src={video.snippet.thumbnails.medium.url}
                />
                {/* <div className="video-content">
                    <div className="video-header">
                        {video.snippet.title}
                    </div>
                </div> */}
                <div className="video-title">
                    {video.snippet.title}
                </div>
            </div>

        </div>
    );
};

export default VideoItem;
