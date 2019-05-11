import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utilities/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';

import { Provider } from 'react-redux';
import store from '../store';

import CustomNavbar from '../layouts/CustomNavbar.js';
// import TeamInfo from '../layouts/TeamInfo';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import BookList from '../layouts/BookList';
import TeamDetail from '../layouts/TeamDetail';
import BookDetail from "../layouts/BookDetail";
import Profile from "../layouts/Profile";
import OwnProfile from "../layouts/OwnProfile";
// import Footer from "../layouts/Footer";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <CustomNavbar />
            {/* <Route exact path='/' component={TeamInfo} /> */}
            <div>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
                <Route exact path='/BookList' component={BookList} />
                <Route exact path='/TeamDetail' component={TeamDetail} />
                  <Route path="/View/:id" component={BookDetail} />
                  <Route path="/User/:id" component={Profile} />
                  <Route path="/OwnProfile/:id" component={OwnProfile} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
