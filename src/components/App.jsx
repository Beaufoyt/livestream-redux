import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PureComponent from './PureComponent';
import Header from './Header';
import Sidebar from './Sidebar';
import CamApp from './CamApp';
import Overlays from './Overlays';

class App extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebar: PropTypes.instanceOf(Object).isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
  }

  getSidebarSize() {
    return this.props.sidebar.getIn(['sidebar', 'size']);
  }

  getMainPadClass() {
    return `header-content sidebar-pad-${this.getSidebarSize()}`;
  }

  render() {
    const { dispatch, auth } = this.props;
    const sidebarSize = this.getSidebarSize();

    return (
      <div className="app">
        <Sidebar dispatch={dispatch} size={sidebarSize} />
        <div id="header-content-container" className={this.getMainPadClass()}>
          <Header dispatch={dispatch} sidebarSize={sidebarSize} />
          <CamApp />
          <Overlays auth={auth} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth, ...state.sidebar, ...state.cams });

export default connect(mapStateToProps)(App);
