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

  getNavBar() {
    return (
      <button className="btn btn-success burger-menu">Menu</button>
    );
  }

  render() {
    return (
      <div className={ this.getSidebarClass() }>
        <div className="sidebar-logo">
          <h2 className="sidebar-title">{this.getSiteTitle()}</h2>
        </div>
        { this.getNavBar() }
      </div>
    );
  }
}
