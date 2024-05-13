import React from 'react';
import LOGO from '../imgs/footerlogo.png';
import INSTAGRAM from '../imgs/instagram.png';
import PINTEREST from '../imgs/pinterest.png';
import TWITTER from '../imgs/twitter.png';
import YOUTUBE from '../imgs/youtube.png';
import INPUTICON from '../imgs/input icon.png';

const Footer = () => {
    return (
        <footer className='flex items-center justify-between p-footer bg-footer mt-20'>
            <div className='flex flex-col items-start justify-center gap-6 ml-40'>
                <img src={LOGO} alt='logo img'></img>
                <div>
                    <p className='text-communityP text-white'>Copyright © 2020 BiD Find.er</p>
                    <p className='text-communityP text-white'>All rights reserved</p>
                </div>
                <div className='flex gap-5'>
                    <a className='p-1 flex items-center justify-center cursor-pointer rounded-full bg-slate-700'><img src={INSTAGRAM} alt='instagram logo'></img></a>
                    <a className='p-1 flex items-center justify-center cursor-pointer rounded-full bg-slate-700'><img src={PINTEREST} alt='pinterest logo'></img></a>
                    <a className='p-1 flex items-center justify-center cursor-pointer rounded-full bg-slate-700'><img src={TWITTER} alt='twitter logo'></img></a>
                    <a className='p-1 flex items-center justify-center cursor-pointer rounded-full bg-slate-700'><img src={YOUTUBE} alt='youtube logo'></img></a>
                </div>
            </div>
            <div className='flex items-start justify-between w-2/4'>
                <div className='flex flex-col items-start justify-start gap-5'>
                    <h4 className='text-white font-medium'>Company</h4>
                    <div className='flex flex-col gap-2 h-36'>
                        <a className='text-white text-xs' href='#'>Profile</a>
                        <a className='text-white text-xs' href='#'>Auctions</a>
                        <a className='text-white text-xs' href='#'>Lost an item</a>
                        <a className='text-white text-xs' href='#'>Pricing</a>
                        <a className='text-white text-xs' href='#'>Testimonials</a>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-start gap-5'>
                    <h4 className='text-white font-medium'>Support</h4>
                    <div className='flex flex-col gap-2 h-36'>
                        <a className='text-white text-xs' href='#'>Teams of service</a>
                        <a className='text-white text-xs' href='#'>Legal</a>
                        <a className='text-white text-xs' href='#'>Privacy Policy</a>
                        <a className='text-white text-xs' href='#'>Team</a>
                    </div>
                </div>
                <div className='flex flex-col gap-6 h-36 mr-52'>
                    <h4 className='text-white font-medium'>Stay up to date</h4>
                    <div className='relative'>
                        <input className='p-3 rounded-xl bg-slate-500 text-xs w-52' type='text' placeholder='Your email address' />
                        <img src={INPUTICON} alt='input icon' className='absolute top-3 left-44'></img>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer