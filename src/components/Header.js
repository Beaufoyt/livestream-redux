import React, { PropTypes } from 'react';
import PureComponent from './PureComponent';
import { showOverlay } from 'actions/todos';

export default class OtherOverlay extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className="header">
        <button className="btn btn-success pull-right" onClick={() => dispatch(showOverlay('otherOverlay'))}>
          Register
        </button>
      </div>
    );
  }
}
