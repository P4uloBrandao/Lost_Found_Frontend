import styled, {css} from 'styled-components';
import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import { AuthContext } from "../AuthContext";

import { createTheme } from '@mui/material/styles';
import "../../assets/colors/colors.css"
// TODO remove, this demo shouldn't need to reset the theme.
const colors = css`
  --primary-color: #c6c3c3;
  --second-color: #ffffff;
  --black-color: #000000;
`;
const defaultTheme = createTheme();

const CardContainer = styled.div`
  min-width: 250px;
  width: 250px;
  height: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  
  
  p {
    color: #000;
  }
  
  img {
    width: 250px;
    height: 200px;
    object-fit: cover;
    object-position: center;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  padding: 1.5rem 0.8rem;
`

const MinorText = styled.p `
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
`

const MajorText = styled.p `
  font-size: 22px;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
`

const TextContainer = styled.div `
    display: flex;
  flex-direction: column;

`

const PriceActionContainer = styled.div `
  display: flex;
  justify-content: space-between;
`

const ActionButton = styled.button `
  border: none;
  background: transparent;
  font-size: 16px;
  color: #3CB684;
  font-weight: 600;
  
  &:hover {
    cursor: pointer;
    color: #308f6a;
  }
  
  &:focus-visible {
    outline: none !important;
  }

`


export default function AuctionsCardComponent({itemTitle, daysLeft, price, bidsNumber}) {
   
    useEffect(() => {
    }, []);

    return (
      <>
          <CardContainer>
              <img src="https://res.cloudinary.com/dkyu0tmfx/image/upload/v1710362730/cld-sample-5.jpg" alt="Item"/>
              <InfoContainer>
                  <TextContainer>
                      <MajorText>{itemTitle}</MajorText>
                      <MinorText> {daysLeft} days left</MinorText>
                  </TextContainer>
                  <PriceActionContainer>
                    <TextContainer>
                        <MajorText>{price} EUR</MajorText>
                        <MinorText>{bidsNumber} bids</MinorText>
                    </TextContainer>

                      <ActionButton>View Auction</ActionButton>
                  </PriceActionContainer>
              </InfoContainer>
          </CardContainer>
      </>
    );
}