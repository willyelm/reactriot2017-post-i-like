import React from 'react';
import $ from 'jquery';
'use strict';
require('../Login.css');

class LoginLayout extends React.Component {
  componentDidMount() {
    $('body').css('background-color', '#3D6998')
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
