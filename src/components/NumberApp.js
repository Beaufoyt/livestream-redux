import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';
import ItemList from './ItemList';

export default class NumberApp extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    numbers: PropTypes.object.isRequired,
  }

  render() {
    const { dispatch, numbers } = this.props;

    return (
      <div className="numbers-section">
        <div className="numbers-app">
          <h1>Number List App</h1>
          <ItemList dispatch={dispatch} numberList={numbers} />
        </div>
      </div>
    );
  }
}
