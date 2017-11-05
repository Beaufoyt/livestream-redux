import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { toggleOverlay } from '../actions/overlays';
import { overlays } from '../constants/Overlays';

import ClickableDiv from './utils/ClickableDiv';
import PureComponent from './PureComponent';

const submitButton = true;

class LoginOverlay extends PureComponent {

    state = {
        bodyClasses: document.body.className,
    }

    componentDidMount() {
        document.body.className = `${this.bodyClasses} no-scroll`;
    }

    componentWillUnmount() {
        document.body.className = this.bodyClasses;
    }

    render() {
        return (
            this.props.isLoginOverlayOpen &&
            <div>
                <ClickableDiv className="overlay" onClick={() => this.props.toggleOverlay(overlays.login, false)} />
                <div className="overlay-container">
                    <div className="overlay-header">
                        <h3>Hello</h3>
                    </div>
                    <div className="overlay-contents">
                        Love and coo around boyfriend who purrs and makes the perfect moonlight eyes so i can purr and swat the glittery gleaming yarn to him (the yarn is from a $125 sweater) hiding behind the couch until lured out by a feathery toy. Scratch me there, elevator butt.
                    </div>
                    <div className="overlay-footer">
                        <button className={`btn btn-overlay ${submitButton ? '' : 'full-width'}`}>Cancel</button>
                        { submitButton &&
                        <button className="btn btn-icon btn-overlay">
                            <i className="fa fa-fw fa-sign-in" />
                            Log in
                        </button> }
                    </div>
                </div>
            </div>
        );
    }
}

LoginOverlay.propTypes = {
    toggleOverlay: PropTypes.func.isRequired,
    isLoginOverlayOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isLoginOverlayOpen: state.overlays.login,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleOverlay }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginOverlay);
