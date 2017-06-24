import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
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
      .get('http://localhost:3000/api/posts/' + postId)
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
          <div className="post-heading">
            <h1>{this.state.post.title}</h1>
            <h2 className="subheading">Problems look mighty small from 150 miles up</h2>
            <span className="meta">Posted by <a href="#">Start Bootstrap</a> on August 24, 2014</span>
          </div>
          <article>
            <div className="col-md-12 padding-0">
              <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
            </div>
          </article>
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
      <section className='listting-posts col-md-12'>
        { this._showPost() }
      </section>
    );
  }
}

export default PostDetail;
