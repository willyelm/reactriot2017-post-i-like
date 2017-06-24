import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

// import superagent from '../library/Superagent';
let superagent = require('superagent');
class PostReview extends Component {
  render() {
    return (
      <div className="post-preview">
          <a href="#">
              <h2 className="post-title">

              </h2>
              <h3 className="post-subtitle">

              </h3>
          </a>
          <p className="post-meta">Posted by <a href="#"></a> on </p>
      </div>
    )
  }
}

export default PostReview;
