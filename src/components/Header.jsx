import React from 'react';
import PropTypes from 'prop-types';

import PureComponent from './PureComponent';
import { showOverlay } from '../actions/overlays';
import toggleSidebar from '../actions/sidebar';
import OVERLAYS from '../constants/Overlays';

export default class Header extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarSize: PropTypes.string.isRequired,
  }

  getToggleIcon() {
    const iconClass = (this.props.sidebarSize === 'expanded') ? 'fa fa-chevron-left' : 'fa fa-chevron-right';
    return <i className={iconClass} />;
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className="header">
        <button
            className="btn sidebar-toggle-caret"
            onClick={() => dispatch(toggleSidebar())} >
          { this.getToggleIcon() }
        </button>
        <button className="btn primary-btn register" onClick={() => dispatch(showOverlay(OVERLAYS.REGISTER))}>
          Register
        </button>
      </div>
    );
  }
}
