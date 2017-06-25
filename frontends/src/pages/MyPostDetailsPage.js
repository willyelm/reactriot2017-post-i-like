import React, { Component } from 'react';
import $ from 'jquery';
import logo from '../logo.svg';
import '../styles/sweetalert2.css';
import '../styles/App.css';
import swal from 'sweetalert2';
import JSON from 'JSON2';
import superagent from '../library/Superagent';
class MyPostDetailsPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      post: {},
      categories: [],
      showNewCategoryForm: false,
      currentCategory: null,
      showEditPostForm: false
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
              post: res.body.post,
              categories: res.body.categories,
              currentCategory: res.body.post.category_id
            })
          }
        }
      })
  }

  componentDidMount() {
    $('#main_menu li').removeClass('active')
    $('#main_menu .my_posts').addClass('active')
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
          <p className="post-meta">Posted by <a href="#">{this.state.post.author}</a> on {this.state.post.created_at}
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

  _edit(event, allow) {
    event.preventDefault()

    this.setState({
      showEditPostForm: allow
    })
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

  _newCategory(event) {
    event.preventDefault()

    superagent
      .post('/api/categories')
      .send({
        category: {
          name: $('#new_category .category_name').val()
        }
      })
      .end((err, res) => {
        if (typeof res === 'undefined') {
          return
        } else {
          this.setState({
            categories: res.body.categories,
            showNewCategoryForm: false,
            currentCategory: res.body.current_category_id
          })
        }
      })
  }

  _newCategoryForm() {
    let className = this.state.showNewCategoryForm ? '' : ' hidden'
    return (
      <div className={"panel panel-info" + className} style={{marginTop: '30px'}}>
        <div className="panel-heading">
          <h3 className="panel-title">New Category</h3>
        </div>
        <div className="panel-body">
          <form id='new_category'>
            <div className='form-group'>
              <input name='category[name]' type='text' className='form-control category_name' />
            </div>
            <div className='text-right'>
              <a href='#' className='btn btn-warning' onClick={(event) => this._showNewCategoryForm(event, false)}>Close</a>
              <button className='btn btn-success' type='submit' onClick={(event) => this._newCategory(event)}>Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  _showNewCategoryForm(event, allow) {
    event.preventDefault()

    this.setState({
      showNewCategoryForm: allow
    })
  }

  _changeCategory(event) {
    let currentTarget = $(event.currentTarget)

    this.setState({
      currentCategory: currentTarget.val()
    })
  }

  _updatePost(event) {
    event.preventDefault()

    superagent
      .put('/api/my_posts/' + this.state.post.id)
      .send({
        post: {
          title: $('#edit_post .post-title').val(),
          category_id: $('#edit_post .post-category-id').val()
        }
      })
      .end((err, res) => {
        if (typeof res === 'undefined') {
          return
        } else {
          this.setState({
            showEditPostForm: false,
            post: res.body.post
          })
        }
      })
  }

  _editPostForm() {
    let className = this.state.showEditPostForm ? '' : ' hidden'
    let listCategories = this.state.categories.map((v, k) => {
      return (
        <option key={k} value={v.id}>{v.name}</option>
      )
    })

    return (
      <div className={"panel panel-info" + className} style={{marginTop: '30px'}}>
        <div className="panel-heading">
          <h3 className="panel-title">Edit</h3>
        </div>
        <div className="panel-body">
          <form id='edit_post'>
            <div className='form-group'>
              <input name='post[title]' value={this.state.post.title} type='text' className='form-control post-title' />
            </div>
            <div className='form-group'>
              <select className='form-control post-category-id' name='post[category_id]' value={this.state.currentCategory} onChange={(event) => this._changeCategory(event)}>
                {listCategories}
              </select>
            </div>
            <div className='text-right'>
              <a href='#' className='btn btn-primary' onClick={(event) => this._showNewCategoryForm(event, true)}>New category</a>
              <a href='#' className='btn btn-warning' onClick={(event) => this._edit(event, false)}>Close</a>
              <button className='btn btn-success' type='submit' onClick={(event) => this._updatePost(event)}>Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  render() {
    return (
      <section className='listting-posts'>
        <div className='btn-groups text-right' style={{marginTop: '30px'}}>
          <a href='#' className='btn btn-primary' onClick={(event) => this._edit(event, true)}>Edit</a>
          <a href='#' className='btn btn-danger' onClick={(event) => this._delete(event)}>Delete</a>
        </div>
        {this._newCategoryForm()}
        {this._editPostForm()}
        { this._showPost() }
      </section>
    );
  }
}

export default MyPostDetailsPage;
