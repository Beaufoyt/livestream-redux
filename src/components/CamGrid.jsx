import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import classnames from 'classnames';

import { fetchCams } from '../actions/cams';
import ERROR_TYPES from '../constants/ErrorTypes';
import { CAM_PROPERTIES, CAM_OPTIONS_PROPERTIES, CAM_TYPES } from '../constants/CamConstants';
import PureComponent from './PureComponent';
import dictionary from '../messages/dictionary';

export default class CamGrid extends PureComponent {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      cams: PropTypes.object.isRequired,
      isLoading: PropTypes.bool.isRequired,
      isLoadingMore: PropTypes.bool.isRequired,
    };
  }

  componentDidUpdate() {
    if (!this.props.isLoadingMore) {
      window.requestAnimationFrame(() => {
        if (document.getElementById('waypoint')) {
          const waypointEl = document.getElementById('waypoint');

          if (this.isElementInViewport(waypointEl)) {
            this.handleWaypointEnter();
          }
        }
      });
    }
  }

  getCards() {
    const currentFilter = this.props.cams.get(CAM_OPTIONS_PROPERTIES.FILTER);

    return this.props.cams.get(CAM_OPTIONS_PROPERTIES.CAMS).map((cam) => {
      const region = cam.get(CAM_PROPERTIES.REGION);

      if (currentFilter === null || region === currentFilter) {
        const backgroundImage = `url(${cam.get(CAM_PROPERTIES.IMAGE)})`;
        const card = (
          <li key={cam.get(CAM_PROPERTIES.VIEWERS)} className="user-item user">
            <div id="card-image" style={{ backgroundImage }} className="card-image" />
            <span className="pull-left user">{ cam.get(CAM_PROPERTIES.NAME) }</span>
            &nbsp;<span>{ cam.get(CAM_PROPERTIES.REGION) }</span>
            <span className="pull-right viewers">
              <i className="fa fa-user" aria-hidden="true" />&nbsp;
              { cam.get(CAM_PROPERTIES.VIEWERS) }
            </span>
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
        { !this.props.isLoading && <Waypoint onEnter={() => { this.handleWaypointEnter(); }} /> }
        { this.props.isLoadingMore && <div className="card-image waypoint" /> }
      </div>
    );
  }

  getGridClassName() {
    return classnames('cam-grid-container', {
      'gaming-active': this.isGamingActive(),
    });
  }

  isGamingActive() {
    const { cams } = this.props;
    const camProperties = CAM_OPTIONS_PROPERTIES;

    return cams.get(camProperties.CURRENT_CATEGORY) === CAM_TYPES.GAMING && !cams.get(camProperties.ERROR);
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

  handleWaypointEnter() {
    const currentCamCategory = this.props.cams.get(CAM_OPTIONS_PROPERTIES.CURRENT_CATEGORY);
    this.props.dispatch(fetchCams(currentCamCategory, false));
  }

  renderUserList() {
    const error = this.props.cams.get(CAM_OPTIONS_PROPERTIES.ERROR);

    if (error && error === ERROR_TYPES.NOT_FOUND) {
      return (
        <div className="camgrid-error-container">
          <div className="cam-error">
            <span>
              <i className="fa fa-exclamation-circle fa-2x" aria-hidden="true" />
              { dictionary.noCamsFoundText }
            </span>
          </div>
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
      <div className={this.getGridClassName()}>
        { this.renderUserList() }
      </div>
    );
  }
}
