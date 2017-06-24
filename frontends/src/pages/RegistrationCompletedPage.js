import React, { Component } from 'react';
import '../Login.css';

let imgLogo = require('../images/logo.jpg');

class RegistrationCompletedPage extends Component {

  render() {
    return (
      <div className='member-component clearfix'>
        <div className='member-component-box'>
          <div className='main-logo'><img src={imgLogo} alt="logo" height="79" width="79"/></div>
          <div className='member-component-wrapper'>
            <div className='form-group-custom sign-up-success-title text-center'>Thank you for sign up to Post I Like</div>
            <div className='form-group-custom sign-up-success-text-1 text-center'>We are ready to active your account. All you need to do is to check your email and click on a verification link.</div>
            <div className='form-group-custom sign-up-success-text-2 text-center'>We wish you an exciting adventure ahead with your bookmark.</div>
            <a className='btn btn-primary-custom btn-block form-group-custom' href='#/login'>Back to Sign In</a>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationCompletedPage;
