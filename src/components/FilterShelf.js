import React, { PropTypes } from 'react';

import PureComponent from './PureComponent';

export default class FilterShelf extends PureComponent {
  static propTypes = {
    expanded: PropTypes.bool.isRequired,
  }

  getFilterControls() {
    return (
      <div className="filter-controls">smelly bugo</div>
    );
  }

  render() {
    return (
      <div className="filter-bar">
        { this.props.expanded ? this.getFilterControls() : null }
      </div>
    );
  }
}
