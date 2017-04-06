import React, { PropTypes } from 'react';
import { deleteNumber } from 'actions/numbers';
import PureComponent from './PureComponent';

export default class Item extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    number: PropTypes.object.isRequired,
  }

  render() {
    const { text, id } = this.props.number.toObject();
    return (
      <div>
      <li className="single-number">
        {text}
        <button className="btn btn-danger" onClick={() => this.props.dispatch(deleteNumber(id))}>Delete Number</button>
      </li>
      </div>
    );
  }
}