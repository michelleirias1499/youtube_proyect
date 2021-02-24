import React, { Component } from 'react';
import youtube from '../apis/youtube';
import SearchBar from './videoLanding/SearchBar';
import VideoList from './videoLanding/VideoList';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../layout/videoLanding/Recomendvideos.css';

class LandingPrincipal extends React.Component {
    state = {videos:[], selectedVideo: null};

    componentDidMount(){
        this.onMostPopular('');
        this.onTermSubmit('')
    };

    onTermSubmit = async(term) => {
        const response = await youtube.get('/search',{
            params: {
                q: term
            }
        })

        this.setState({
            videos:response.data.items,
            selectedVideo: response.data.items[0]
        
        })
        
    }

    onMostPopular = async () =>{
        const response= await youtube.get('/videos', {
            params:{
                chart: 'mostPopular'
            }
        });
        
        this.setState({
            videos:response.data.items,
            selectedVideo: response.data.items[0]
            
        })
    };

    onVideoSelect = video => {
        this.setState({selectedVideo: video});
        const location = {
            pathname: '/ReproductionPage',
            query: { video: video }
        }
        this.props.history.push(location)
    }

    render() {
        return (
            <div className="landing">
                <div className="ui container">
                    <SearchBar onFormSubmit={this.onTermSubmit}/>
                    <div className="">
                        <div className="">
                            <div className="">
                                <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPrincipal;