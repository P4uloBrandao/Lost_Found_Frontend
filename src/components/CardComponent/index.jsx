import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import axios from "axios";
import React, { useState } from "react";
import './index.css';

const CardContainer = styled(Grid)`
  border-radius: 1.25rem;
  box-shadow: 4px 4px 27.1px 0px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content:center;
  margin-bottom:40px;
`;

const ImageContainer = styled(Grid)`
height: 215px;
width: 215px;
position: relative;
margin-right: 2rem;
  
`;

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 1.25rem;

`;

const CategoryBadge = styled.div`
  margin: 9pt;
  background: var(--black-color);
  position: absolute;
  border-radius: 1.24rem;
  color: var(--white-color);
  padding: 0.2rem 0.5rem;
`;

const DetailsContainer = styled(Grid)`
  flex-grow: 1;
  margin-left:10px;
`;

const Title = styled.h2`
  text-align: left;
  margin: 0;
`;

const Info = styled.p`
  text-align: left;
  font-weight: 300;
  margin: 0.25rem 0;
`;

const StatusContainer = styled.div`
  font-weight: 300;
  margin-top: 1rem;
`;

const RemoveButton = styled.p`

  font-size: 0.8rem;
  font-weight: 400;
  color: var(--secondary-grey-color);
  right: 2rem;
  bottom: 2rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    font-weight: bold;
    color: var(--primary-green-color);
  }
`;

const CardLostObjects = ({ matchButton, catId, name, description, location, date, category, id, photo, status }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleViewMatches = () => {
    navigate(`/matchObjects?param1=${id}&param2=${name}`);
  };

  const handleViewInMaps = () => {
    // Add logic to view the location in maps
  };

  const handleRemoveLostObject = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/lost-objects/${id}`);
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Remove lost object failed:', error);
      setErrorMessage(error.response?.data?.error || 'An unexpected error occurred. Please try again.');
    }
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
            <p>Lost on: {date}</p>
            <p>Lost at: {location}</p>
            <p className='mapsBtn' onClick={handleViewInMaps}>View in Maps</p>
          </Grid>
          <Grid xs={12} style={{textAlignLast: 'left',paddingLeft: '5rem',    fontWeight: '300'}} xsOffset={4} md={6} mdOffset={0}>
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
        <p  className='removeBtn' >  <span onClick={handleRemoveLostObject}style={{ textDecoration: 'underline',paddingLeft: '5rem' }}>Remove</span> lost object</p>
    </Grid>

  );
};

export default CardLostObjects;
