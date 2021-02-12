import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './video/SearchBar';
import youtube from '../apis/youtube';
import VideoList from './video/VideoList';
import VideoDetail from './video/VideoDetail';

class Landing extends React.Component  {
    state = {videos:[], selectedVideo: null};

    componentDidMount(){
        this.onTermSubmit('random');
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
        <div className="landing">
            <div className="ui container">
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
