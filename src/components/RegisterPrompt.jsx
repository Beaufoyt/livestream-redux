import React from 'react';
import PropTypes from 'prop-types';

export default function RegisterPrompt({ linkDisabled, onClick }) {
  return (
    <div className="register-prompt">
      <span>
        No account?
      <button
          disabled={linkDisabled}
          className="btn btn-link"
          onClick={onClick}>
          Click Here
      </button>
        to register
      </span>
    </div>
  );
}

RegisterPrompt.propTypes = {
  linkDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

RegisterPrompt.defaultProps = {
  linkDisabled: false,
  onClick: () => {},
};
