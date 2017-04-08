import React, { PropTypes } from 'react';

import PureComponent from './PureComponent';
import CategoryRadioButtons from './CategoryRadioButtons';

export default class Item extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className="filter-controls-bar">
        <CategoryRadioButtons dispatch={dispatch}/>
        <button className="btn btn-default pull-right controls-btm">Filter</button>
      </div>
    );
  }
}
