import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';

export default class Sidebar extends PureComponent {

  static propTypes = {
    size: PropTypes.string.isRequired,
  }

  getSiteTitle() {
    return this.props.size === 'expanded' ? 'React Live' : 'R';
  }

  getSidebarClass() {
    return `sidebar ${this.props.size}`;
  }

  render() {
    return (
      <div className={ this.getSidebarClass() }>
        <div className="sidebar-logo">
          <h2 className="sidebar-title">{this.getSiteTitle()}</h2>
        </div>
      </div>
    );
  }
}
