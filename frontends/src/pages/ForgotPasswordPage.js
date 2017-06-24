import React, { Component } from 'react';
import '../styles/Login.css';
let imgLogo = require('../images/logo.jpg');
let superagent = require('superagent');

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: null,
      email: '',
      sendMail: true,
      signInButtonLabel: 'Send'
    }
  }

  shouldShowErrorMessages() {
    return this.state.errorMessages != null;
  }

  handleFormSubmit() {
    if (this.state.email === '') {
      this.setState({errorMessages: 'Email is required'})
      return false
    }
    this.setState({
      signInButtonLabel: 'Sending...'
    });
    superagent
      .post('http://localhost:3000/api/forgot_password')
      .send({
        email: this.state.email
      })
      .end((err, res) => {
        if (typeof res == 'undefined') {
          return;
        }
        if(res.body.result == 'ok') {
          this.setState({sendMail: false});
        } else {
          this.setState({
            errorMessages: res.body.errors,
            signInButtonLabel: 'Send'
          });
        }
      });
  }

  shouldDisableSignInButton() {
    return this.state.signInButtonLabel == 'Sending...';
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  goBackSignin() {
    window.location = '#/login';
  }

  render() {
    if (this.state.sendMail) {
      return (
        <div className="container">
          <div className="container-form">
            <div className='member-component forgot-page col-md-8 col-md-offset-2 clearfix'>
              <div className='member-component-box'>
                <div className='member-component-wrapper'>
                  <div className='form-group-custom sign-up-success-title text-center'>Forgot Your Password</div>
                  <div className='form-group-custom sign-up-success-title sign-up-success-text-1 text-center'>In order to receive your access code by email, please enter the address you provide during the sign up process.</div>
                  <hr/>
                  <div className='form-group-custom'>
                    <div
                      className='error-placeholder col-md-10 col-md-offset-1'
                      style={{'display': this.shouldShowErrorMessages() ? 'block' : 'none'}}>
                      { this.state.errorMessages }
                    </div>
                    <div className='input-group-custom form-group col-md-10 col-md-offset-1'>
                      <input
                        className="form-control"
                        type='text'
                        placeholder='Enter your email adress'
                        value={this.state.email}
                        onChange={(event) => this.handleEmailChange(event)}/>
                    </div>
                    <div className='input-group-custom col-md-10 col-md-offset-1'>
                      <button
                        type='submit'
                        className='btn btn-primary-custom btn-block btn-css'
                        disabled={this.shouldDisableSignInButton()}
                        onClick={(event) => this.handleFormSubmit(event)}>
                        { this.state.signInButtonLabel }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='container'>
          <div className='container-form'>
            <div className='member-component col-md-10 col-md-offset-1 clearfix'>
              <div className='member-component-box'>
                <div className='member-component-wrapper'>
                  <div className='form-group-custom sign-up-success-title text-center'>Success</div>
                  <div className='form-group-custom sign-up-success-title sign-up-success-text-1 text-center'>A email has been sent to your inbox. Please check your email.</div>
                  <div className='form-group-custom sign-up-success-title text-center'> Thank you!</div>
                  <hr/>
                  <div className='form-group-custom col-md-8 col-md-offset-2'>
                    <button
                      type='submit'
                      className='btn btn-primary-custom btn-block btn-css'
                      onClick={(event) => this.goBackSignin(event)}>
                      Go back to Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ForgotPasswordPage;
