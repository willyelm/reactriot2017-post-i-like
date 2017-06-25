import React, { Component } from 'react';
import superagent from '../library/Superagent';
import '../styles/Login.css';
let Cookies = require('js-cookie');

let imgLogo = require('../images/logo.jpg');
class VerifyRegisterSuccessPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkingToken: null,
      signInButtonLabel: 'Go back to Sign In'
    }
  }

  handleFormSubmit() {
    window.location = '#/login';
  }

  componentDidMount() {
    this.checkingToken();
  }

  checkingToken() {
    Cookies.remove('user-authentication-token')
    Cookies.remove('user-authentication')

    superagent
      .post('/api/check_register_token')
      .send({
        register_token: this.props.params.register_token
      })
      .end((err, res) => {
        if (typeof res === 'undefined') {
          return;
        }
        if(res.body.result === 'ok') {
          this.setState({checkingToken: false})
        } else {
          this.setState({
            checkingToken: true,
            errorMessages: res.body.errors
          })
        }
      })
  }


  render() {
    if (this.state.checkingToken == null) {
      return (
        <div className='login'>
          <div className='login-box'>
          </div>
        </div>
      );
    }
    else if (this.state.checkingToken) {
      return (
        <div className='member-component clearfix'>
          <div className='member-component-box'>
            <div className='main-logo'><img src={imgLogo} alt="logo" height="79" width="79"/></div>
            <div className='member-component-wrapper'>
              <div className='form-group-custom sign-up-success-title text-center'>Verify Account</div>
              <div className='form-group-custom sign-up-success-text-1 text-center' style={{color: 'red'}}>Invalid or expired token.</div>
              <a className='btn btn-primary-custom btn-block form-group-custom' href='#/'>Back to Sign In</a>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className='member-component clearfix'>
          <div className='member-component-box'>
            <div className='main-logo'><img src={imgLogo} alt="logo" height="79" width="79"/></div>
            <div className='member-component-wrapper'>
              <div className='form-group-custom sign-up-success-title text-center'>Great! Thank you for confirming your account!</div>
              <div className='form-group-custom sign-up-success-text-1 text-center'>Now you may sign in into your account by accessing from the button below. Always remember to take your Vitamins daily!</div>
              <a className='btn btn-primary-custom btn-block form-group-custom' href='#/'>Sign In</a>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default VerifyRegisterSuccessPage;
