import React, {useState} from 'react';
import {connect} from 'react-redux';
import {postvideo} from '../../../actions/video';
import PropTypes from 'prop-types';
import { stringify } from 'uuid';

const CommentItem = ({postvideo, video}) => {
    const [text, setText] = useState('');
    console.log("test", video);
    return (
        <div>
            <div className="comment"></div>
            <form className="ui reply form" onSubmit={e=> {
                e.preventDefault();
                setText('');
                postvideo(video);
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
}

export default connect(null, {postvideo})(CommentItem);
