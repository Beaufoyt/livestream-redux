import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

import { hideOverlay } from 'actions/numbers';

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
  }

  componentDidMount() {
    document.body.className = bodyClasses + ' no-scroll';
  }

  componentWillUnmount() {
    document.body.className = bodyClasses;
  }

  componentDidUpdate() {
    if (this.props.error) {
      const target = document.getElementById('cam-error');
      if (target) {
        target.parentNode.scrollTop = target.offsetTop;
      }
    }
  }

  _getContinueButton() {
    if (this.props.isLoading) {
      return <div className="overlay-requesting" />;
    }

    return (
      <button
          className="submit-button btn primary-btn"
          bsStyle="success"
          type="button"
          onClick={ () => this.props.onContinue() }>
          { this.props.continueText }
      </button>
    );
  }

  render() {
    const { dispatch, id, title, error } = this.props;

    return (
      <div className="overlay">
        <div className="overlay-content-container">
          <div className="overlay-content-header">
            <h3>
              { title }
            </h3>
            <div className="overlay-close" onClick={() => dispatch(hideOverlay(id))} />
          </div>
          <div id="overlay-content" className="overlay-content">
            { this.props.children }
            { error &&
              <div id="cam-error" className="cam-error">
                <div className="text">{ error.get('detail') }</div>
              </div>
            }
          </div>
          <div className="footer">
            <div className="footer-buttons">
              <Button
                  className="cancel-button"
                  type="button"
                  onClick={() => this.props.onCancel() }>
                  { this.props.cancelText }
              </Button>
              { this._getContinueButton() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
