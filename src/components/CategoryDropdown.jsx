import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import { fetchCams, changeCategory } from '../actions/cams';
import { CAM_TYPES } from '../constants/CamConstants';
import PureComponent from './PureComponent';

const categoryAll = CAM_TYPES.ALL;
const categoryGirls = CAM_TYPES.GIRLS;
const categoryGaming = CAM_TYPES.GAMING;

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

  render() {
    return (
      <div className="controls-btm category-dropdown">
        <DropdownButton id="Category" title={this.props.currentCategory}>
          <MenuItem
              id={categoryAll}
              active={this.getActiveState(categoryAll)}
              onClick={() => this.handleSelected(categoryAll)}>
              All
          </MenuItem>
          <MenuItem
              id={categoryGirls}
              active={this.getActiveState(categoryGirls)}
              onClick={() => this.handleSelected(categoryGirls)}>
              Girls
          </MenuItem>
          <MenuItem
              id={categoryGaming}
              active={this.getActiveState(categoryGaming)}
              onClick={() => this.handleSelected(categoryGaming)}>
              Gaming
          </MenuItem>
        </DropdownButton>
      </div>
    );
  }
}
