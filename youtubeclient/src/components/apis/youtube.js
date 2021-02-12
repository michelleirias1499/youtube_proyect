import axios from 'axios';
const KEY = 'AIzaSyBInCrzrybXap75TSOCGJ7T4MUPmVxPYqw';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
});