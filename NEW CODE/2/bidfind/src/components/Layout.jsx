import React from 'react'
import Button from './Button'

const Layout = ({ sectionClassName, imgSrc, imgAlt, imgClassName, classNameArt, titleClassName, title, pClassName, pText, btnClassname, btnText }) => {
  return (
    <section className={sectionClassName}>
        <img src={imgSrc} alt={imgAlt} className={imgClassName}></img>
        <article className={classNameArt}>
            <h2 className={titleClassName}>{title}</h2>
            <p className={pClassName}>{pText}</p>
            <Button className={btnClassname} text={btnText}/>
        </article>
    </section>
  )
}

export default Layout