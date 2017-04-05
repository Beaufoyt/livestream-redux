import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';
import { connect } from 'react-redux';
import { showOverlay } from 'actions/numbers';
import ItemList from './ItemList';
import RegisterOverlay from './RegisterOverlay';
import OtherOverlay from './OtherOverlay';
import Header from './Header';
import Sidebar from './Sidebar';

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
    return `header-content sidebar-pad-${this.props.sidebar.getIn(['sidebar', 'size'])}`;
  }

  render() {
    const { dispatch, numbers } = this.props;
    return (
      <div className="app">
        <Sidebar size={ this.getSidebarSize() } dispatch={dispatch} />
        <div className={ this.getMainPadClass() }>
          <Header dispatch={dispatch} />
          <div className="overlay-button-group">
            <button className="btn btn-success pull-right" onClick={() => dispatch(showOverlay('registerOverlay'))}>
              Show Overlay
            </button>
            <button className="btn btn-success pull-right" onClick={() => dispatch(showOverlay('otherOverlay'))}>
              Show Other Overlay
            </button>
          </div>
          { this.getOverlayStack(dispatch) }
          <div className="numbers-section">
            <div className="numbers-app">
              <h1>Number List App</h1>
              <ItemList dispatch={dispatch} numberList={numbers} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.numbers, ...state.overlays, ...state.sidebar });

export default connect(mapStateToProps)(App);
