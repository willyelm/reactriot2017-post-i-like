import React, { Component } from 'react';
import '../styles/App.css';
import superagent from '../library/Superagent';
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
    superagent
      .get('/api/posts/' + postId)
      .end((err, res) => {
        if (typeof res === 'undefined') {
          return
        } else {
          if(res.body.post === 'undefined') {
          } else {
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
        <div className="post-preview">
          <h2 className="post-title">
            {this.state.post.title}
          </h2>
          <h3 className="post-subtitle">
            { 'From: ' + this.state.post.url }
          </h3>
          <p className="post-meta">Posted by <a href={"#/users/:user_id"}>{this.state.post.author}</a> on {this.state.post.created_at}
          <br/>
          Category: {this.state.post.category_name}
          </p>
          <hr />
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
      <section className='listting-posts col-md-12'>
        { this._showPost() }
      </section>
    );
  }
}

export default PostDetail;
