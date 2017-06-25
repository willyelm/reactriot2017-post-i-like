import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/sweetalert2.css';
import '../styles/App.css';
import swal from 'sweetalert2';
import superagent from '../library/Superagent';
class MyPostDetailsPage extends Component {

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
      .get('/api/my_posts/' + postId)
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

  componentDidMount() {
    if(this.state.post.id === 'undefined') {
      window.location = '#/my_posts'
    }
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

  _edit(event) {
    event.preventDefault()
  }

  _delete(event) {
    event.preventDefault()
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this post!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(() => {
      superagent
        .delete('/api/my_posts/' + this.state.post.id)
        .end((err, res) => {
          if (typeof res === 'undefined') {
            return
          } else {
            if(res.body.result === 'successful') {
              swal(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
              )
              window.location = '#/my_posts'
            } else {
              swal(
                'Failed',
                'Having a problem with your action.',
                'error'
              )
            }
          }
        })

    }, function(dismiss) {

    })
  }

  render() {
    return (
      <section className='listting-posts'>
        <div className='btn-groups text-right' style={{marginTop: '30px'}}>
          <a href='#' className='btn btn-primary' onClick={(event) => this._edit(event)}>Edit</a>
          <a href='#' className='btn btn-danger' onClick={(event) => this._delete(event)}>Delete</a>
        </div>
        { this._showPost() }
      </section>
    );
  }
}

export default MyPostDetailsPage;
