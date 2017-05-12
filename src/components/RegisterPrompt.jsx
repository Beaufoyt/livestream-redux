import React from 'react';
import PropTypes from 'prop-types';

export default function RegisterPrompt({ linkDisabled }) {
  return (
    <div className="register-prompt">
      <span>
        No account?
      <button
          disabled={linkDisabled}
          className="btn btn-link"
          onClick={() => this.handleRegisterChange()}>
          Click Here
      </button>
        to register
      </span>
    </div>
  );
}

RegisterPrompt.propTypes = {
  linkDisabled: PropTypes.bool,
};

RegisterPrompt.defaultProps = {
  linkDisabled: false,
};
