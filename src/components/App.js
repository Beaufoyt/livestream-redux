import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import PureComponent from './PureComponent';
import RegisterOverlay from './RegisterOverlay';
import OtherOverlay from './OtherOverlay';
import Header from './Header';
import Sidebar from './Sidebar';
import CamApp from './CamApp';

class App extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    numbers: PropTypes.object.isRequired,
    overlays: PropTypes.object.isRequired,
    sidebar: PropTypes.object.isRequired,
  }

  getOverlayStack(dispatch) {
    return [this.isRegisterOverlayVisible() && <RegisterOverlay key="registerOverlay" dispatch={ dispatch }/>,
          this.isOtherOverlayVisible() && <OtherOverlay key="otherOverlay" dispatch={ dispatch } />,
    ];
  }

  isRegisterOverlayVisible() {
    return this.props.overlays.getIn(['overlays', 'registerOverlay', 'isVisible']);
  }

  isOtherOverlayVisible() {
    return this.props.overlays.getIn(['overlays', 'otherOverlay', 'isVisible']);
  }

  getSidebarSize() {
    return this.props.sidebar.getIn(['sidebar', 'size']);
  }

  getMainPadClass() {
    return `header-content sidebar-pad-${this.getSidebarSize()}`;
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className="app">
        <Sidebar size={ this.getSidebarSize() } />
        <div id="header-content-container" className={ this.getMainPadClass() }>
          <Header dispatch={dispatch} />
          <CamApp />
          { this.getOverlayStack(dispatch) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.numbers, ...state.overlays, ...state.sidebar, ...state.cams });

export default connect(mapStateToProps)(App);
