window.config = {}

if(process.env.NODE_ENV === 'development') {
  window.config = {
    apiHost: 'http://localhost:3000'
  }
} else {
  window.config = {
    apiHost: 'https://post-i-like.2017.reactriot.com'
  }
}

let Cookies = require('js-cookie');

let superagent = require('superagent-defaults')();
superagent.on('request', (request) => {
  if(request.url[0] === '/') {
    request.url = window.config.apiHost + request.url;
  }//end if

  let authenticationToken = Cookies.get('user-authentication-token');
  if(authenticationToken) {
    request.set('authorization-token', authenticationToken);
  }//end if
});

const end = superagent.request.Request.prototype.end;
superagent.request.Request.prototype.end = function(callback) {
  return end.call(this, (error, response) => {
    if(response && response.statusCode === 401) {
      Cookies.remove('user-authentication-token');
      document.location = '#/login';
    } else {
      callback(error, response);
    }
  });
}

export default superagent;
