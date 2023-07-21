import React from 'react'
import './styles.css'
const Button = ({text,onClick,disabled,style}) => {
   console.log("style: ",style)
  return (
    <div className='custom-btn' onClick={onClick} disabled={disabled} style={style}>{text}</div>
    
  )
}

export default Button