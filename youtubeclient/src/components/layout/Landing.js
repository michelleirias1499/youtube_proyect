import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './video/SearchBar';
import youtube from '../apis/youtube2';
import VideoList from './video/VideoList';
import VideoDetail from './video/VideoDetail';
import CommentItem from './comment/CommentItem';
import './videoLanding/Recomendvideos.css';

class Landing extends React.Component  {
    state = {videos:[], selectedVideo: null};

    componentDidMount(){
        const {video} = this.props.location.query || {}
        if(video){
            this.setState({selectedVideo: video});
        }else{
            this.onTermSubmit('cute kitties');
        }
        //console.log("que trae props", this.props);
    }

    onTermSubmit = async (term) =>{
        const response= await youtube.get('/search', {
            params:{
                q: term
            }
        });
        
        this.setState({
            videos:response.data.items,
            selectedVideo: response.data.items[0]
        
        })
    };

    onVideoSelect = video => {
        this.setState({selectedVideo: video});
    }
    
    render() {
    return (
        <div>
            <div className="landing">
                <SearchBar onFormSubmit={this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default Landing
