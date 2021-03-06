import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';
import './auth.css';

const Register = ({setAlert, register, isAuthenticated}) => {
    const[formData, setFormData] = useState({
        name:'',
        email:'',
        password: '',
        password2: '',
        description: ''
    });

    const {name, email, password, password2, description} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Password do not match','danger');
        }else{
            register({name, email, password, description});
        }
    };

    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }

    return (
       <Fragment>
           <div className="register-container">
                <h1 className="large text-primary">Sign Up</h1>
                    <p className="lead"><i className="fas fa-user-astronaut"></i> 
                        Register and sell your soul to the michis</p>
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                        <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}  />
                        </div>
                        <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)}/>
                        <small className="form-text">
                            This site uses Gravatar so if you want a profile image, use a
                            Gravatar email
                        </small>
                        </div>
                        <div className="form-group">
                        <input type="text" placeholder="Description" name="description" value={description} onChange={e => onChange(e)}  />
                        <small className="form-text">
                            Leave a little description about yourself
                        </small>
                        </div>
                        <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password} onChange={e => onChange(e)}
                        />
                        </div>
                        <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2} onChange={e => onChange(e)}
                        />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </form>
                    <p className="my-1">
                        Do you already have a position in our cult? <Link to="/login">Sign In here</Link>
                    </p>
           </div>
       </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired, 
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);