import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
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
      .get('http://localhost:3000/api/posts/public_posts')
      .query({
        token: "8df7154a59394433f558251702beeee0906bd04a"
      })
      .end((err, res) => {
        if (typeof res === 'undefined') {
          return
        } else {
          console.log(res)
          this.setState({
            posts: res.body.posts
          })
        }
      })
  }

  _postList() {
    let listQuiz = 'Loading data ...'
    if(this.state.posts.length > 0) {
      listQuiz = this.state.posts.map((v, k) => {
        return (
          <h3>v.title</h3>
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
      <div className="App">
        <div className="App-header">
          <HeaderNav />
          <h2>POST I LIKE</h2>
          <p>(Uranium team)</p>
        </div>
        <section className='listting-posts'>
          <div className='post-item col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1'>
            <PostReview />
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
