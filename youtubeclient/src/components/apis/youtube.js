import axios from 'axios';
const KEY = 'AIzaSyBGxuUb6J72uqr5EWVRnoz-NLEPgoDTEfs';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 6,
        key: KEY
    }
});