import React, { PropTypes } from 'react';
import { addNumber } from 'actions/todos';
import PureComponent from './PureComponent';
import Item from './Item';

export default class ItemList extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    numberList: PropTypes.object.isRequired,
  }

  render() {
    const { dispatch, numberList } = this.props;
    return (
      <div>
        <div className="pull-right">
          <button className="btn btn-danger" onClick={() => dispatch(addNumber())}>Add Number</button>
        </div>

        <ul id="numberList">
            {numberList.map(number => {
              return (
                 <Item dispatch={dispatch} key={number.get('id')} number={number} />
              );
            })}
        </ul>
      </div>
    );
  }
}
