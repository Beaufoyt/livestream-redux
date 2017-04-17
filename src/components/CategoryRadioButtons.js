import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import { fetchCams } from 'actions/cams';
import { CAM_TYPES } from 'constants/CamTypes';
import PureComponent from './PureComponent';

const categoryAll = CAM_TYPES.ALL;
const categoryGirls = CAM_TYPES.GIRLS;

export default class CategoryRadioButtons extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentCamCategory: categoryAll,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(fetchCams(this.state.currentCamCategory));
  }

  handleSelected(category) {
    this.setState({
      currentCamCategory: category,
    });

    this.props.dispatch(fetchCams(category));
  }

  getActiveState(category) {
    return this.state.currentCamCategory === category;
  }

  render() {
    const categoryButtonClasses = 'btn btn-default category-button';

    return (
      <div>
        <ButtonGroup className="pull-left controls-btm">
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
        </ButtonGroup>
      </div>
    );
  }
}
