import React from 'react'
import Button from './Button';
import WHITEARROW from '../imgs/white arrow.png';

const Demo = () => {
  return (
    <section className='mt-40 flex items-center justify-center flex-col gap-8'>
        <h2 className='text-marketingTitle font-bold w-imgHero text-center'>Pellentesque suscipit fringilla libero eu.</h2>
        <Button text={'Get a Demo'} imgSrc={WHITEARROW} imgName={'White arrow'} className={'w-32 h-9 bg-heroSubtitle flex gap-4 items-center justify-center text-white p-1 text-xs'}/>
    </section>
  )
}

export default Demo