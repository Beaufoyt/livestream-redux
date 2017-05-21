import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import { fetchCams, changeCategory } from '../actions/cams';
import { CAM_TYPES } from '../constants/CamConstants';
import PureComponent from './PureComponent';

export default class CategoryDropdown extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentCategory: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
  }

  getActiveState(category) {
    return this.props.currentCategory === category;
  }

  handleSelected(category) {
    if (!this.props.isLoading && !this.props.isLoadingMore) {
      this.props.dispatch(changeCategory(category));
      this.props.dispatch(fetchCams(category, true));
    }
  }

  mapCategories() {
    return Object.keys(CAM_TYPES).map((keyName) => {
      const id = CAM_TYPES[keyName];

      return (
        <MenuItem
            className="category-dropdown-item"
            key={id}
            active={this.getActiveState(id)}
            onClick={() => this.handleSelected(id)}
            id={id}>
          { id }
        </MenuItem>
      );
    });
  }

  render() {
    return (
      <div className="controls-btm category-dropdown">
        <DropdownButton id="Category" title={this.props.currentCategory}>
          { this.mapCategories() }
        </DropdownButton>
      </div>
    );
  }
}
