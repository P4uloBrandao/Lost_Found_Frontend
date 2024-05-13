import React from 'react';
import GREENARROW from '../imgs/green arrow.png';

const Marketing = () => {
    return (
        <section className='flex flex-col items-center justify-center mt-40 gap-8'>
            <article className='flex flex-col items-center justify-center w-1/4 text-center gap-2'>
                <h2 className='text-2xl text-heroTitle font-bold'>Caring is the new marketing</h2>
                <p className='text-xs text-heroP'>The Nextcent blog is the best place to read about the latest membership insights, trends and more. See who's joining the community, read about how our community are increasing their membership income and lot's more.</p>
            </article>
            <section>
                <article className='flex gap-8'>
                    <div className='bg-first-card w-60 h-60 bg-no-repeat bg-cover rounded-xl relative'>
                        <div className='w-whiteCardWidth h-whiteCardHeight bg-white flex flex-col items-center justify-center p-4 gap-4 rounded-lg text-center absolute top-40 left-2'>
                            <p className='text-sm font-medium text-heroTitle'>Creating Streamlined Safeguarding Processes with OneRen</p>
                            <a className='flex gap-4 text-heroSubtitle font-medium'>Readmore <img src={GREENARROW} alt='green arrow'></img></a>
                        </div>
                    </div>
                    <div className='bg-second-card w-60 h-60 bg-no-repeat bg-cover rounded-xl relative'>
                        <div className='w-whiteCardWidth h-whiteCardHeight bg-white flex flex-col items-center justify-center p-4 gap-4 rounded-lg text-center absolute top-40 left-2'>
                            <p className='text-sm font-medium text-heroTitle'>What are your safeguarding responsibilities and how can you manage them?</p>
                            <a className='flex gap-4 text-heroSubtitle font-medium'>Readmore <img src={GREENARROW} alt='green arrow'></img></a>
                        </div>
                    </div>
                    <div className='bg-third-card w-60 h-60 bg-no-repeat bg-cover rounded-xl relative'>
                        <div className='w-whiteCardWidth h-whiteCardHeight bg-white flex flex-col items-center justify-center p-4 gap-4 rounded-lg text-center absolute top-40 left-2'>
                            <p className='text-sm font-medium text-heroTitle'>Revamping the Membership Model with Triathlon Australia</p>
                            <a className='flex gap-4 text-heroSubtitle font-medium'>Readmore <img src={GREENARROW} alt='green arrow'></img></a>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    )
}

export default Marketing