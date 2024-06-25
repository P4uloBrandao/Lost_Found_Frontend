import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Grid } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './MatchComponentStyle.css';
import { InputSubmit } from '../../assets/StylePopularComponent/style';

const MatchFoundComponent = ({ matches, lostObject }) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const handleClaimedObject = async (lostObjectId, foundObjectId) => {
    setConfirmationOpen(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/accept/`, {
        lostObjectId,
        foundObjectId,
      });
      
      console.log('Object claimed successfully');
    } catch (error) {
      console.error('Error claiming object:', error);
     
    }

    setConfirmationOpen(false); // Close confirmation dialog after request
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    // Additional logic after closing confirmation dialog, if necessary
  };

  return (
    <div>
      <h2 style={{ marginTop: '60px', textAlign: 'left' }}>Matches Found</h2>
      {matches.map((match, index) => (
        <Grid
          key={index}
          container
          spacing={2}
          style={{
            borderRadius: '1.25rem',
            boxShadow: '4px 4px 27.1px 0px rgba(0, 0, 0, 0.25)',
            marginTop: '20px',
            maxHeight: '280px',
            width: '105%',
            overflow: 'hidden'
          }}
        >
          <Grid style={{ margin: '1rem 2rem', height: '215px', width: '215px' }} spacing={2}>
            <div>
              <p className='p-absolute'>{match.category}</p>
              <img
                style={{ width: '215px', height: '215px', objectFit: 'cover', borderRadius: '1.25rem' }}
                src={match.objectImage ? `https://res.cloudinary.com/dkyu0tmfx/image/upload/v1/objectImages/${match.objectImage}` : 'https://res.cloudinary.com/dkyu0tmfx/image/upload/v1719065883/objectImages/default_obj_ht0fde.png'}
                alt={'Image Not Found'}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={4} style={{ padding: '1rem' }}>
            <h3>{match.title}</h3>
            <p>Found on: {match.foundDate}</p>
            <p>Found at: {match.location}</p>
            <InputSubmit
              onClick={() => handleClaimedObject(lostObject.object_id, match.object_id)}
              className="input-submit"
              value="Register Object"
            >
              Claime Object
            </InputSubmit>
          </Grid>
          <Grid item xs={12} sm={4} style={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
            <div className="SimilarityContainer" style={{ width: '100%' }}>
              <h4 style={{ marginRight: '5px' }}>Similarity</h4>
              <div className="CircularGraph" style={{ width: '50px', marginRight: '1rem' }}>
                <CircularProgressbar
                  value={match.similarity}
                  text={`${match.similarity.toFixed(2)}%`}
                  styles={buildStyles({
                    textSize: '30px',
                    pathColor: '#007bff',
                    textColor: '#000',
                    trailColor: '#e0e0e0',
                  })}
                />
              </div>
              <div>
                <ul className="SimilarityItems" style={{ marginLeft: '10px', padding: 0, listStyleType: 'none', textAlign: 'left' }}>
                  {Object.keys(match.similarityItems).map((key, index) => (
                    <li key={index}>{key}: {match.similarityItems[key].toFixed(2)}%</li>
                  ))}
                </ul>
              </div>
            </div>
          </Grid>
        </Grid>
      ))}
      <h2 style={{ marginTop: '80px', textAlign: 'left' }}>More Lost Objects</h2>
    </div>
  );
};

export default MatchFoundComponent;
