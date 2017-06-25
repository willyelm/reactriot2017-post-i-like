import React, { Component } from 'react';
import superagent from '../library/Superagent';
import $ from 'jquery';

class HowToUsePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: ''
    }
  }

  componentWillMount() {
    this._fetchData()
  }

  _fetchData() {
    superagent
      .get('/api/info/token')
      .end((err, res) => {
        if (typeof res === 'undefined') {
          return
        } else {
          this.setState({
            token: res.body.token
          })
        }
      })
  }

  _showNavbarHidden() {
    $(".btn-hover").hover(function(){
      $('.nav-bar-hidden').removeClass('hidden');
    }, function () {
      $('.nav-bar-hidden').addClass('hidden');
    });
  }

  componentDidMount() {
    this._showNavbarHidden()
    $('#main_menu li').removeClass('active')
    $('#main_menu .how_to_use').addClass('active')
    $('.page-title').html('How to use')
  }

  render() {
    let href = `javascript:void%20function(){_my_script=document.createElement(%22SCRIPT%22),_my_script.type=%22text/javascript%22,_my_script.src=%22${window.config.apiHost}/api/posts/create_post_url%3Ftoken=${this.state.token}%26url=%22+window.location.href,document.getElementsByTagName(%22head%22)[0].appendChild(_my_script),alert(%22This%20post%20is%20saved!%20You%20can%20visit%20link%20${window.config.apiHost}/%20for%20detail%22)}();`

    return (
      <div className="container" style={{marginBottom: '80px'}}>
        <div className='container-how-to-use'>
          <div className='button-drag'>
            <span className="text-24">Drag this button to your Bookmarks Bar </span>
            <a className="btn btn-primary-custom btn-block btn-hover btn-kelly" id="OutputHref" href={href} onMouseOver={() => this._showNavbarHidden()}>Post I Like</a>
            <div className="nav-bar-hidden hidden">
              <i className="fa fa-hand-o-up" aria-hidden="true"></i>
              <span>Click & Drag up to your Bookmarks Bar</span>
            </div>
          </div>
          <div className='explain'>
            <ol>
              <li>Whenever you see a site or an article that you really want to keep it somewhere </li>
              <li>Click on the Posts-I-Like button on your bookmarks bar.</li>
              <li>Your Post will be saved in your Posts-I-Like account.</li>
            </ol>
            <br/>
            <span>Happy bookmarking!</span>
          </div>
        </div>
      </div>

    );
  }
}

export default HowToUsePage;
