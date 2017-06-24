import React from 'react';
import { hashHistory } from 'react-router';
import $ from 'jquery';
'use strict';
require('normalize.css/normalize.css');
require('../styles/App.css');

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMenuId: 'dashboard',
    }
  }

  componentDidMount() {
    $('body').removeClass('login')
  }

  render() {
    return (
      <section>
        <header>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">PostILike</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li className="active">
                    <a href="#/home"><i className="fa fa-home" aria-hidden="true"></i> Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li><a href="#"><i className="fa fa-link" aria-hidden="true"></i> My posts</a></li>
                  <li><a href="#"><i className="fa fa-lightbulb-o" aria-hidden="true"></i> How to use</a></li>
                  <li><a href="#"><i className="fa fa-info-circle" aria-hidden="true"></i> About</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle-o" aria-hidden="true"></i> Account <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="#"><i className="fa fa-cogs" aria-hidden="true"></i> Settings</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
                    </ul>
                  </li>
                </ul>
                <form className="navbar-form navbar-right">
                  <div className="form-group search-form-modified">
                    <input type="text" className="form-control input-search" placeholder="Search" />
                    <button type="submit" className="btn-search">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </nav>
        </header>
        <main id='page-wrapper'>
          <div className='container'>
            <div className='col-md-8'>
              { this.getChildInput(this.props.children) }
            </div>
          </div>
        </main>
      </section>
    );
  }

  getChildInput() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        key: child.props.location.pathname,
        setActiveMenuId: this.setActiveMenuId.bind(this)
      })
    })
  }

  setActiveMenuId(menuId) {
    this.setState({ activeMenuId: menuId })
  }
}

export default Layout;
