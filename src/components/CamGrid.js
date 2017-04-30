import React, { PropTypes } from 'react';
import Waypoint from 'react-waypoint';
import classnames from 'classnames';

import { fetchCams } from 'actions/cams';
import { ERROR_TYPES } from 'constants/ErrorTypes';
import { CAM_PROPERTIES, CAM_OPTIONS_PROPERTIES, CAM_TYPES } from 'constants/CamConstants';
import PureComponent from './PureComponent';
import { dictionary } from '../messages/dictionary';

export default class CamGrid extends PureComponent {
  static PropTypes = {
    dispatch: PropTypes.func.isRequired,
    cams: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
  }

  componentDidUpdate() {
    if (!this.props.isLoadingMore) {
      window.requestAnimationFrame(() => {
        if (this.refs.waypoint) {
          const waypointEl = document.getElementById('waypoint');

          if (this.isElementInViewport(waypointEl)) {
            this._handleWaypointEnter();
          }
        }
      });
    }
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  _handleWaypointEnter() {
    const currentCamCategory = this.props.cams.get(CAM_OPTIONS_PROPERTIES.CURRENT_CATEGORY);
    this.props.dispatch(fetchCams(currentCamCategory, false));
  }

  getCards() {
    const currentFilter = this.props.cams.get(CAM_OPTIONS_PROPERTIES.FILTER);

    return this.props.cams.get(CAM_OPTIONS_PROPERTIES.CAMS).map((cam, index) => {
      const region = cam.get(CAM_PROPERTIES.REGION);

      if (currentFilter === null || region === currentFilter) {
        const backgroundImage = `url(${cam.get(CAM_PROPERTIES.IMAGE)})`;
        const card = (
          <li key={ index } className="user-item user">
            <div id="card-image" style={{ backgroundImage }} className="card-image" />
            <span className="pull-left user">{ cam.get(CAM_PROPERTIES.NAME) }</span>
            &nbsp;<span>{ cam.get(CAM_PROPERTIES.REGION) }</span>
            <span className="pull-right viewers">{ cam.get(CAM_PROPERTIES.VIEWERS) }</span>
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
          <span className="no-more-cams-text">{ dictionary.noMoreCamsFoundText }</span>
        </div>
      );
    }

    return (
      <div>
        { !this.props.isLoading && <Waypoint onEnter={() => { this._handleWaypointEnter(); }} /> }
        { this.props.isLoadingMore && <div className="card-image waypoint" /> }
      </div>
    );
  }

  renderUserList() {
    const error = this.props.cams.get(CAM_OPTIONS_PROPERTIES.ERROR);

    if (error && error === ERROR_TYPES.NOT_FOUND) {
      return (
        <div className="cam-error">
          <div className="text">{ dictionary.noCamsFoundText }</div>
        </div>
      );
    }

    return (
      <div>
        <ul className="user-list">
          { this.getCards() }
          <div id="waypoint" ref="waypoint" className="user-item">
            { this.getWaypoint(error) }
          </div>
        </ul>
      </div>
    );
  }

  _isGamingActive() {
    const { cams } = this.props;
    const camProperties = CAM_OPTIONS_PROPERTIES;

    return cams.get(camProperties.CURRENT_CATEGORY) === CAM_TYPES.GAMING && !cams.get(camProperties.ERROR);
  }

  _getGridClassName() {
    return classnames('cam-grid-container', {
      'gaming-active': this._isGamingActive(),
    });
  }

  render() {
    return (
      <div className={ this._getGridClassName() }>
      { this.renderUserList() }
      </div>
    );
  }
}
