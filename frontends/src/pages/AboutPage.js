import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/agency.css';
// import agency from '../library/agency';
let orange = require('../images/team/orange.jpg');
let tim = require('../images/team/tim.jpg');
let anthony = require('../images/team/anthony.jpg');

class AboutPage extends Component {

  render() {
    return (
      <div className="container" style={{marginTop: '30px'}}>
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading">Uranium Team</h2>
            <h3 className="section-subheading text-muted">Alwways beleive in yourself</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="team-member">
              <img src={orange} className="img-responsive img-circle" alt="" />
              <h4>Orange (LGM-118A Peacekeeper)</h4>
              <p className="text-muted">Backend Developer</p>
              <ul className="list-inline social-buttons">
                <li><a href="http://www.rubify.com/" target='_blank'><i className="fa fa-globe"></i></a>
                </li>
                <li><a target="_blank" href="https://github.com/orangerubify"><i className="fa fa-github"></i></a>
                </li>
                <li><a href="mailto:orange@rubify.com"><i className="fa fa-envelope-o"></i></a>
                </li>
              </ul>
            </div>
          </div>
            <div className="col-sm-4">
              <div className="team-member">
                <img src={tim} className="img-responsive img-circle" alt="" />
                <h4>Tim (LGM-30)</h4>
                <p className="text-muted">Server Manager</p>
                <ul className="list-inline social-buttons">
                  <li><a href="http://www.rubify.com/" target='_blank'><i className="fa fa-globe"></i></a>
                  </li>
                  <li><a href="https://github.com/TimRubify" target="_blank"><i className="fa fa-github"></i></a>
                  </li>
                  <li><a href="mailto:tim@rubify.com"><i className="fa fa-envelope-o"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
                <div className="team-member">
                  <img src={anthony} className="img-responsive img-circle" alt="" />
                  <h4>Anthony (Iskander)</h4>
                  <p className="text-muted">Frontend Developer</p>
                  <ul className="list-inline social-buttons">
                    <li><a href="http://www.rubify.com/" target='_blank'><i className="fa fa-globe"></i></a>
                    </li>
                    <li><a href="https://github.com/AnthonyLai1001" target="_blank"><i className="fa fa-github"></i></a>
                    </li>
                    <li><a href="mailto:anthony@rubify.com"><i className="fa fa-envelope-o"></i></a>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 text-center">
            <p className="large text-muted">The only way to do great work to love what you do - Steve Jobs</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
