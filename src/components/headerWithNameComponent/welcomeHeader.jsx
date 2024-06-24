import React from 'react';
import banner from './banner_geral.png'
import './welcomeHeader.css'

const WelcomeHeaderComponent = ({name, description}) => {
  return (
    <div className="header-component">
        <div className='header-component-left'>
            <span className='hi-component'>Hi,</span>
            <span className='name-component'>{name}</span>
            <span className='text-component'>{description}</span>
        </div>
        <div className='header-component-right'>
            <img src={banner} alt="banner geral" />
        </div>
    </div>
  );
};

export default WelcomeHeaderComponent;
  