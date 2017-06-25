import React, { Component } from 'react';
import '../styles/App.css';

class SettingsPage extends Component {

  render() {
    return (
      <div className="container">
        <div className='container-form'>
          <div className='member-component col-md-8 col-md-offset-1 clearfix'>
            <div className='member-component-box'>
              <div className='member-component-wrapper'>
                <div className='form-group-custom sign-up-success-title text-left'>Thank you for sign up to Post I Like</div>
                <div className='form-group-custom sign-up-success-text-1 text-left'>We are ready to active your account.</div>
                <div className='form-group-custom sign-up-success-text-1 text-left'>All you need to do is to check your email and click on a verification link.</div>
                <div className='form-group-custom sign-up-success-text-1 text-left'>We wish you an exciting adventure ahead with your bookmark.</div>
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

export default SettingsPage;
