import React from 'react';
import $ from 'jquery';
let Cookies = require('js-cookie');
require('normalize.css/normalize.css');
require('../styles/App.css');

class Layout extends React.Component {
  componentDidMount() {
    $('body').removeClass('login')

    if(!Cookies.get('user-authentication-token')) {
      window.location = '#/login'
    }
  }

  _logout(event) {
    event.preventDefault()

    Cookies.remove('user-authentication-token', { path: '' })
    window.location = '#/login'
  }

  render() {
    return (
      <section>
        <header>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main_menu" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#/home">PostILike</a>
              </div>
              <div className="collapse navbar-collapse" id="main_menu">
                <ul className="nav navbar-nav">
                  <li className='active home'>
                    <a href="#/home"><i className="fa fa-home" aria-hidden="true"></i> Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className='my_posts'>
                    <a href="#/my_posts"><i className="fa fa-link" aria-hidden="true"></i> My posts</a>
                  </li>
                  <li className='how_to_use'>
                    <a href="#/how_to_use"><i className="fa fa-lightbulb-o" aria-hidden="true"></i> How to use</a>
                  </li>
                  <li className='about'>
                    <a href="#/about"><i className="fa fa-info-circle" aria-hidden="true"></i> About</a>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                    <a href={undefined} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle-o" aria-hidden="true"></i> Account <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="#/settings"><i className="fa fa-cogs" aria-hidden="true"></i> Settings</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href={undefined} onClick={(event) => this._logout(event)}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
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
            { this.getChildInput(this.props.children) }
          </div>
        </main>
      </section>
    );
  }

  getChildInput() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        key: child.props.location.pathname
      })
    })
  }
}

export default Layout;
