import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';
import { toggleSidebar } from 'actions/sidebar';

export default class OtherOverlay extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    size: PropTypes.string.isRequired,
  }

  getSiteTitle() {
    return this.props.size === 'expanded' ? 'React Live' : 'R';
  }

  getSidebarClass() {
    return `sidebar ${this.props.size}`;
  }

  getToggleClass() {
    return `btn btn-success toggle-${this.props.size} sidebar-toggle`;
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className={ this.getSidebarClass() }>
        <div className="sidebar-logo">
          <h2 className="sidebar-title">{this.getSiteTitle()}</h2>
        </div>
        <button className={ this.getToggleClass() } onClick={() => dispatch(toggleSidebar())}>Toggle</button>
      </div>
    );
  }
}
