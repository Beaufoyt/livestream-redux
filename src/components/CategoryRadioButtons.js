import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import { requestCams } from 'actions/cams';
import { CAM_TYPES } from 'constants/CamTypes';
import PureComponent from './PureComponent';

const buttonCat1 = CAM_TYPES.ALL;
const buttonCat2 = CAM_TYPES.GIRLS;

export default class CategoryRadioButtons extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentCamCategory: buttonCat1,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(requestCams(this.state.currentCamCategory));
  }

  handleSelected(category) {
    this.setState({
      currentCamCategory: category,
    });

    this.props.dispatch(requestCams(category));
  }

  getActiveState(category) {
    return this.state.currentCamCategory === category;
  }

  render() {
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
