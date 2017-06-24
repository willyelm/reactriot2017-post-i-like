import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './styles/App.css';
import 'core-js/fn/object/assign';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import Layout from './layout/Layout';
import LoginLayout from './layout/LoginLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import RegistrationCompletedPage from './pages/RegistrationCompletedPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

ReactDOM.render((
  <Router history={hashHistory}>
    <Redirect from='/' to='/login' />
    <Route component={LoginLayout}>
      <Route path="/login" component={LoginPage} />
      <Route path="/sign_up" component={SignUpPage} />
      <Route path='/registration_completed' component={RegistrationCompletedPage} />
      <Route path='/forgot_password' component={ForgotPasswordPage} />
    </Route>
    <Route component={Layout}>
      <Route path='/home' component={HomePage} />
    </Route>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
