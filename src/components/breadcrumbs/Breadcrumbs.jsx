import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Breadcrumb from './Breadcrumb';

const Breadcrumbs = ({ history }) => {
    const pathBits = window.location.pathname.split('/');
    const redirectToBreadcrumb = (e) => {
        history.push(`${window.location.pathname.split('/').slice(0, parseInt(e.target.id, 10) + 1).join('/')}`);
    };

    return (
        <div className="breadcrumbs">
            <Breadcrumb id={0} redirect={redirectToBreadcrumb} length={pathBits.length} label="home" />
            { pathBits.map((pathBit, index) => {
                return pathBit ?
                    <Breadcrumb
                        key={pathBit}
                        id={index}
                        redirect={redirectToBreadcrumb}
                        length={pathBits.length}
                        label={pathBit} /> : null;
            })}
        </div>
    );
};

Breadcrumbs.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(Breadcrumbs);
