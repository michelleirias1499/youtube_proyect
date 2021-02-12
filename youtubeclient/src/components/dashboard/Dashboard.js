import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/user';

const Dashboard = ({getCurrentProfile, auth, user:{user,loading}}) => {
    useEffect(() => {
        getCurrentProfile();
    },[])
    
    return loading && user === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">PROFILE</h1>
        <p className="lead">
        <i className="fas fa-cat"></i> Welcome {user && user.name}
        </p>
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)
