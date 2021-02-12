import React from 'react'

const CommentItem = () => {
    return (
        <div>
            <form class="ui reply form">
                <div class="field">
                <textarea></textarea>
                </div>
                <div class="ui blue labeled submit icon button">
                <i class="icon edit"></i> Add Reply
                </div>
            </form>
        </div>
    )
};

export default CommentItem;
