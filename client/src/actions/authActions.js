import axios from 'axios';
import setAuthToken from '../utilities/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data.message }));
};

export const loginUser = userData => dispatch => {
  axios
    .post('http://localhost:5000/api/login', userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;
      //Set token to ls
      localStorage.setItem('jwtToken', token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data.message }));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  // Remove token form localstorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
