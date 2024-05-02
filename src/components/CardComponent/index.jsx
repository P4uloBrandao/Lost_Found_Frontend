import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import Grid from '@mui/material/Grid';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import axios from "axios";
import React,{ useState, useContext } from "react";
import './index.css';


const CardLostObjecs = ({ name, description, location, date, category, id,photo, status }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleViewMatches = () => {
    // Add logic to navigate to the matches page
    // For example: navigate('/matches');
  };

  const handleViewInMaps = () => {
    // Add logic to view the location in maps
  };

  const handleRemoveLostObject = async () => {
    try {
      // Make an API call to delete the user profile
      const response = await axios.delete(`http://localhost:3000/api/lost-objects/${id}`);
      console.log(response.data); // Log the response from the server
      // Handle success, e.g., redirect to login or show a success message
    } catch (error) {
      console.error('Remove lost object failed:', error);
  
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error); // Set the error message if present in the error response
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  return (
    <Grid style={{ borderRadius:'1.25rem',boxShadow: '4px 4px 27.1px 0px rgba(0, 0, 0, 0.25)',   alignContent: 'center', justifyContent: 'center'}} container spacing={2}>
      <Grid style={{ margin: '1rem 2rem ',height: '215px', width: '215px'}}  spacing={2}>
       <div> <p className='p-absolute'> {category}</p><img  style={{ width: '215px', height: '215px' ,    objectFit: 'cover',borderRadius:' 1.25rem'}}  src={photo} alt="" />
       </div>
        
      </Grid>
      <Grid style={{padding: '0rem 2rem ', width: 'auto',alignSelf: 'center'}} container spacing={2}>
        <Grid container spacing={3} sx={{justifyContent: 'center', flexGrow: 1 }}>
          <Grid style={{paddingLeft: '1rem',textAlign: '-webkit-left', paddingTop: '1em',    height:' 5em'}} xs={12} xsOffset={3}  mdOffset={0}>
          <h2>{name}</h2>
          </Grid>
          <Grid  style={{ textAlignLast: 'left',paddingLeft: '1rem',    fontWeight: '300'}}xs={12} md={6} mdOffset="auto">
            
            <p>Lost on: {date}</p>
            <p>Lost at: {location}</p>
            <p className='mapsBtn' onClick={handleViewInMaps}>View in Maps</p>
            <p className='descriptionBtn' onClick={handleViewMatches}>View Description {'>'}</p>
          </Grid>
          <Grid xs={12} style={{textAlignLast: 'left',paddingLeft: '2rem',    fontWeight: '300'}} xsOffset={4} md={6} mdOffset={0}>
          <p style={{ fontWeight: '400' }}>Status:</p>

           
           <div>
            <p>{status}</p>
            </div>
            <p className='matchesBtn' onClick={handleViewMatches}>View Matches {'>'} </p>

          </Grid>
        </Grid>            

      </Grid>
        <p  className='removeBtn' >  <span onClick={handleRemoveLostObject}style={{ textDecoration: 'underline' }}>Remove</span> lost object</p>
    </Grid>
  );
};

export default CardLostObjecs;
