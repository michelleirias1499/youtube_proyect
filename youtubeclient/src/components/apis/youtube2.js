import axios from 'axios';
const KEY = 'AIzaSyCOjIgVfFH2KZyql-FMDkvANvU9s7xifn0';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 6,
        key: KEY
    }
});