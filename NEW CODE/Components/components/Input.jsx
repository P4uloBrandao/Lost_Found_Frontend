import React from 'react'

const Input = ({ inputType, inputName, className }) => {
  return (
    <input type={inputType} name={inputName} className={className}>
    </input>
  )
}

export default Input