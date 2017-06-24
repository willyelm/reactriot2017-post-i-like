import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
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
        console.log(res, err)
        if (typeof res === 'undefined') {
          return
        } else {
          console.log(res.body)
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <section className='listting-posts col-md-12'>
          { this._postList() }
        </section>
      </div>
    );
  }
}

export default HomePage;
