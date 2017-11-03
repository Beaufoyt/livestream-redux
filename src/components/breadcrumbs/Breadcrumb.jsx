import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Breadcrumb = props => (
    <span>
        <button id={props.id} onClick={props.redirect} className="crumb">
            { props.label }
        </button>
        { props.length - 1 !== props.id ? <i className="margin-right fa fa-chevron-right" /> : null }
    </span>
);

Breadcrumb.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    redirect: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
};

export default withRouter(Breadcrumb);
