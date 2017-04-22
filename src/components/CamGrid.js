import React, { PropTypes } from 'react';
import Waypoint from 'react-waypoint';

import { fetchCams } from 'actions/cams';
import { ERROR_TYPES } from 'constants/ErrorTypes';
import PureComponent from './PureComponent';

export default class CamGrid extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      waypointActive: false,
    };
  }

  static PropTypes = {
    dispatch: PropTypes.func.isRequired,
    cams: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  componentWillReceiveProps(newProps) {
    const camSize = this.props.cams.get('cams').size;
    const newCamSize = newProps.cams.get('cams').size;

    if (newCamSize > camSize) {
      this.setState({
        waypointActive: false,
      });
    }

    console.log('cams', camSize, 'newCams', newCamSize);
  }

  _handleWaypointEnter() {
    const currentCamCategory = this.props.cams.get('currentCamCategory');
    this.props.dispatch(fetchCams(currentCamCategory, false));
    this.setState({
      waypointActive: true,
    });
  }

  _handleWaypointLeave() {
    this.setState({
      waypointActive: false,
    });
  }

  getCards() {
    const currentFilter = this.props.cams.get('activeFilter');

    return this.props.cams.get('cams').map((cam, index) => {
      const region = cam.get('region');

      if (currentFilter === null || region === currentFilter) {
        const card = (
          <li key={ index } className="user-item">
            <div id="card-image" style={{ backgroundImage: `url(${cam.get('image')})` }} className="card-image" />
            <span className="pull-left user">{ cam.getIn(['name']) }</span>
            &nbsp;<span>{ cam.getIn(['region']) }</span>
            <span className="pull-right viewers">{ cam.getIn(['viewers']) }</span>
          </li>
        );

        return card;
      }

      return null;
    });
  }

  getWaypoint(error) {
    if (error && error === ERROR_TYPES.NO_MORE) {
      return (
        <div>
          <div className="card-image no-more-cams" />
          <span className="no-more-cams-text">Looks like we've hit the end</span>
        </div>
      );
    }

    return (
      <div>
        { !this.props.isLoading &&
          <Waypoint onEnter={() => { this._handleWaypointEnter(); }}
              onLeave={() => { this._handleWaypointLeave(); }} /> }
        { this.state.waypointActive && <div className="card-image waypoint" /> }
      </div>
    );
  }

  renderUserList() {
    const noCamsText = 'No cams found :(';
    const error = this.props.cams.get('error');

    if (error && error === ERROR_TYPES.NOT_FOUND) {
      return (
        <div className="cam-error">
          <div className="text">{ noCamsText }</div>
        </div>
      );
    }

    return (
      <div>
        <ul className="user-list">
          { this.getCards() }
          <div id="waypoint" className="user-item">
            { this.getWaypoint(error) }
          </div>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.renderUserList() }
      </div>
    );
  }
}
