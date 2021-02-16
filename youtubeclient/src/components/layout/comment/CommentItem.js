import React, {useState} from 'react';
import {connect} from 'react-redux';
import {postvideo} from '../../../actions/video';
import PropTypes from 'prop-types';
import { stringify } from 'uuid';
import {commentVideo} from '../../../actions/video';
import SingleComment from '../comment/SingleComment';
import axios from 'axios';

// class CommentItem extends React.Component  {
//     //state = {videos:[], selectedVideo: null};

//     constructor (props) {
//         super(props);
//         this.state={videoId:'', comments:[]}
//     }

//     componentDidMount(){
//         //Aqui tengo que traer los comments del video
//         const videoId = this.props.video;
//         this.getAllComments(videoId);
//     }

//     componentWillUpdate(){
//         //Aqui tengo que traer los comments del video
//         console.log("update estado", this.state.comments);
//     }

//     async getAllComments(videoId){
//         const allcomments = await axios.get(`/api/video/${videoId}`);
//         const commentsArray = allcomments.data||[];
//         this.setState({comments: commentsArray});
//         console.log("estado", this.state.comments);
//     }
    
//     render() {
//         const allComments = this.state.comments;
//         const oneComment =[];
//         allComments.map((comment) =>{

//         })
//     return (
//         <div>Hola</div>
//     )}
// }

// export default CommentItem

const CommentItem = ({postvideo, video, commentVideo, videoId}) => {
    const [text, setText] = useState('');
    const [comments, setcommentsArray] = useState([]);
    console.log("test", video);
    // const getAllComments= async(videoId)=>{
    //     const allcomments = await axios.get(`/api/video/${videoId}`);
    //     const commentsArray = allcomments.data||[];
    //     setcommentsArray(commentsArray);
    //     console.log("estado", this.state.comments);
    //     console.log("coments", comments);
    // }
    return (
        <div>
            <div className="comment">
                Hola
            </div>
            <form className="ui reply form" onSubmit={e=> {
                e.preventDefault();
                postvideo(video);
                commentVideo(video,{text});
                setText('');
            }}>
                <div className="field">
                    <textarea placeholder="Comment here" value={text} onChange={e=> setText(e.target.value)}></textarea>
                </div>
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    )
};

CommentItem.propTypes ={
    postvideo: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
    commentVideo: PropTypes.func.isRequired,
}

export default connect(null, {postvideo, commentVideo})(CommentItem);
