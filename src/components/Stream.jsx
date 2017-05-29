import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchStream from '../actions/stream';

import PureComponent from './PureComponent';
import VideoPlayer from './VideoPlayer';

class Stream extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    stream: PropTypes.instanceOf(Object).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      broadcaster: {},
      isRequesting: true,
    };
  }

  componentWillMount() {
    const user = window.location.pathname.split('/')[2];
    this.props.dispatch(fetchStream(user));
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.setState({ isRequesting: false });
    }
  }

  getContent() {
    if (this.state.isRequesting) {
      return <div className="loader" />;
    }

    return (
      <div>
        <div className="cam-content">
          <div className="user-details">
            <div className="avatar">
              <i className="fa fa-user" />
            </div>
            <div className="name">
              { this.props.stream.getIn(['broadcaster', 'name']) }
            </div>
          </div>
          <VideoPlayer />
          <div className="video-details">
            <div className="title">
              This is a very long title you little noob.
            </div>
            <div className="viewers">
              <i className="fa fa-user" aria-hidden="true" />&nbsp;
              { this.props.stream.getIn(['broadcaster', 'viewers']) }
            </div>
          </div>
        </div>
        <div className="chat" />
      </div>
    );
  }

  render() {
    return (
      <div className="stream">
        { this.getContent() }
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.stream });

export default withRouter(connect(mapStateToProps)(Stream));
