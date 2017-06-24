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
      .get('http://localhost:3000/api/posts/public_posts')
      .query({
        token: "8df7154a59394433f558251702beeee0906bd04a"
      })
      .end((err, res) => {
        console.log(res)
        console.log(res, err)
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
          <a className='btn btn-default' key={k} href={'#/post_detail/' + v.id }>{v.title}</a>
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
