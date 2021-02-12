import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getComment} from '../../actions/comments';
import Spinner from '../layout/Spinner';

const Comments = ({getComment, comment:{comments, loading}}) => {
    useEffect(()=>{
        getComment();
    },[getComment]);
    return (
        <div>
            
        </div>
    )
}

Comments.propTypes = {
    getComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    comment: state.comment
})

export default connect(mapStateToProps, {getComment})(Comments)
