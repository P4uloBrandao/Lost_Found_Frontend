import React from 'react'

const Article = ({ articleClassName, imgClassName, imgSrc, imgAlt, textClassName, text, pClassName, pText}) => {
  return (
    <article className={articleClassName}>
        <img className={imgClassName} src={imgSrc} alt={imgAlt}></img>
        <h3 className={textClassName}>{text}</h3>
        <p className={pClassName}>{pText}</p>
    </article>
  )
}

export default Article