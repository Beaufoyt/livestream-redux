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

  _getToggleIcon() {
    const iconClass = (this.props.sidebarSize === 'expanded') ? 'fa fa-chevron-left' : 'fa fa-chevron-right';
    return <i className={iconClass} />;
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className="header">
        <div className="sidebar-toggle-caret" onClick={() => dispatch(toggleSidebar())} >{ this._getToggleIcon() }</div>
        <button className="btn primary-btn register" onClick={() => dispatch(showOverlay(OVERLAYS.REGISTER))}>
          Register
        </button>
      </div>
    );
  }
}
