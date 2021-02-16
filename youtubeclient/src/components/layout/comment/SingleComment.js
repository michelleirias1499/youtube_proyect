import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const SingleComment = ({
    video,
    comment: {
        _id, text, name, avatar, user, date
    }, 
    auth
}) => {
    return (
        <div>
            
        </div>
    )
}

SingleComment.propTypes = {
    video:PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(SingleComment)
