import React, {useState} from 'react';
import {connect} from 'react-redux';
import {postvideo} from '../../../actions/video';
import PropTypes from 'prop-types';
import { stringify } from 'uuid';
import {commentVideo} from '../../../actions/video';

const CommentItem = ({postvideo, video, commentVideo, videoId}) => {
    const [text, setText] = useState('');
    console.log("test", video);
    return (
        <div>
            <div className="comment">
                <div class="text">
                    How artistic!
                </div>
            </div>
            <form className="ui reply form" onSubmit={e=> {
                e.preventDefault();
                postvideo(video);
                console.log("el id del video en bd",video);
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
