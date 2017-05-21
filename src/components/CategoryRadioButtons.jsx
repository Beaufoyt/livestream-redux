import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from 'react-bootstrap';

import { fetchCams, changeCategory } from '../actions/cams';
import { CAM_TYPES } from '../constants/CamConstants';

import PureComponent from './PureComponent';
import CategoryRadioButton from './CategoryRadioButton';

export default class CategoryRadioButtons extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentCategory: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
  }

  getActiveState(category) {
    return this.props.currentCategory === category;
  }

  handleSelected = (category) => {
    if (!this.props.isLoading && !this.props.isLoadingMore) {
      this.props.dispatch(changeCategory(category));
      this.props.dispatch(fetchCams(category, true));
    }
  }

  mapCategories() {
    return Object.keys(CAM_TYPES).map((keyName) => {
      const id = CAM_TYPES[keyName];

      return (
        <CategoryRadioButton
            key={id}
            activeCategory={this.props.currentCategory}
            onClick={this.handleSelected}
            id={id}>
          { id }
        </CategoryRadioButton>
      );
    });
  }

  render() {
    return (
      <div>
        <ButtonGroup className="category-radio-buttons controls-btm">
          { this.mapCategories() }
        </ButtonGroup>
      </div>
    );
  }
}
