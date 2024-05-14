import React from 'react';
import LIKE from '../imgs/like.png';

export const Card = ({ classNameCard, imgSrc, imgAlt, imgClassName, productName, timeExpire, uds, price }) => {
    return (
        <div className={classNameCard}>
            <div className="relative h-1/2">
                <img src={imgSrc} alt={imgAlt} className={imgClassName} />
                <div className='flex absolute top-2 right-2 gap-2'>
                    <span className=" text-white bg-black px-2 py-2 rounded-xl text-xs text-center">Wallets</span>
                    <img className='w-7 h-8' src={LIKE} alt='like icon'></img>
                </div>
            </div>
            <div className="p-4 h-1/2 flex flex-col gap-2">
                <div className="flex flex-col justify-between items-start mt-2">
                    <h3 className="text-2xl font-normal text-neutral-950">{productName}</h3>
                    <span>{timeExpire}</span>
                </div>
                <span className='mt-10'>{uds}</span>
                <div className="flex justify-between items-start">

                    <span className="text-2xl">{price}</span>
                    <button className="text-titleGreen hover:text-blue-600">View auction</button>

                </div>

            </div>
        </div>
    )
}
