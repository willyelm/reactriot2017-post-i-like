import React, { Component } from 'react';
import $ from 'jquery';
import superagent from '../library/Superagent';
import '../styles/Login.css';
let Cookies = require('js-cookie');
let imgLogo = require('../images/logo.jpg');

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessages: null,
      buttonLabel: 'Sign In'
    }
  }

  componentDidMount() {
    $('#content').removeClass('active-menu');
  }

  handleFormSubmit() {
    if (this.state.email === '') {
      this.setState({errorMessages: 'Email is required'});
      return false
    }
    else if (this.state.password === '') {
      this.setState({errorMessages: 'Password is required'});
      return false
    }
    this.setState({
      errorMessages: null,
      buttonLabel: 'Signing In...'
    });
    superagent
      .post('/api/login')
      .send({
        email: this.state.email,
        password: this.state.password
      })
      .end((err, res) => {
        if (typeof res == 'undefined' || typeof res.body == 'undefined') {
          return;
        }
        if(res.body.result == 'ok') {
          Cookies.set('user-authentication-token', res.body.authentication, {expires: 2});
          Cookies.set('user-authentication', res.body.user, {expires: 2});
          window.location = '#/home';
        } else {
          this.setState({
            errorMessages: res.body.errors,
            buttonLabel: 'Sign In'
          });
        }
      });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  shouldShowErrorMessages() {
    return this.state.errorMessages != null;
  }

  shouldDisableButton() {
    return this.state.buttonLabel == 'Signing In...';
  }

  render() {
    return (
      <div className='container'>
        <div className='container-form'>
          <form className="sign-in-page col-md-5 col-md-offset-1">
            <div className="header form-group-custom text-left">Sign In</div>
            <hr/>
            <div
              className='error-placeholder'
              style={{'display': this.shouldShowErrorMessages() ? 'block' : 'none'}}>
              { this.state.errorMessages }
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input id="exampleInputEmail1"
                type='text' className='form-control'
                value={this.state.email}
                onChange={(event) => this.handleEmailChange(event)}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input id="exampleInputPassword1"
                type='password' className='form-control'
                value={this.state.password}
                onChange={(event) => this.handlePasswordChange(event)}/>
            </div>
            <div className='text-right forgot-password'>
              <a className='forgot-your-password input-group-custom btn-block color-label' href='#/forgot_password'>Forgot your password?</a>
            </div>
            <button
              type='submit'
              className='button-submit btn btn-primary-custom btn-block btn-css'
              disabled={this.shouldDisableButton()}
              onClick = {() => this.handleFormSubmit()}>
              {this.state.buttonLabel}
            </button>
            <div className='text-right sign-up'>
              Don’t have an account? <a href='#/sign_up' className="color-label">Sign up here.</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
