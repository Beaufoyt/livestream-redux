import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';
import { showOverlay } from 'actions/numbers';
import { toggleSidebar } from 'actions/sidebar';

export default class OtherOverlay extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className="header">
        <button className="btn btn-success sidebar-toggle" onClick={() => dispatch(toggleSidebar())}>Toggle</button>
        <button className="btn btn-success register" onClick={() => dispatch(showOverlay('otherOverlay'))}>
          Register
        </button>
      </div>
    );
  }
}
