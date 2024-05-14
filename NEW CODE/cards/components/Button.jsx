import React from 'react'

const Button = ({ text, className, imgSrc, imgAlt, imgClass}) => {
  return (
    <button className={className}>
        <span className='flex gap-4 items-center w-full text-xl font-bold'>{text} <img className={imgClass} src={imgSrc} alt={imgAlt}></img></span>
    </button>
  )
}

export default Button