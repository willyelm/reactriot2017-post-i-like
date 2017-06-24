import React from 'react';
import { hashHistory } from 'react-router';
'use strict';
require('normalize.css/normalize.css');
require('../App.css');

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMenuId: 'dashboard',
    }
  }

  render() {
    return (
      <section>
        <main id='page-wrapper'>
          { this.getChildInput(this.props.children) }
        </main>
      </section>
    );
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

export default Layout;
