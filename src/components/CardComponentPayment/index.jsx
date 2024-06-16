import { useNavigate } from 'react-router-dom'; 
import Grid from '@mui/material/Grid';
import axios from "axios";
import React, { useState } from "react";
import './index.css';
import { InputSubmit, Container, InputBox, Title, CategoryTitle } from '../../assets/StylePopularComponent/style';

// const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

const CardPayments = ({ catId, name, location, category, photo, status, highbid }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  // const handlePay = async () => {
  //   const stripe = await stripePromise;
  //   const response = await fetch('/create-checkout-session', { method: 'POST' });
  //   const session = await response.json();
  //   const result = await stripe.redirectToCheckout({ sessionId: session.id });
  //   if (result.error) {
  //     console.error(result.error.message);
  //   }
  // };

  return (
    <Grid id="1" style={{ borderRadius: '1.25rem', boxShadow: '4px 4px 27.1px 0px rgba(0, 0, 0, 0.25)' }} container spacing={2}>
      <Grid id="2" style={{ margin: '2rem', height: '15vh' }} spacing={2}>
        <p className='p-absolute'>{category}</p>
        <img style={{ width: '215px', height: '200px', objectFit: 'cover', borderRadius: '1.25rem' }} src={photo} alt="" />
      </Grid>
      <Grid style={{ padding: '0rem 1rem', width: 'auto' }} container spacing={2}>
        <Grid container spacing={3} sx={{ justifyContent: 'center', padding: '2rem' }}>
          <Grid style={{ paddingLeft: '1rem', textAlign: '-webkit-left', paddingTop: '1em', height: '5em' }} xs={12} xsOffset={3} mdOffset={0}>
            <h2>{name}</h2>
          </Grid>
          <Grid style={{ textAlign: 'left', paddingLeft: '1rem', fontWeight: '300' }} xs={12} md={6} mdOffset="auto">
            <p style={{ fontWeight: '400' }}>Final price: <strong>{highbid}</strong></p>
            <p style={{ fontWeight: '400' }}>Pick up location: <strong>{location}</strong></p>
          </Grid>
          <Grid xs={12} style={{ textAlignLast: 'left', paddingLeft: '1rem', fontWeight: '300' }} xsOffset={4} md={6} mdOffset={0}>
            <p style={{ fontWeight: '400' }}>Payment Status:</p>
            <div>
              <p style={{ fontWeight: '500' }}>{status}</p>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <InputSubmit 
        style={{ marginBottom: '1em', marginRight: '0.5em' }} 
        // onClick={handlePay}
      >
        {status === 'Paid' ? 'Pay' : 'Receipt'}
      </InputSubmit>
    </Grid>
  );
};

export default CardPayments;
