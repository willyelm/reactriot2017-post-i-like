import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import './App.scss';
import 'core-js/fn/object/assign';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostDetail from './pages/PostDetail';

ReactDOM.render((
  <Router history={hashHistory}>
    <Redirect from='/' to='/login' />
    <Route path="/login" component={LoginPage} />
    <Route component={Layout}>
      <Route path='/home' component={HomePage} />
      <Route path='/post_detail/:post_id' component={PostDetail} />
    </Route>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
