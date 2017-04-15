import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { filterRegion } from 'actions/cams';
import { REGIONS } from 'constants/Regions';

import PureComponent from './PureComponent';

export default class FilterShelf extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentRegion: null,
    };
  }

  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  onDropdownChange(region) {
    this.props.dispatch(filterRegion(region));
    this.setState({
      currentRegion: region,
    });
  }

  getFilterControls() {
    const dropdownTitle = (this.state.currentRegion === null) ? 'select region' : this.state.currentRegion;

    return (
      <div className="filter-controls">
        <DropdownButton className="filter-dropdown filter-control" title={dropdownTitle} id="bg-vertical-dropdown-1">
          <MenuItem className="filter-control"
              eventKey="UK"
              onSelect={() => this.onDropdownChange(REGIONS.UK) }>UK</MenuItem>
          <MenuItem className="filter-control"
              eventKey="US"
              onSelect={() => this.onDropdownChange(REGIONS.US) }>US</MenuItem>
        </DropdownButton>
        <button className="btn btn-danger" onClick={() => this.onDropdownChange(null)}>Clear Filter</button>
      </div>
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
