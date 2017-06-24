import React, { Component } from 'react';
import $ from 'jquery';
import '../Login.css';
let Cookies = require('js-cookie');
let imgLogo = require('../images/logo.jpg');
let superagent = require('superagent');

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
      .post('http://localhost:3000/api/login')
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
          if (res.body.user.sign_in_count < 2) {
            window.location = '#/first_time_login';
          }
          else {
            window.location = '#/spider_chart';
          }
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
        <p className="text-center">
          <img src={imgLogo} width="120" height="120" className="logo" />
        </p>
        <form>
          <div
            className='error-placeholder'
            style={{'display': this.shouldShowErrorMessages() ? 'block' : 'none'}}>
            { this.state.errorMessages }
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input id="exampleInputEmail1"
              type='text' className='form-control'
              value={this.state.email}
              onChange={(event) => this.handleEmailChange(event)}/>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input id="exampleInputPassword1"
              type='password' className='form-control'
              value={this.state.password}
              onChange={(event) => this.handlePasswordChange(event)}/>
          </div>
          <div className="checkbox">
            <a className='forgot-your-password input-group-custom text-center btn-block' href='#/forgot_password'>Forgot your password?</a>
            <div className='input-group-custom link-to-sign-up text-center'>
              Don’t have an account? <a href='#/sign_up'>Sign up here.</a>
            </div>
          </div>
          <button
            type='submit'
            className='button-submit btn btn-primary-custom btn-block'
            disabled={this.shouldDisableButton()}
            onClick = {() => this.handleFormSubmit()}>
            {this.state.buttonLabel}
          </button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
