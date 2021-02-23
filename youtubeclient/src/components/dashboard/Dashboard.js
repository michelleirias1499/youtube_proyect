import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/user';
import catcult from '../../img/profilecat.png';

const Dashboard = ({getCurrentProfile, auth:{user}, user:{loading}}) => {
    useEffect(() => {
        getCurrentProfile();
    },[])
    
    return loading && user === null ? <Spinner /> : <Fragment>
        {/* <h1 className="large text-primary">PROFILE</h1> */}
        <p className="lead">
        <div className="ui segment">
            <div className="ui two column very relaxed grid">
                <div className="column">
                    <div className="ui centered card">
                        <div className="image">
                            <img src={user && user.avatar}/>
                        </div>
                        <div className="content">
                            <h2 className="header">{user && user.name}</h2>
                            <div className="description">
                                {user && user.email}
                            </div>
                        </div>
                        <div className="extra content">
                            <i className="fas fa-cat"></i> {user && user.description}
                        </div>
                    </div>
                </div>
                <div className="column">
                    <img src={catcult}
                        style={{width:'400px',height:'430px' ,margin: 'auto', display: 'center'}}
                    ></img>
                </div>
            </div>
            <div class="ui vertical divider"></div>
        </div>

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
