import React from 'react';
import HAMMER from '../imgs/hammer.png';

const Banner = () => {
    return (
        <section className='flex w-full justify-between px-40 mt-28 h-64'>
            <article className='w-1/2 flex flex-col items-start gap-20'>
                <div>
                    <h1 className='leading-titleBanner text-titleBanner font-bold'>Auction #231</h1>
                    <h5 className='leading-titleBanner text-titleBanner text-titleGreen font-bold'>Cartier Wallet</h5>
                </div>
                <ul className='flex gap-4 text-titleGreen items-center ml-10'>
                    <a href='#' className='leading-aBanner texxt-aBanner underline'>All Auctions</a>
                    <span>/</span>
                    <a href='#' className='leading-aBanner texxt-aBanner underline'>Current Auctions</a>
                    <span>/</span>
                    <a href='#' className='leading-aBanner texxt-aBanner underline'>#253</a>
                </ul>
            </article>
            <img className='w-1/2' src={HAMMER} alt='hammer icon'></img>
        </section>
    )
}

export default Banner