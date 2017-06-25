import React, { Component } from 'react';
import '../styles/App.css';
import superagent from '../library/Superagent';
import $ from 'jquery';
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
      .get('/api/posts')
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

  componentDidMount() {
    $('#main_menu li').removeClass('active')
    $('#main_menu .home').addClass('active')
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
                  { 'From: ' + v.url }
                </h3>
              </a>
              <p className="post-meta">Posted by <a href={undefined}>{v.author}</a> on {v.created_at}
              <br/>
              Category: {v.category_name}
              </p>
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
