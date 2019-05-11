import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
        <React.Fragment>
        <div className="card login-page register bg-light">
          <article className="card-body" style={{ maxWidth: 425 }}>
  <h4 className="card-title mt-3 text-center">Create Account</h4>
      <p className="text-center">Get started with your free account</p>
      <p>
      <a href="#top" className="nounderline btn-outline-danger btn btn-block btn-google">
          <i className="fab fa-google" /> &nbsp; Login via Gmail
      </a>
      <a href="#top" className="nounderline btn-outline-primary btn btn-block btn-facebook">
          {" "}
          <i className="fab fa-facebook-f" /> &nbsp; Login via facebook
      </a>
      </p>
      <p className="divider-text text-center">
          <span className="bg-light ">OR</span>
          </p>

          <form onSubmit={this.onSubmit}>
          {/* Name */}
          <div
      className={classnames("form-group input-group", {
          "is-invalid": errors.name
      })}
  >
  <div className="input-group-prepend">
          <span className="input-group-text">
          {" "}
          <i className="fa fa-user" />{" "}
          </span>
          </div>
          <input
      name="name"
      value={this.state.name}
      className="form-control"
      placeholder="Full name"
      type="text"
      onChange={this.onChange}
      />
      {errors.name && (
      <div className="invalid-feedback">{errors.name}</div>
      )}
  </div>

      {/* Email */}
  <div
      className={classnames("form-group input-group", {
          "is-invalid": errors.email
      })}
  >
  <div className="input-group-prepend">
          <span className="input-group-text">
          {" "}
          <i className="fa fa-envelope" />{" "}
          </span>
          </div>
          <input
      name="email"
      value={this.state.email}
      className="form-control"
      placeholder="Email address"
      type="email"
      onChange={this.onChange}
      />
      {errors.email && (
      <div className="invalid-feedback">{errors.email}</div>
      )}
  </div>

      {/* password1 */}
  <div
      className={classnames("form-group input-group", {
          "is-invalid": errors.password
      })}
  >
  <div className="input-group-prepend">
          <span className="input-group-text">
          {" "}
          <i className="fa fa-lock" />{" "}
          </span>
          </div>
          <input
      name="password"
      value={this.state.password}
      className="form-control"
      placeholder="Create password"
      type="password"
      onChange={this.onChange}
      />
      {errors.password && (
      <div className="invalid-feedback">{errors.password}</div>
      )}
  </div>

      {/* password2 */}
  <div
      className={classnames("form-group input-group", {
          "is-invalid": errors.password2
      })}
  >
  <div className="input-group-prepend">
          <span className="input-group-text">
          {" "}
          <i className="fa fa-lock" />{" "}
          </span>
          </div>
          <input
      name="password2"
      value={this.state.password2}
      className="form-control"
      placeholder="Repeat password"
      type="password"
      onChange={this.onChange}
      />
      {errors.password2 && (
      <div className="invalid-feedback">{errors.password2}</div>
      )}
  </div>

      <div className="form-group">
          <button type="submit" className="btn btn-success btn-block">
          Create Account
      </button>
      </div>
      <p className="text-center">
          Have an account?
  <Link to="/Login">
          <button className="m-2 btn btn-sm btn-primary">Log In</button>
      </Link>
      </p>
      </form>
      </article>
      </div>
          </React.Fragment>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
