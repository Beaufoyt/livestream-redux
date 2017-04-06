import React, { PropTypes } from 'react';
import { ButtonGroup } from 'react-bootstrap';

import PureComponent from './PureComponent';
import { connect } from 'react-redux';
import RegisterOverlay from './RegisterOverlay';
import OtherOverlay from './OtherOverlay';
import Header from './Header';
import Sidebar from './Sidebar';
import NumberApp from './NumberApp';

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
          <div className="filter-controls-bar">
            <ButtonGroup>
              <button className="btn btn-default pull-right">Category 1</button>
              <button className="btn btn-default pull-right">Category 2</button>
              <button className="btn btn-default pull-right">Category 3</button>
            </ButtonGroup>
            <button className="btn btn-default pull-right">Filter</button>
          </div>
          { this.getOverlayStack(dispatch) }
          <NumberApp numbers={numbers} dispatch={dispatch} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.numbers, ...state.overlays, ...state.sidebar });

export default connect(mapStateToProps)(App);
