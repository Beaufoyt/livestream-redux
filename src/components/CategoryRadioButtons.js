import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import PureComponent from './PureComponent';

export default class Item extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentlySelected: 'cat1',
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  handleSelected(category) {
    this.setState({
      currentlySelected: category,
    });
  }

  getActiveState(category) {
    return this.state.currentlySelected === category;
  }

  render() {
    const buttonCat1 = 'cat1';
    const buttonCat2 = 'cat2';

    return (
      <div>
        <ButtonGroup className="pull-left controls-btm">
          <Button active={this.getActiveState(buttonCat1)}
              onClick={() => this.handleSelected(buttonCat1)}
              className="btn btn-default">
              Category 1
          </Button>
          <Button active={this.getActiveState(buttonCat2)}
              onClick={() => this.handleSelected(buttonCat2)}
              className="btn btn-default">
              Category 2
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
