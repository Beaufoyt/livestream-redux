import React, { PropTypes } from 'react';

import PureComponent from './PureComponent';
import { showOverlay } from 'actions/numbers';
import { toggleSidebar } from 'actions/sidebar';
import { OVERLAYS } from 'constants/Overlays';

export default class Header extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarSize: PropTypes.string.isRequired,
  }

  getToggleClass() {
    return `sidebar-toggle-caret sidebar-toggle-${this.props.sidebarSize}`;
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className="header">
        <div className={this.getToggleClass()} onClick={() => dispatch(toggleSidebar())} />
        <button className="btn primary-btn register" onClick={() => dispatch(showOverlay(OVERLAYS.OTHER))}>
          Register
        </button>
      </div>
    );
  }
}
