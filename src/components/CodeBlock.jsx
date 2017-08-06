import React from 'react';
import PropTypes from 'prop-types';

const CodeBlock = props => (
    <blockquote className={`code-block ${props.classes}`}>
        { props.content }
    </blockquote>
);

CodeBlock.propTypes = {
    classes: PropTypes.string,
    content: PropTypes.string,
};

CodeBlock.defaultProps = {
    classes: '',
    content: '',
};

export default CodeBlock;
