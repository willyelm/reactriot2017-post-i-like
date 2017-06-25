import React, { Component } from 'react';

class HowToUsePage extends Component {

  render() {
    let href = `javascript:void%20function(){_my_script=document.createElement(%22SCRIPT%22),_my_script.type=%22text/javascript%22,_my_script.src=%22${window.config.apiHost}/api/posts/create_post_url%3Ftoken=8df7154a59394433f558251702beeee0906bd04a%26url=%22+window.location.href,document.getElementsByTagName(%22head%22)[0].appendChild(_my_script),alert(%22This%20post%20is%20saved!%20You%20can%20visit%20link%20${window.config.apiHost}/%20for%20detail%22)}();`

    return (
      <a id="OutputHref" ng-attr-href="{{ output }}" href={href}>My Bookmarklet</a>
    );
  }
}

export default HowToUsePage;
