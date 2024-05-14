import React from 'react';
import CARDIMG from "../imgs/cardImg.png";
import { Card } from './Card';



const Cards = () => {
  return (
    <section className='flex mt-40 gap-40 items-center w-full justify-center'>
        <Card classNameCard={'w-cardWidth h-cardHeight flex flex-col shadow-2xl rounded-xl'} imgSrc={CARDIMG} imgClassName={'rounded-t-xl h-full w-full'} productName={'Cartier Wallet'} price={'64 EUR'} timeExpire={'8 days left'} uds={'4 bids'}/>
        <Card classNameCard={'w-cardWidth h-cardHeight flex flex-col shadow-2xl rounded-xl'} imgSrc={CARDIMG} imgClassName={'rounded-t-xl h-full w-full'} productName={'Cartier Wallet'} price={'64 EUR'} timeExpire={'8 days left'} uds={'4 bids'}/>
        <Card classNameCard={'w-cardWidth h-cardHeight flex flex-col shadow-2xl rounded-xl'} imgSrc={CARDIMG} imgClassName={'rounded-t-xl h-full w-full'} productName={'Cartier Wallet'} price={'64 EUR'} timeExpire={'8 days left'} uds={'4 bids'}/>
    </section>
  )
}

export default Cards