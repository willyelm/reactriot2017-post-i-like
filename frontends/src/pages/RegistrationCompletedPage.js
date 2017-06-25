import React, { Component } from 'react';
import '../styles/Login.css';

class RegistrationCompletedPage extends Component {

  render() {
    return (
      <div className="container">
        <div className='container-form'>
          <div className='member-component col-md-8 col-md-offset-1 clearfix'>
            <div className='member-component-box'>
              <div className='member-component-wrapper'>
                <div className='form-group-custom sign-up-success-title text-left'>Awesome! Just one more step to go.</div>
                <div className='form-group-custom sign-up-success-text-1 text-left'>We are ready to activate your Post-I-Like account.</div>
                <div className='form-group-custom sign-up-success-text-1 text-left'>All you have to do is to check your email and click on a verification link to get started.</div>
                <div className='form-group-custom sign-up-success-text-1 text-left'>We wish you an exciting adventure ahead with the posts you like!</div>
                <div className='button-margin col-md-6 padding-0'>
                  <a className='btn btn-primary-custom btn-block btn-css' href='#/login'>Back to Sign In</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default RegistrationCompletedPage;
