import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PureComponent from './PureComponent';
import Header from './Header';
import Sidebar from './Sidebar';
import Overlays from './Overlays';
import Routes from './Routes';

class App extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebar: PropTypes.instanceOf(Object).isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
  }

  getSidebarSize() {
    return this.props.sidebar.get('size');
  }

  getSidebarActiveNavLink() {
    return this.props.sidebar.get('activeNavLink');
  }

  getMainPadClass() {
    return `header-content sidebar-pad-${this.getSidebarSize()}`;
  }

  render() {
    const { dispatch, auth } = this.props;
    const sidebarSize = this.getSidebarSize();
    const activeNavLink = this.getSidebarActiveNavLink();

    return (
      <div className="app">
        <Sidebar dispatch={dispatch} size={sidebarSize} activeNavLink={activeNavLink} />
        <div id="header-content-container" className={this.getMainPadClass()}>
          <Header dispatch={dispatch} sidebarSize={sidebarSize} />
          <Routes />
          <Overlays auth={auth} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth, ...state.sidebar });

export default withRouter(connect(mapStateToProps)(App));
