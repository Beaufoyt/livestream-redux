import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { filterRegion } from '../actions/cams';
import REGIONS from '../constants/Regions';

import PureComponent from './PureComponent';

export default class FilterShelf extends PureComponent {
  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      currentRegion: null,
    };
  }

  onDropdownChange(region) {
    this.props.dispatch(filterRegion(region));
    this.setState({
      currentRegion: region,
    });
  }

  getActiveDropdownState(region) {
    return this.state.currentRegion === region;
  }

  getFilterControls() {
    const { currentRegion } = this.state;
    const dropdownTitle = (currentRegion === null) ? 'Select Region' : currentRegion.toUpperCase();

    return (
      <div className="filter-controls">
        <DropdownButton className="filter-dropdown filter-control" title={dropdownTitle} id="bg-vertical-dropdown-1">
          <MenuItem
              className="filter-control"
              active={this.getActiveDropdownState(REGIONS.UK)}
              eventKey="UK"
              onSelect={() => this.onDropdownChange(REGIONS.UK)}>UK</MenuItem>
          <MenuItem
              className="filter-control"
              active={this.getActiveDropdownState(REGIONS.US)}
              eventKey="US"
              onSelect={() => this.onDropdownChange(REGIONS.US)}>US</MenuItem>
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
