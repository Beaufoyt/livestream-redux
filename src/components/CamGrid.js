import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';

export default class CamGrid extends PureComponent {
  static PropTypes = {
    cams: PropTypes.object.isRequired,
  }

  getCards() {
    const currentFilter = this.props.cams.get('activeFilter');


    return this.props.cams.get('cams').map((cam, index) => {
      const region = cam.get('region');

      let isFiltered = 'visible';
      if (currentFilter !== null && region !== currentFilter) {
        isFiltered = 'hidden';
      }

      const className = 'user-item ' + isFiltered;

      return (
        <li key={ index } className={className}>
          <div id="card-image" className="card-image" />
          <span className="pull-left user">{ cam.getIn(['name']) }</span>
          &nbsp;<span>{ cam.getIn(['region']) }</span>
          <span className="pull-right gender">{ cam.getIn(['category']) }</span>
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
