import React, { PropTypes } from 'react';
import { addNumber, deleteNumbers } from 'actions/numbers';
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
        <div>
          <button className="btn btn-success" onClick={() => dispatch(addNumber())}>Add Number</button>
          <button className="btn btn-error" onClick={() => dispatch(deleteNumbers())}>Delete Numbers</button>
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
