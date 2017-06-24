import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
// import superagent from '../library/Superagent';
let superagent = require('superagent');
class PostDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      post: {}
    }
  }

  componentWillMount() {
    this._fetchData()
  }

  _fetchData() {
    let postId = this.props.params.post_id;
    console.log(postId)
    superagent
      .get('https://localhost:3000/api/posts/' + postId)
      .query({
        token: "8df7154a59394433f558251702beeee0906bd04a"
      })
      .end((err, res) => {
        if (typeof res === 'undefined') {
          return
        } else {
          console.log(res.body)
          if(res.body.post === 'undefined'){
            alert(res.body.errors)
          }else{
            this.setState({
              post: res.body.post
            })
          }
        }
      })
  }

  _showPost() {
    let postDetail = 'Loading data ...'
    if(this.state.post) {
      postDetail =  (
        <div>
          <h3>{this.state.post.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
        </div>
      )
    } else {
      postDetail = (<div className='text-center'>No data available</div>)
    }
    return (
      <div>
        {postDetail}
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
          { this._showPost() }
        </section>
      </div>
    );
  }
}

export default PostDetail;
