import React from 'react'

const Button = ({ className, text, imgSrc, imgName}) => {
  return (
    <button className={className}>
        {text}
        {imgSrc && <img src={imgSrc} alt={imgName}></img>}
    </button>
  )
}

export default Button