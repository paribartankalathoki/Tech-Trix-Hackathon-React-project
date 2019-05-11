import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';
import Footer from "../../layouts/Footer";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) this.props.history.push('/dashboard');

    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.state;

    return (
        <React.Fragment>
        <div className="card bg-light login-page">
          <article className="card-body" style={{ maxWidth: 425 }}>
  <h4 className="card-title mt-3 text-center">Welcome Back</h4>

      <form classNames="Form" onSubmit={this.onSubmit}>
          <div className="form-group input-group">
          <div className="input-group-prepend">
          <span className="input-group-text">
          {" "}
          <i className="fa fa-envelope" />{" "}
          </span>
          </div>
          <input
      type='email'
      className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })}
      placeholder='Email Address/ Username'
      name='email'
      value={this.state.email}
      onChange={this.onChange}
      />
      {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
      </div>

      <div className="form-group input-group">
          <div className="input-group-prepend">
          <span className="input-group-text">
          {" "}
          <i className="fa fa-lock" />{" "}
          </span>
          </div>
          <input
          type='password'
          className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })}
          placeholder='Password'
          name='password'
          value={this.state.password}
          onChange={this.onChange}
          />
          {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
      </div>

      <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
          LogIn
          </button>
          </div>
          <p className="text-center">
          Don't have an account?{" "}
      <Link to="/register">
          <button className="btn btn-success btn-sm">Sign Up</button>
      </Link>
      </p>

      <p className="divider-text  text-center">
          <span className="bg-light">OR</span>
          </p>
          <p>
          <a href="https://www.google.com/intl/ne/gmail/about/" target="_blank" className="btn btn-block btn-outline-danger btn-google">
          <i className="fab fa-google" /> &nbsp; Login via gmail
      </a>
      <a href="https://www.facebook.com/" target="_blank" className="btn btn-block btn-outline-primary btn-facebook">
          <i className="fab fa-facebook-f" /> &nbsp; Login via facebook
      </a>
      </p>
      </form>
      </article>
      </div>
          </React.Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
