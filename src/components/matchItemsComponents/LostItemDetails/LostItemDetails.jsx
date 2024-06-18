import React, { useState } from 'react';
import './LostItemDetails.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOn from '@mui/icons-material/LocationOn';
import mapsIcon from './Map-location.svg'

const LostItemDetails = ({status,description,location,categoy,lost_date,enddate }) => {
  const [dataItem, setDataItem]=useState([status,description,location,categoy,lost_date,enddate])

  return (
    <div className="lost-item-details">
      <div className="first_row">
      <div className="lost-item-status">
        <div>
          <span className='status-title'>Status:</span>
          <span className='status-value'>{dataItem[0]}</span>
        </div>
        <div>
          <span className='matches'>10 Matches Found</span>
        </div>
        <div>
            <span className='remove-Item'>Remove Item</span>
        </div>
      </div>
      <div className="lost-item-status">
        <div>
          <span className='status-title'>Category:</span>
          <span className='status-value'>{dataItem[3]}</span>
        </div>
        <div>
          <span className='matches'>Lost Date:{dataItem[4]}</span>
        </div>
        <div>
            <span className='remove-Item'>End Date: {dataItem[4]}</span>
        </div>
      </div>
      </div>


      <div className="lost-item-location">
        <div className='location-data'>
          <span className='location-title'>Location</span>
          <div className='location-value'>
            <span className='location-icon'><LocationOn/></span>
            <span className='location-value-data'>{dataItem[2]}</span>
          </div>
          <span className='get-coordinates'>Get GPS coordinates</span>
        </div>
        <div className='location-image'>
          <img src={mapsIcon} alt="maps" />
        </div>
      
      </div>


        <div className="lost-item-description">
          <span className='description-title'>Description:</span>
          <p className='description-value'>{dataItem[1]}</p>
        </div>

      



      {/* Lost item location */}
   
  </div>
  );
};

export default LostItemDetails;
