import React, { Component } from 'react';
import VideoItem from './VideoItem';
import './Recomendvideos.css'

const VideoList = ({videos, onVideoSelect}) => {
    const renderedList= videos.map(video => {
        return <VideoItem key={video.id.video} onVideoSelect={onVideoSelect} video={video} />
    });

    //props.videos
    return (<div className="VideosGrid">{renderedList}</div>)
}

export default VideoList;
