import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './styles/clean-blog.min.css';
import './styles/App.css';
import 'core-js/fn/object/assign';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import Layout from './layout/Layout';
import LoginLayout from './layout/LoginLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostDetail from './pages/PostDetail';
import SignUpPage from './pages/SignUpPage';
import RegistrationCompletedPage from './pages/RegistrationCompletedPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HowToUsePage from './pages/HowToUsePage';
import VerifyRegisterSuccessPage from './pages/VerifyRegisterSuccessPage';
import MyPostsPage from './pages/MyPostsPage';
import MyPostDetailsPage from './pages/MyPostDetailsPage';
import AboutPage from './pages/AboutPage';
import SettingsPage from './pages/SettingsPage';

ReactDOM.render((
  <Router history={hashHistory}>
    <Redirect from='/' to='/login' />
    <Route component={LoginLayout}>
      <Route path="/login" component={LoginPage} />
      <Route path="/sign_up" component={SignUpPage} />
      <Route path='/registration_completed' component={RegistrationCompletedPage} />
      <Route path='/forgot_password' component={ForgotPasswordPage} />
      <Route path='/verify_register_success/:register_token' component={VerifyRegisterSuccessPage} />
    </Route>
    <Route component={Layout}>
      <Route path='/home' component={HomePage} />
      <Route path='/post_detail/:post_id' component={PostDetail} />
      <Route path='/how_to_use' component={HowToUsePage} />
      <Route path='/my_posts' component={MyPostsPage} />
      <Route path='/my_posts/:post_id' component={MyPostDetailsPage} />
      <Route path='/about' component={AboutPage} />
      <Route path='/settings' component={SettingsPage} />
    </Route>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
