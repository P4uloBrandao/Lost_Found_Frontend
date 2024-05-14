import React from 'react';
import LOGO from '../imgs/logo.png';
import Button from './Button';
import RIGHTARROW from '../imgs/rightarrow.png';
import PLUS from '../imgs/plus.png';


const Navbar = () => {
    return (
        <nav className='flex items-center w-full px-20 justify-between py-8'>
            <img src={LOGO} alt='logo navbar'></img>
            <div className='flex gap-8'>
                <Button imgSrc={RIGHTARROW} imgAlt={'right black arrow'} text={'SIGN IN'} className={'flex items-center justify-between w-button border border-neutral-950 rounded-xl py-4 px-6'} imgClass={'w-4'}/>
                <Button imgSrc={PLUS} imgAlt={'plus icon'} text={'MENU'} className={'bg-neutral-950 text-white flex items-center justify-between w-button border border-neutral-950 rounded-xl py-4 px-6'} imgClass={'w-8 bg-white rounded-full border border-neutral-950'}/>

            </div>
        </nav>
    )
}

export default Navbar