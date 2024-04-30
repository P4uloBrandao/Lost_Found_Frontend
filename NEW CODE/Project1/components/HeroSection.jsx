import React from 'react';
import HEROIMG from '../imgs/heroimg.png';

const HeroSection = () => {
    return (
        <section className='py-20 px-18 bg-heroSection w-full flex justify-center items-center'>
            <article className='flex justify-center items-center w-3/4 gap-4'>
                <div className='w-heroTitleWidth font-familyInter flex flex-col gap-4   '>
                    <h1 className='text-6xl leading-heroTitle font-bold text-heroTitleColor'>Found Something!?
                    </h1>
                    <span className='text-6xl leading-heroTitle font-bold text-heroSpan'>Register for Owner to Find.</span>
                    <p className='font-xs text-paragraphColor'>
                        Explore and, who knows, be part of a new story through our exclusive auctions.
                    </p>
                    <a className='text-white px-5 py-2 bg-heroSpan w-28 text-center rounded-buttonSign' href='#'>Sign up</a>
                </div>
                <img className='relative w-imgHero h-imgHeight right-48 top-20' src={HEROIMG} alt='Hero image'></img>
            </article>

        </section>
    )
}

export default HeroSection