import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import PureComponent from './PureComponent';
import OVERLAYS from '../constants/Overlays';
import RegisterOverlay from './RegisterOverlay';
import LoginOverlay from './LoginOverlay';

class Overlays extends PureComponent {
  static propTypes = {
    overlays: PropTypes.instanceOf(Object).isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  isOverlayVisible(key) {
    return this.props.overlays.getIn([key, 'isVisible']);
  }

  render() {
    const { dispatch, auth } = this.props;

    return (
      <div>
        { this.isOverlayVisible(OVERLAYS.REGISTER) &&
          <RegisterOverlay key={OVERLAYS.REGISTER} auth={auth} dispatch={dispatch} /> }
        { this.isOverlayVisible(OVERLAYS.LOGIN) &&
          <LoginOverlay key={OVERLAYS.LOGIN} auth={auth} dispatch={dispatch} /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.overlays });

export default withRouter(connect(mapStateToProps)(Overlays));
