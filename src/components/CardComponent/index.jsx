import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import Grid from '@mui/material/Grid';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import axios from "axios";
import React,{ useState, useContext } from "react";
import './index.css';

import LostItemComponent from '../matchItemsComponents/LostItemComponent';


const CardLostObjecs = ({ matchButton,catId,name, description, location, date, category, id,photo, status, onCardClick}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);


  const handleViewMatches = () =>{
    onCardClick(id);
  }
  const handleViewInMaps = () => {
    // Add logic to view the location in maps
  };

  const handleRemoveLostObject = async () => {
    try {
      // Make an API call to delete the user profile
      const response = await axios.delete(process.env.REACT_APP_API_URL+`/api/lost-objects/${id}`);
      console.log(response.data); // Log the response from the server
      // Handle success, e.g., redirect to login or show a success messages
    } catch (error) {
      console.error('Remove lost object failed:', error);
  
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error); // Set the error message if present in the error response
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
    window.location.reload();
  };
  

  return (
    <Grid style={{ borderRadius:'1.25rem',boxShadow: '4px 4px 27.1px 0px rgba(0, 0, 0, 0.25)',marginTop:'60px'}} container spacing={2}>
      <Grid style={{ margin: '1rem 2rem ',height: '215px', width: '215px'}}  spacing={2}>
       <div> <p className='p-absolute'> {category}</p><img  style={{ width: '215px', height: '215px' ,    objectFit: 'cover',borderRadius:' 1.25rem'}}  src={'https://res.cloudinary.com/dkyu0tmfx/image/upload/v1/objectImages/'+photo} alt="" />
       </div>
        
      </Grid>
      <Grid style={{padding: '0rem 2rem ', width: 'auto'}} container spacing={2}>
        <Grid container spacing={3} sx={{justifyContent: 'center' ,padding: '2rem '}}>
          <Grid style={{paddingLeft: '1rem',textAlign: '-webkit-left', paddingTop: '1em',    height:' 5em'}} xs={12} xsOffset={3}  mdOffset={0}>
          <h2>{name}</h2>
          <p  className='removeBtn' >  <span onClick={handleRemoveLostObject}style={{ textDecoration: 'underline' }}>Remove</span> lost object</p>
          </Grid>
          <Grid  style={{ textAlign: 'left',paddingLeft: '1rem',    fontWeight: '300'}}xs={12} md={6} mdOffset="auto">
            <p>Lost on: {date}</p>
            <p>Lost at: {location}</p>
            
          </Grid>
          <Grid xs={12} style={{textAlign: 'left',paddingLeft: '5rem',    fontWeight: '300'}} xsOffset={4} md={6} mdOffset={0}>
          <p style={{ fontWeight: '400' }}>Status:</p>
           <div>
            <p>{status}</p>
            </div>
              {matchButton && (
              <p className='matchesBtn' onClick={handleViewMatches}>View Matches {'>'} </p>
            )}
          </Grid>
        </Grid>            

      </Grid>
    </Grid>
   
  );
};

export default CardLostObjecs;