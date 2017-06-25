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

  componentDidMount() {
    $('#main_menu li').removeClass('active')
    $('#main_menu .how_to_use').addClass('active')
  }

  render() {
    let href = `javascript:void%20function(){_my_script=document.createElement(%22SCRIPT%22),_my_script.type=%22text/javascript%22,_my_script.src=%22${window.config.apiHost}/api/posts/create_post_url%3Ftoken=${this.state.token}%26url=%22+window.location.href,document.getElementsByTagName(%22head%22)[0].appendChild(_my_script),alert(%22This%20post%20is%20saved!%20You%20can%20visit%20link%20${window.config.apiHost}/%20for%20detail%22)}();`

    return (
      <a id="OutputHref" href={href}>My Bookmarklet</a>
    );
  }
}

export default HowToUsePage;
