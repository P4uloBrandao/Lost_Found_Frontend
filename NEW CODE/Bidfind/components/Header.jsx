import React from 'react'
import LOGO from '../imgs/logo.png';
import Button from './Button';
import WHITEARROW from '../imgs/white arrow.png';
import GUION from '../imgs/guion.png';


const Header = () => {
  return (
    <header className='flex items-center justify-between py-4 px-8'>
        <img src={LOGO} alt='img logo'></img>
        <div className='flex gap-4'>
            <Button text={'Lost Item'} className={'bg-primaryGreen w-40 h-12 border border-neutral-950 rounded-buttonLostItem flex items-center px-2 text-2xl text-white justify-between'} imgSrc={WHITEARROW} imgName={'White Arrow'}/>
            <Button text={'MENU'} className={'border w-40 rounded-buttonLostItem h-12 border-neutral-950 text-2xl font-bold flex items-center justify-between pr-8 pl-2'} imgSrc={GUION}/>
        </div>
    </header>
  )
}

export default Header