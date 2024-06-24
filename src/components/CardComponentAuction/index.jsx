import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import Grid from '@mui/material/Grid';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import axios from "axios";
import React,{ useState, useContext } from "react";
import './index.css';


const PaymentButton = styled.button`
    background-color: #3cb684;
    color: white;
    border: none;
    border-radius: 33px;
    cursor: pointer;
    padding: 10px 20px;
    margin-left: 10px;
    &:hover {
        background-color: #34a26a;
    }
`

const PaidText = styled.p`
    color: #3cb684;
    font-size: 16px;
    font-weight: bold;
    line-height: 27px;
    text-align: left !important;
    margin-top: 0px;
  
`

const CardLostObjecs = ({ matchButton, catId,name, description, location, date, category, id,photo, status,highbid,onCardClick, onPayClick, bidValue, paymentObject }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const handleViewMatches = () => {
    onCardClick(id);
  };

  const handlePayClick = () => {
    onPayClick(id);
  }


  return (
    <Grid id="1" style={{ borderRadius:'1.25rem',boxShadow: '4px 4px 27.1px 0px rgba(0, 0, 0, 0.25)'}} container spacing={2}>
      <Grid id="2" style={{ margin: '2rem ',height: '15vh'}}  spacing={2}>
         <p className='p-absolute'> {category}</p>
             <img  style={{ width: '215px', height: '200px' , objectFit: 'cover',borderRadius:' 1.25rem'}}  src={photo} alt="" />
      </Grid>
      <Grid style={{padding: '0rem 1rem ', width: 'auto'}} container spacing={2}>
        <Grid container spacing={3} sx={{justifyContent: 'center' ,padding: '2rem '}}>
          <Grid style={{paddingLeft: '1rem',textAlign: '-webkit-left', paddingTop: '1em',    height:' 5em'}} xs={12} xsOffset={3}  mdOffset={0}>
          <h2>{name}</h2>
          </Grid>
          <Grid  style={{ textAlignLast: 'left',paddingLeft: '1rem',    fontWeight: '300'}}xs={12} md={6} mdOffset="auto">
            <p>Highest bid: {highbid}</p>
            <p>{!!bidValue && `Bid value:${bidValue}` }</p>
            <p>Ends on: {date}</p>
            {/* <p>Lost at: {location}</p> */}
            <p className='descriptionBtn' onClick={handleViewMatches}>View more{'>'}</p>
              {!!paymentObject && !paymentObject.paid && <PaymentButton onClick={handlePayClick}>Pay item</PaymentButton>}
              {!!paymentObject && paymentObject.paid && <PaidText>Item paid</PaidText>}

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
