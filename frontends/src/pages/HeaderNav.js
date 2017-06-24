import React, { Component } from 'react';
import '../App.css';


class HeaderNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header page-scroll">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <a className="navbar-brand" href="#">Uranium</a>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}

export default HeaderNav;
