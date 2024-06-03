import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import Grid from '@mui/material/Grid';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import axios from "axios";
import React,{ useState, useContext } from "react";
import './index.css';




const CardLostObjecs = ({ matchButton, catId,name, description, location, date, category, id,photo, status,highbid }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const handleViewMatches = () => {
    // Assuming you want to pass id and name as parameters
    navigate(`/matchObjects?param1=${catId}&param2=${name}`);
  };

  const handleViewInMaps = () => {
    // Add logic to view the location in maps
  };

  const handleRemoveLostObject = async () => {
    try {
      // Make an API call to delete the user profile
      const response = await axios.delete(`https://bidfinderbackend.ddns.net/api/lost-objects/${id}`);
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
    window.location.reload();
  };
  

  return (
    <Grid id="1" style={{ borderRadius:'1.25rem',boxShadow: '4px 4px 27.1px 0px rgba(0, 0, 0, 0.25)'}} container spacing={2}>
      <Grid id="2" style={{ margin: '2rem ',height: '15vh'}}  spacing={2}>
         <p className='p-absolute'> {category}</p>
             <img  style={{ width: '215px', height: '215px' ,    objectFit: 'cover',borderRadius:' 1.25rem'}}  src={photo} alt="" />  
      </Grid>
      <Grid style={{padding: '0rem 1rem ', width: 'auto'}} container spacing={2}>
        <Grid container spacing={3} sx={{justifyContent: 'center' ,padding: '2rem '}}>
          <Grid style={{paddingLeft: '1rem',textAlign: '-webkit-left', paddingTop: '1em',    height:' 5em'}} xs={12} xsOffset={3}  mdOffset={0}>
          <h2>{name}</h2>
          </Grid>
          <Grid  style={{ textAlignLast: 'left',paddingLeft: '1rem',    fontWeight: '300'}}xs={12} md={6} mdOffset="auto">
            <p>Highest bid: {highbid}</p>
            <p>Ends on: {date}</p>
            {/* <p>Lost at: {location}</p> */}
            <p className='descriptionBtn' onClick={handleViewMatches}>View more{'>'}</p>
          </Grid>
          <Grid xs={12} style={{textAlignLast: 'left',paddingLeft: '5rem',    fontWeight: '300'}} xsOffset={4} md={6} mdOffset={0}>
          <p style={{ fontWeight: '400' }}>Status:</p>
           <div>
            <p>{status}</p>
            </div>
          </Grid>
        </Grid>            

      </Grid>
    </Grid>
  );
};

export default CardLostObjecs;
