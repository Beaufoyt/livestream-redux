import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import { changeCategory, requestCams } from 'actions/cams';
import { CAM_TYPES } from 'constants/CamTypes';
import PureComponent from './PureComponent';

export default class CategoryRadioButtons extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentCategory: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(requestCams());
  }

  handleSelected(category) {
    this.props.dispatch(changeCategory(category));
    this.props.dispatch(requestCams());
  }

  getActiveState(category) {
    return this.props.currentCategory === category;
  }

  render() {
    const buttonCat1 = CAM_TYPES.ALL;
    const buttonCat2 = CAM_TYPES.GIRLS;
    const categoryButtonClasses = 'btn btn-default category-button';

    return (
      <div>
        <ButtonGroup className="pull-left controls-btm">
          <Button active={ this.getActiveState(buttonCat1) }
              onClick={ () => this.handleSelected(buttonCat1) }
              className={ categoryButtonClasses }>
              { buttonCat1 }
          </Button>
          <Button active={ this.getActiveState(buttonCat2) }
              onClick={ () => this.handleSelected(buttonCat2) }
              className={ categoryButtonClasses }>
              { buttonCat2 }
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
