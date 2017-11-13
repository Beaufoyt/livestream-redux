import React from 'react';
import PropTypes from 'prop-types';

import classnames from '../../helpers/classnames';

/* eslint-disable jsx-a11y/no-static-element-interactions */
const ClickableDiv = props => (
    <li
        onBlur={props.onBlur}
        tabIndex={0}
        disabled
        id={props.id}
        key={props.key}
        value={props.value}
        className={classnames(props.className, { disabled: props.disabled })}
        onClick={props.onClick}>
        { props.children }
    </li>
);

ClickableDiv.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
    key: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string,
    ]),
};

ClickableDiv.defaultProps = {
    onClick: null,
    className: '',
    value: '',
    id: '',
    children: null,
    onBlur: null,
    key: '',
    disabled: false,
};

export default ClickableDiv;
