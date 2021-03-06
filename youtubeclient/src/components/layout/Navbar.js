import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import iconyoutube from '../../img/iconyoutube.svg'

export const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks =(
        <ul>
            <li><Link to="/dashboard">
            <i className="fas fa-chalkboard-teacher"></i>{' '}
            <span className="hide-sm"></span>
                Dashboard</Link></li>
            <li>
                <a onClick={logout} href='/login'>
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm"></span>Logout
                </a>
            </li>
        </ul>
    );

    const guestLinks =(
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        
    )

    return (
        <nav className="navbar bg-dark">
            <h1 onClick="location.reload()">
                <Link to="/landingPrincipal"><i className="fab fa-youtube"></i>Michi's Youtube</Link>
            </h1>
            {
                !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)
            }
        </nav>
    )
};

Navbar.propTypes ={
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps=state =>({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar)