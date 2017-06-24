import React, { Component } from 'react';
import '../styles/Login.css';
let superagent = require('superagent');

let imgLogo = require('../images/logo.jpg');

class SignUpPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      errorMessages: null,
      buttonLabel: 'Sign Up'
    }
  }

  handleFormSubmit() {
    if (this.state.firstName === '') {
      this.setState({errorMessages: 'First name is required'});
      return false
    }
    else if (this.state.lastName === '') {
      this.setState({errorMessages: 'Last name is required'});
      return false
    }
    else if (this.state.email === '') {
      this.setState({errorMessages: 'Email is required'});
      return false
    }
    else if (this.state.password === '') {
      this.setState({errorMessages: 'Password is required'});
      return false
    }
    this.setState({
      errorMessages: null,
      buttonLabel: 'Signing Up...'
    });
    superagent
      .post('http://localhost:3000/api/register_user')
      .send({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.rePassword,
        user_role_name: 'Student'
      })
      .end((err, res) => {
        if (typeof res == 'undefined' || typeof res.body == 'undefined') {
          return;
        }
        if(res.body.result == 'ok') {
          window.location = '#/registration_completed';
        } else {
          this.setState({
            errorMessages: res.body.errors,
            buttonLabel: 'Sign Up'
          });
        }
      });
  }

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleRePasswordChange(event) {
    this.setState({ rePassword: event.target.value });
  }

  shouldShowErrorMessages() {
    return this.state.errorMessages != null;
  }

  shouldDisableButton() {
    return this.state.buttonLabel == 'Signing In...';
  }

  render() {
    return (
      <div className="container">
        <div className="container-form">
          <div className='member-component col-lg-7 col-md-10 clearfix'>
            <div className='member-component-box'>
              <div className='member-component-wrapper'>
                <div className='header form-group-custom text-center'>Sign up for new account</div>
                <div className='form-group-custom'>
                  <div
                    className='error-placeholder'
                    style={{'display': this.shouldShowErrorMessages() ? 'block' : 'none'}}
                    dangerouslySetInnerHTML={{__html: this.state.errorMessages}}>

                  </div>
                  <div className='input-group-custom form-group'>
                    <label>First Name</label>
                    <input
                      className="form-control"
                      type='text'
                      value={this.state.firstName}
                      onChange={(event) => this.handleFirstNameChange(event)}/>
                  </div>
                  <div className='input-group-custom form-group'>
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      type='text'
                      value={this.state.lastName}
                      onChange={(event) => this.handleLastNameChange(event)}/>
                  </div>
                  <div className='input-group-custom form-group'>
                    <label>E-mail</label>
                    <input
                      className="form-control"
                      type='text'
                      value={this.state.email}
                      onChange={(event) => this.handleEmailChange(event)}/>
                  </div>
                  <div className='input-group-custom form-group'>
                    <label>Password</label>
                    <input
                      className="form-control"
                      type='password'
                      value={this.state.password}
                      onChange={(event) => this.handlePasswordChange(event)}/>
                  </div>
                  <div className='input-group-custom form-group'>
                    <label>Re-enter Password</label>
                    <input
                      className="form-control"
                      type='password'
                      value={this.state.rePassword}
                      onChange={(event) => this.handleRePasswordChange(event)}/>
                  </div>
                  <p  className='sign-up-agree'>By signing up for a Vitamin account, you agree to the Terms and Conditions and Privacy Policy.</p>
                  <div className='input-group-custom form-group'>
                    <button
                      type='submit'
                      className='button-submit btn btn-primary-custom btn-block'
                      disabled={this.shouldDisableButton()}
                      onClick = {() => this.handleFormSubmit()}>
                      {this.state.buttonLabel}
                    </button>
                  </div>
                  <a className='forgot-your-password input-group-custom text-center btn-block' href='#/forgot_password'>Forgot your password?</a>
                </div>
                <hr/>

                <div className='input-group-custom link-to-sign-up'>
                  Already have an account? <a href='#/login'>Sign in here.</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
