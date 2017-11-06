import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { toggleOverlay } from '../actions/overlays';

import ClickableDiv from './utils/ClickableDiv';
import PureComponent from './PureComponent';

class Overlay extends PureComponent {

    closeOverlay = () => {
        this.props.toggleOverlay(this.props.id, false);
    };

    render() {
        return (
            this.props.overlaysState[this.props.id] &&
            <div>
                <ClickableDiv className="overlay" onClick={this.closeOverlay} />
                <div className="overlay-container">
                    <div className="overlay-header">
                        <h3>{ this.props.title }</h3>
                    </div>
                    <div className="overlay-contents">
                        { this.props.children }
                    </div>
                    <div className="overlay-footer">
                        <button
                            onClick={this.closeOverlay}
                            className={`btn btn-overlay ${this.props.submit ? '' : 'full-width'}`}>
                            { this.props.cancelText }
                        </button>
                        { this.props.submit &&
                        <button className={`btn btn-overlay ${this.props.submitIcon ? 'btn-icon' : ''}`}>
                            <i className={`fa fa-fw fa-${this.props.submitIcon ? this.props.submitIcon : ''}`} />
                            { this.props.submitText }
                        </button> }
                    </div>
                </div>
            </div>
        );
    }
}

Overlay.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string,
    ]),
    toggleOverlay: PropTypes.func.isRequired,
    overlaysState: PropTypes.shape({}),
    submit: PropTypes.func,
    id: PropTypes.string.isRequired,
    submitIcon: PropTypes.string,
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    title: PropTypes.string.isRequired,
};

Overlay.defaultProps = {
    children: [],
    submit: null,
    submitIcon: '',
    submitText: 'Submit',
    cancelText: 'Cancel',
    overlaysState: {},
};

const mapStateToProps = state => ({
    overlaysState: state.overlays,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleOverlay }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
