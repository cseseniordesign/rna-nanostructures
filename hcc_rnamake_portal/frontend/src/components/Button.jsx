import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

const STYLES = [
  "btn--primary--solid",
];

const SIZES = ["btn--medium", "btn--large", 'btn--xlarge'];

export const Button = ({
  id,
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize

}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      id={id}
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
    buttonSize: PropTypes.string,
    buttonStyle: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.object,
    id: PropTypes.string
};