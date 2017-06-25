import React, { Component } from 'react';
import superagent from '../library/Superagent';
import $ from 'jquery';

class MyPostDetailsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    this._fetchData()
  }

  componentDidMount() {
    $('#main_menu li').removeClass('active')
    $('#main_menu .my_posts').addClass('active')
    $('.page-title').html('My posts')
  }

  _fetchData() {
    superagent
      .get('/api/my_posts')
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
    let listPosts = 'Loading data ...'
    if(this.state.posts.length > 0) {
      listPosts = this.state.posts.map((v, k) => {
        return (
          <div key={k} className='col-md-12 clearfix padding-0'>
            <div className='col-md-10 padding-0'>
              <div className="post-preview">
                <a href={'#/my_posts/' + v.id }>
                  <h2 className="post-title">
                    {v.title}
                  </h2>
                  <h3 className="post-subtitle">
                    { 'From: ' + v.url }
                  </h3>
                </a>
                <p className="post-meta">Posted by <a href={undefined}>{v.author}</a> on {v.created_at}</p>
              </div>
            </div>
            <div className='col-md-2 text-right padding-0'>
              <a href={'#/my_posts/' + v.id } className='btn btn-success' style={{marginTop: '30px'}}>View</a>
            </div>
            <hr style={{width: '100%'}} />
          </div>
        )
      })
    } else {
      listPosts = (<div className='text-center' style={{marginTop: '100px'}}>No data available</div>)
    }
    return (
      <div>
        {listPosts}
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

export default MyPostDetailsPage;
