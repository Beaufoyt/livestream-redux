import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import PureComponent from './PureComponent';
import { OVERLAYS } from 'constants/Overlays';
import RegisterOverlay from './RegisterOverlay';
import OtherOverlay from './OtherOverlay';

class Overlays extends PureComponent {
  static propTypes = {
    overlays: PropTypes.object.isRequired,
  }

  isOverlayVisible(key) {
    return this.props.overlays.getIn(['overlays', key, 'isVisible']);
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div>
          { this.isOverlayVisible(OVERLAYS.REGISTER) &&
            <RegisterOverlay key={ OVERLAYS.REGISTER } dispatch={ dispatch }/> }
          { this.isOverlayVisible(OVERLAYS.OTHER) &&
            <OtherOverlay key={ OVERLAYS.OTHER } dispatch={ dispatch } /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.overlays });

export default connect(mapStateToProps)(Overlays);
