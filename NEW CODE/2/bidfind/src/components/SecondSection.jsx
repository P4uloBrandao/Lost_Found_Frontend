import React from 'react';
import DUO from '../imgs/duo.png';
import HANDS from '../imgs/hands icon.png';
import EVENT from '../imgs/event.png';
import PAYMENT from '../imgs/payment.png';

const SecondSection = () => {
    return (
        <section className='flex w-full justify-center items-center mt-40 gap-60'>
            <article>
                <h2 className='text-2xl text-heroTitle font-bold'>Helping a local</h2>
                <h5 className='text-2xl text-heroSubtitle font-bold'>business reinvent itself</h5>
                <p className='text-xs text-heroP'>We reached here with oyr hard work and dedication</p>
            </article>
            <article className='grid grid-rows-2 grid-cols-2 gap-14'>
                <div className='flex gap-4'>
                    <img className='w-9 h-9' src={DUO} alt='duo icon'></img>
                    <div>
                        <h3 className='font-bold text-heroTitle text-2xl'>2,245,341</h3>
                        <p className='text-xs text-heroP'>Members</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img className='w-9 h-9' src={HANDS} alt='hands icon'></img>
                    <div>
                        <h3 className='font-bold text-heroTitle text-2xl'>46,328</h3>
                        <p className='text-xs text-heroP'>Clubs</p>
                    </div>

                </div>
                <div className='flex gap-4'>
                    <img className='w-9 h-9' src={EVENT} alt='event icon'></img>
                    <div>
                        <h3 className='font-bold text-heroTitle text-2xl'>828,867</h3>
                        <p className='text-xs text-heroP'>Event Bookings</p>
                    </div>

                </div>
                <div className='flex gap-4'>
                    <img className='w-9 h-9' src={PAYMENT} alt='payment icon'></img>
                    <div>
                        <h3 className='font-bold text-heroTitle text-2xl'>1,926,436</h3>
                        <p className='text-xs text-heroP'>Payments</p>
                    </div>

                </div>
            </article>
        </section>
    )
}

export default SecondSection