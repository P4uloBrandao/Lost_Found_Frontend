import React from 'react';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './LostItemHeader.css'

const LostItemHeader = ({ title}) => {
  return (
    <div className="lost-item-header">
      <div className='title-name'>
        <span className='name'>{title}</span>
        <span className='number'>#26785</span>
      </div>
      <div className='page-link'>
        <a href="">My Lost Objects </a>
        <span> &gt;</span>
        <a  className='link-nome' href="">{title}</a>
      </div>
    </div>
  );
};

export default LostItemHeader;
