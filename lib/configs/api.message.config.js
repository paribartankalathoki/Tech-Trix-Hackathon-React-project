'use strict';

module.exports = {
  userServerMessage: {
    userAlreadyExist: 'User already exists',
    usernameInUse: 'Username is already used',
    userSaved: 'User saved successfully',
    userNotFound: 'User not found',
    userAccessDenied: 'Cannot update other user',
    userUpdated: 'User updated successfully',
    userDeactivated: 'User deleted successfully',
    passwordChanged: 'User password changed successfully  ',
    validationErrorMessage: {
      usernameRequired: 'Username is required',
      invalidUsername: 'Username must be between 3 and 30 characters',
      emailRequired: 'Email is required',
      invalidEmail: 'Invalid email address',
      passwordRequired: 'Password is required',
      weakPassword: 'Password must be at least 8 characters',
      confirmPasswordRequired: 'Confirm password is required',
      matchPassword: 'Password must match',
      firstnameRequired: 'Firstname is required',
      invalidFirstname: 'Firstname must be between 3 and 30 characters',
      lastnameRequired: 'Lastname is required',
      invalidLastname: 'Lastname must be between 3 and 30 characters',
      genderRequired: 'Gender is required',
      invalidGender: 'Gender must be male, female or others',
      mobilenumberRequired: 'Mobilenumber is required',
      inavlideMobilenumber: 'Mobilenumber must be between 8 and 10 characters',
      addressRequired: 'Address is required',
      invalidAddress: 'Address must be between 3 and 30 characters'
    }
  },
  userConfirmationMessage: {
    tokenSaved: 'Token saved successfully',
    tokenUpdated: 'Token updated successfully',
    tokenNotFound: 'Token not found',
    userConfirmed: 'User confirmed successfully',
    validationErrorMessage: {
      userAlreadyVerified: 'User already verified',
      tokenExpired: 'Token has expired'
    }
  },
  authenticationMessage: {
    validationErrorMessage: {
      invalidCredential: 'Invalid username or password',
      userBlocked: 'You are blocked'
    }
  },
  tokenAuthenticationMessage: {
    tokenNotFound: 'Token not found. Please supply token',
    userNotFound: 'User is either not registered or deactivated',
    validationErrorMessage: {
      invalidToken: 'Invalid token',
      accessDenied: 'Access denied'
    }
  },
  profileServerMessage: {
    profileNotFound: 'Profile not found',
    profileSaved: 'Profile saved successfully',
    profileUpdated: 'Profile updated successfully',
    educationAdded: 'User education saved successfully',
    educationNotFound: 'Education not found',
    educationUpdated: 'User education updated successfully',
    validationErrorMessage: {
      invalidUser: 'Access denied! Invalid user'
    }
  },
  postServerMessage: {
    postNotFound: 'Post not found',
    postSaved: 'Post saved successfully',
    postUpdated: 'Post updated successfully',
    postDeactivated: 'Post deleted successfully',
    validationErrorMessage: {
      invalidUser: 'Access denied! Invalid user'
    }
  },
  fileUploadHelperMessage: {
    imageNotSelected: 'Image not selected',
    imageSaved: 'Image saved',
    imageNotFound: 'Image not found',
    validationErrorMessage: {
      invalidFileFormat: 'Only images allowed'
    }
  }
};
