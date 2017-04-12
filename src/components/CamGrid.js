import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';

export default class CamGrid extends PureComponent {
  static PropTypes = {
    cards: PropTypes.object.isRequired,
  }

  getCards() {
    return this.props.cams.getIn(['cams']).map((number, index) => {
      return (
        <li key={ index } className="user-item">
          <div id="card-image" className="card-image" />
          <span className="pull-left user">{ number.getIn(['name']) }</span>
          <span className="pull-right gender">{ number.getIn(['category']) }</span>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul className="user-list">
          { this.getCards() }
        </ul>
      </div>
    );
  }
}
