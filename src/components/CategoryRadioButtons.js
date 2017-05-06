import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import { fetchCams, changeCategory } from 'actions/cams';
import { CAM_TYPES } from 'constants/CamConstants';
import PureComponent from './PureComponent';

const categoryAll = CAM_TYPES.ALL;
const categoryGirls = CAM_TYPES.GIRLS;
const categoryGaming = CAM_TYPES.GAMING;

export default class CategoryRadioButtons extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentCategory: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
  }

  handleSelected(category) {
    if (!this.props.isLoading && !this.props.isLoadingMore) {
      this.props.dispatch(changeCategory(category));
      this.props.dispatch(fetchCams(category, true));
    }
  }

  getActiveState(category) {
    return this.props.currentCategory === category;
  }

  render() {
    const categoryButtonClasses = 'btn category-button';

    return (
      <div>
        <ButtonGroup className="category-radio-buttons controls-btm">
          <Button active={ this.getActiveState(categoryAll) }
              onClick={ () => this.handleSelected(categoryAll) }
              className={ categoryButtonClasses }>
              { categoryAll }
          </Button>
          <Button active={ this.getActiveState(categoryGirls) }
              onClick={ () => this.handleSelected(categoryGirls) }
              className={ categoryButtonClasses }>
              { categoryGirls }
          </Button>
          <Button active={ this.getActiveState(categoryGaming) }
              onClick={ () => this.handleSelected(categoryGaming) }
              className={ categoryButtonClasses + ' primary-btn gaming-cat' }>
              { categoryGaming }
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
