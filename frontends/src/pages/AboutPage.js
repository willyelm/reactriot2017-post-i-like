import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/agency.css';
// import agency from '../library/agency';
let orange = require('../images/team/1.jpg');
let tim = require('../images/team/2.jpg');
let anthony = require('../images/team/3.jpg');

class AboutPage extends Component {

  render() {
    return (
      <div className="container" style={{marginTop: '30px'}}>
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading">Uranium Team</h2>
            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="team-member">
              <img src={orange} className="img-responsive img-circle" alt="" />
              <h4>Orange Vo</h4>
              <p className="text-muted">Backend Developer</p>
              <ul className="list-inline social-buttons">
                <li><a href="#"><i className="fa fa-twitter"></i></a>
                </li>
                <li><a href="#"><i className="fa fa-facebook"></i></a>
                </li>
                <li><a href="#"><i className="fa fa-linkedin"></i></a>
                </li>
              </ul>
            </div>
          </div>
            <div className="col-sm-4">
              <div className="team-member">
                <img src={tim} className="img-responsive img-circle" alt="" />
                <h4>Tim Lam</h4>
                <p className="text-muted">Server Manager</p>
                <ul className="list-inline social-buttons">
                  <li><a href="#"><i className="fa fa-twitter"></i></a>
                  </li>
                  <li><a href="#"><i className="fa fa-facebook"></i></a>
                  </li>
                  <li><a href="#"><i className="fa fa-linkedin"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
                <div className="team-member">
                  <img src={anthony} className="img-responsive img-circle" alt="" />
                  <h4>Anthony Lai</h4>
                  <p className="text-muted">Frontend Developer</p>
                  <ul className="list-inline social-buttons">
                    <li><a href="#"><i className="fa fa-twitter"></i></a>
                    </li>
                    <li><a href="#"><i className="fa fa-facebook"></i></a>
                    </li>
                    <li><a href="#"><i className="fa fa-linkedin"></i></a>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 text-center">
            <p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
