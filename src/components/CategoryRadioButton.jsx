import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function CategoryRadioButton({ activeCategory, onClick, id }) {
  const className = `btn category-button ${id}`;

  return (
    <Button
        active={id === activeCategory}
        onClick={() => onClick(id)}
        className={className}>
      { id }
    </Button>
  );
}

CategoryRadioButton.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
