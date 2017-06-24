import React from 'react';
import { hashHistory } from 'react-router';
'use strict';
require('normalize.css/normalize.css');
require('../App.css');

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMenuId: 'dashboard',
    }
  }

  render() {
    return (
      <section>
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
                  <a href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li><a href="#">My posts</a></li>
                <li><a href="#">How to use</a></li>
                <li><a href="#">About</a></li>
              </ul>
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main id='page-wrapper'>
          <div className='container'>
            { this.getChildInput(this.props.children) }
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
