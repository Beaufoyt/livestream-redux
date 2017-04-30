import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import PureComponent from './PureComponent';
import Header from './Header';
import Sidebar from './Sidebar';
import CamApp from './CamApp';
import Overlays from './Overlays';

class App extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    numbers: PropTypes.object.isRequired,
    sidebar: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
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
        <Sidebar dispatch={dispatch} size={ sidebarSize } />
        <div id="header-content-container" className={ this.getMainPadClass() }>
          <Header dispatch={dispatch} sidebarSize={ sidebarSize } />
          <CamApp />
          <Overlays auth={ auth }/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.numbers, ...state.auth, ...state.sidebar, ...state.cams });

export default connect(mapStateToProps)(App);
