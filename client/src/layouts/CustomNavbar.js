import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

class CustomNavbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();

    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link to="/OwnProfile/:id" className='nounderline nav-link btn'>
            <i className='fas fa-user-circle' style={{ width: '25px', marginRight: '5px' }} />
          <span>paribartan</span>
          </Link>
        </li>
        <li className='nav-item'>
          <a href='#/' className='nounderline nav-link btn' onClick={this.onLogoutClick}>
            {''}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link btn' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );

    return (
        <Navbar bg="light" expand="lg" className="fixed-top">
          <Container>
          <Navbar.Brand className="ml-auto mr-auto navbar-default" href="/">
          <img src="img/header-logo/logo.jpg" className="img-fluid logo" alt="logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ml-auto">
            <Nav className="p-2 m-2">
                <Link to="/BookList" className="nounderline btn">
                BookList
                </Link>
            </Nav>
            <Nav className="p-2 m-2 ">
                <Link to="/TeamDetail" className="nounderline btn">
                Top Picks
                </Link>
            </Nav>
                {isAuthenticated ? authLinks : guestLinks}
            </Nav>

      </Navbar.Collapse>
      </Container>
      </Navbar>
    );
  }
}

CustomNavbar.propTypes = {
  logoutuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

// export default connect(
//   mapStateToProps,
//   { logoutuser },
//   CustomNavbar
// );

export default connect(
  mapStateToProps,
  { logoutUser }
)(CustomNavbar);
