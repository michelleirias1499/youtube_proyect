import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {postvideo} from '../../../actions/video';
import PropTypes from 'prop-types';
import { stringify } from 'uuid';
import {commentVideo} from '../../../actions/video';
import SingleComment from '../comment/SingleComment';
import axios from 'axios';
import './comments.css';

const CommentItem = ({postvideo, video, commentVideo, videoId}) => {
    const [text, setText] = useState('');
    const [comments, setcommentsArray] = useState([]);
    const [commentsRender, setcommentsRenders] = useState([]);    
    const [newCommentAdded, setNewComment] = useState(false);
    //console.log("test", video); 

    useEffect(() => {
        getAllComments(video)
    }, [video]);

    useEffect(() => {
        if (newCommentAdded){
            getAllComments(video)
            setNewComment(false)
        }
    }, [newCommentAdded])

    useEffect(() => {
        var mainCommentArray = comments[0] || []
        var nextLevelComments = mainCommentArray.comments || []
        var commentItems = []
        nextLevelComments.map((commentInfo)=>{
            let {avatar,text,name} = commentInfo 
            //console.log("datos del comment", avatar,text,name)
            commentItems.push(
                <div className="coment-box">
                    <div className="avatar">
                        <img className="ui avatar image" src={avatar}/>
                        <div className="content">
                            <div className="ui sub header">{name} says:</div>
                        </div>
                    </div>
                    <div>{text}</div>
                </div>
            );
        })
        setcommentsRenders(commentItems);
        
    }, [comments]);

    
    const getAllComments= async(videoId)=>{
        const allcomments = await axios.get(`/api/video/${videoId}`);
        const commentsArray = allcomments.data||[];
        setcommentsArray(commentsArray);
        console.log("entro en allcoments", videoId, commentsArray);
        //console.log("coments", comments);
    }

    const onCommentSubmitted = async () => {
        postvideo(video);
        let videoComment = await commentVideo(video,{text});
        setText('');
        console.log("ON COMMENT SUBMITTED", videoComment)
        if (videoComment){
            setNewComment(true)
        }
    }

    return (
        <div>
            <div className="ui comments">
                {commentsRender}
            </div>
            <form className="ui reply form" onSubmit={e=> {
                e.preventDefault();
                onCommentSubmitted();
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
