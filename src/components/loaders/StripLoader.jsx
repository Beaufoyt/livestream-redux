import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import classnames from '../../helpers/classnames';
import { toggleSidebar } from '../../actions/sidebar';
import { fakeLoad } from '../../actions/loader';

import PureComponent from '../PureComponent';

class StripLoader extends PureComponent {

    state = {
        showLoader: this.props.loading,
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.loading && newProps.loading) {
            this.openLoader();
        } else if (this.props.loading && !newProps.loading) {
            this.closeLoader();
        }
    }
    openLoader = () => {
        this.setState({ showLoader: true });
    }

    closeLoader = () => {
        setTimeout(() => {
            this.setState({ showLoader: false });
        }, 300);
    }

    render = () => {
        return (
            this.state.showLoader &&
                <div className="strip-loader">
                    <div
                        className={classnames('loading-bar', {
                            closing: !this.props.loading && this.state.showLoader,
                        })} />
                </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.loader.loading,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleSidebar, fakeLoad }, dispatch)
);

StripLoader.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StripLoader);
