import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PureComponent from './PureComponent';
import fetchStream from '../actions/stream';

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
      console.log(newProps.stream.getIn(['broadcaster', 'viewers']));
      this.setState({ isRequesting: false });
    }
  }

  getContent() {
    if (this.state.isRequesting) {
      return <div className="loader" />;
    }

    return <div>HELLO { this.props.stream.getIn(['broadcaster', 'viewers']) }</div>;
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
