import React from 'react';
import $ from 'jquery';
require('../styles/Login.css');

class LoginLayout extends React.Component {
  componentDidMount() {
    $('body').addClass('login')
  }

  render() {
    return (
      <div>
        { this.getChildInput(this.props.children) }
      </div>
    )
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

export default LoginLayout;
