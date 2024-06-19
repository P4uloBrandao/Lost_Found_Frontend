import React from 'react';
import banner from './banner_auction.png'
import './bannerHeader.css'

const AuctionHeaderComponent = ({name}) => {
  return (
    <div className="header-component">
        <div className='header-component-left'>
            <span className='hi-component'>Auction#231</span>
            <span className='name-component'>{'Cartier Wallet'}</span>
        </div>
        <div className='header-component-rigth'>
            <img src={banner} alt="banner geral" />
        </div>
    </div>
  );
};

export default AuctionHeaderComponent;
