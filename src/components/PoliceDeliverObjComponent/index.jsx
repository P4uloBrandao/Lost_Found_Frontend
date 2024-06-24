import React, { useState, useEffect } from 'react';
import axios from "axios";
import InputF from '../inputFieldComponent/InputField';
import styled from 'styled-components';
import "../../assets/colors/colors.css";
import { InputSubmit, Container, InputBox, Title, CategoryTitle } from '../../assets/StylePopularComponent/style';

const CategoryButton = styled.button`
  width: 174px;
  height: 66px;
  padding: 16px 24px;
  border-radius: 33px;
  border: 1px solid #3CB684;
  background-color: ${props => props.isSelected ? '#3CB684' : 'white'};
  color: ${props => props.isSelected ? 'white' : 'black'};
  cursor: pointer;
  &:hover {
    background-color: #3CB684;
    color: white;
  }
  font-size: 1rem;
  opacity: 1;
`;

const Message = styled.div`
  text-align: right;
  margin-bottom: 10px;
  color: ${props => props.error ? 'red' : 'green'};
`;

const UserName = styled.div`
  text-align: right;
  color: #3CB684;
  margin-bottom: 10px;
  font-size: 24px;
`;

export default function PoliceDeliverObjComponent() {
    const [errorMessage, setErrorMessage] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userNif, setUserNif] = useState('');
    const [lostId, setLostId] = useState('');
    const [foundId, setFoundId] = useState('');

    const [errorMessage2, setErrorMessage2] = useState("");
    const [statusMessage2, setStatusMessage2] = useState("");
    const [userNif2, setUserNif2] = useState('');
    const [auctionId, setAuctionId] = useState('');
   


    const handleDeliverAuctionSubmit = async (event) => {
        event.preventDefault();
        try {
          
          const userResponse = await axios.get(process.env.REACT_APP_API_URL+`/api/users/userNif/${userNif2}`);
          const userId2 = userResponse.data.currentUser._id;

          // Step 2: Get the owner ID using the user ID
          const bidderResponse = await axios.get(process.env.REACT_APP_API_URL+`/api/users/bidder/${userId2}`);
          const bidderId = bidderResponse.data[0]._id;

          const deliveryResponse2 = await axios.put(process.env.REACT_APP_API_URL+`/api/police/police-officers/auction/${bidderId}/${auctionId}`);
  
          setStatusMessage2("Object delivered successfully.");
          setErrorMessage2("");
        } catch (error) {
          if (error.response && error.response.data) {
            setErrorMessage2(error.response.data.error);
            setStatusMessage2("");
          } else {
            setErrorMessage2('An unexpected error occurred. Please try again.');
            setStatusMessage2("");
          }
        }
      };

      const handleDeliverFoundSubmit = async (event) => {
        event.preventDefault();
        try {
          
          const userResponse = await axios.get(process.env.REACT_APP_API_URL+`/api/users/userNif/${userNif}`);
          const userId = userResponse.data.currentUser._id;
          
          // Step 2: Get the owner ID using the user ID
          const ownerResponse = await axios.get(process.env.REACT_APP_API_URL+`/api/users/owner/${userId}`);
          const ownerId = ownerResponse.data._id;
      
          // Step 3: Use the owner ID and the other two IDs from inputs to call the delivery endpoint
         
          const deliveryResponse = await axios.put(process.env.REACT_APP_API_URL+`/api/police/police-officers/delivery/${lostId}/${foundId}/${ownerId}`);
          
          // Log the response from the server
          console.log(deliveryResponse.data); 
      
          setStatusMessage("Object delivered successfully.");
          setErrorMessage("");
        } catch (error) {
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data.error);
            setStatusMessage("");
          } else {
            setErrorMessage('An unexpected error occurred. Please try again.');
            setStatusMessage("");
          }
        }
      };
      

  

   

    return (
        <>
            <Title>Object Delivery</Title>
            <Container>
                {statusMessage && <Message>{statusMessage}</Message>}
                {errorMessage && <Message error>{errorMessage}</Message>}
                <Title>Found Object Delivery</Title>
                <CategoryTitle>Ask for the validation email with the lost and found object's ID's and the user's NIF.</CategoryTitle>
               
                <CategoryTitle></CategoryTitle>
                <InputBox>
                    <InputF
                        type={'text'}
                        placeholder={'Insert Found Object Id'}
                        id="foundObjId"
                        required
                        onChange={(e) => setFoundId(e.target.value)}
                        value={foundId}
                        errorMessage={'invalid'}
                        name="Found Object Id"
                    />
                </InputBox>
                <CategoryTitle></CategoryTitle>
                <InputBox>
                    <InputF
                        type={'text'}
                        placeholder={'Insert Lost Object Id'}
                        id="lostObjId"
                        required
                        onChange={(e) => setLostId(e.target.value)}
                        value={lostId}
                        errorMessage={'invalid'}
                        name="Lost Object Id"
                    />
                </InputBox>
                <CategoryTitle></CategoryTitle>
                <InputBox>
                    <InputF
                        type={'text'}
                        placeholder={'Insert user NIF'}
                        id="userNif"
                        required
                        onChange={(e) => setUserNif(e.target.value)}
                        value={userNif}
                        errorMessage={'invalid'}
                        name="User NIF"
                    />
                </InputBox>
                <InputSubmit type="submit" onClick={handleDeliverFoundSubmit}>Register Delivery</InputSubmit>
            </Container>

            <Container>
                {statusMessage2 && <Message>{statusMessage2}</Message>}
                {errorMessage2 && <Message error>{errorMessage2}</Message>}
                <Title>Auctioned Object Delivery</Title>
                <CategoryTitle>Ask for the validation email with the auction's ID's and the user's NIF.</CategoryTitle>
               
                <CategoryTitle></CategoryTitle>
                <InputBox>
                    <InputF
                        type={'text'}
                        placeholder={'Insert Auction Id'}
                        id="auctionId"
                        required
                        onChange={(e) => setAuctionId(e.target.value)}
                        value={auctionId}
                        errorMessage={'invalid'}
                        name="Auction Id"
                    />
                </InputBox>
                <CategoryTitle></CategoryTitle>
                <InputBox>
                    <InputF
                        type={'text'}
                        placeholder={'Insert user NIF'}
                        id="userNif2"
                        required
                        onChange={(e) => setUserNif2(e.target.value)}
                        value={userNif2}
                        errorMessage={'invalid'}
                        name="User NIF"
                    />
                </InputBox>
                <InputSubmit type="submit" onClick={handleDeliverAuctionSubmit}>Register Delivery</InputSubmit>
            </Container>

           
        </>
    );
}
