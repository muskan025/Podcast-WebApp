import React from 'react'
import './styles.css'
const Button = ({ text, onClick, disabled, style,logOutStyle }) => {
  const buttonStyle = logOutStyle ? { ...style, ...logOutStyle } : style;
  return (
    <div
      className="custom-btn"
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      
    >
      {text}
    </div>
  );
};

export default Button