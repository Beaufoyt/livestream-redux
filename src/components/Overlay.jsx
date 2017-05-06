import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';
import { fromJS } from 'immutable';
import { hideOverlay } from '../actions/overlays';

import PureComponent from './PureComponent';

const bodyClasses = document.body.className;

export default class Overlay extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    onContinue: PropTypes.func,
    continueText: PropTypes.string,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool,
    error: PropTypes.instanceOf(Object),
    children: PropTypes.node,
  }

  static defaultProps = {
    title: '',
    onContinue: () => {},
    continueText: '',
    cancelText: '',
    onCancel: () => {},
    isLoading: false,
    error: {},
    children: null,
  }

  componentDidMount() {
    document.body.className = bodyClasses + ' no-scroll';
  }

  componentDidUpdate() {
    if (this.props.error) {
      const target = document.getElementById('cam-error');
      if (target) {
        target.parentNode.scrollTop = target.offsetTop;
      }
    }
  }

  componentWillUnmount() {
    document.body.className = bodyClasses;
  }

  getContinueButton() {
    if (this.props.isLoading) {
      return <div className="overlay-requesting" />;
    }

    return (
      <button
          className="submit-button btn primary-btn"
          type="button"
          onClick={() => this.props.onContinue()}>
        { this.props.continueText }
      </button>
    );
  }

  render() {
    const { dispatch, id, title } = this.props;
    const error = this.props.error ? fromJS(this.props.error) : null;

    return (
      <div className="overlay">
        <div className="overlay-content-container">
          <div className="overlay-content-header">
            <h3>
              { title }
            </h3>
            <button className="btn overlay-close" onClick={() => dispatch(hideOverlay(id))}>
              <i className="fa fa-times" aria-hidden="true" />
            </button>
          </div>
          <div id="overlay-content" className="overlay-content">
            { this.props.children }
            { error &&
              <div id="cam-error" className="cam-error">
                <span><i className="fa fa-exclamation-circle fa-2x" aria-hidden="true" />{ error.get('detail') }</span>
              </div>
            }
          </div>
          <div className="footer">
            <div className="footer-buttons">
              <Button
                  className="cancel-button"
                  type="button"
                  onClick={() => this.props.onCancel()}>
                { this.props.cancelText }
              </Button>
              { this.getContinueButton() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
