import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import HeaderNav from './HeaderNav.js'
import PostReview from './PostReview.js'
// import superagent from '../library/Superagent';
let superagent = require('superagent');
class HomePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    this._fetchData()
  }

  _fetchData() {
    superagent
      .get('http://localhost:3000/api/posts')
      .end((err, res) => {
        if (typeof res === 'undefined') {
          return
        } else {
          if(res.body.posts === 'undefined'){
            alert(res.body.errors)
          }else{
            this.setState({
              posts: res.body.posts
            })
          }
        }
      })
  }

  _postList() {
    let listQuiz = 'Loading data ...'
    if(this.state.posts) {
      listQuiz = this.state.posts.map((v, k) => {
        return (
          <div key={k}>
            <div className="post-preview">
              <a href={'#/post_detail/' + v.id }>
                <h2 className="post-title">
                  {v.title}
                </h2>
                <h3 className="post-subtitle">
                  Problems look mighty small from 150 miles up
                </h3>
              </a>
              <p className="post-meta">Posted by <a href="#">Start Bootstrap</a> on September 24, 2014</p>
            </div>
            <hr />
          </div>
        )
      })

      return (
        <div>
          {listQuiz}
        </div>
      )
    } else {
      listQuiz = (<div className='text-center'>No data available</div>)
    }
    return (
      <div>
        {listQuiz}
      </div>
    )
  }

  render() {
    return (
      <section className='listting-posts col-md-12'>
        { this._postList() }
      </section>
    );
  }
}

export default HomePage;
