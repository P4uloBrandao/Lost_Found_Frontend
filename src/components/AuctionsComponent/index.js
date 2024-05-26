import styled, {css} from 'styled-components';
import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import { AuthContext } from "../AuthContext";

import { createTheme } from '@mui/material/styles';
import "../../assets/colors/colors.css"
import AuctionsCardComponent from "../AuctionsCardComponent";
// TODO remove, this demo shouldn't need to reset the theme.
const colors = css`
  --primary-color: #c6c3c3;
  --second-color: #ffffff;
  --black-color: #000000;
`;

const defaultTheme = createTheme();

const Container = styled.div`
  width: 100%;
  padding: 32px 64px;
  display: flex;
    flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  
  p {
    color: #000;
    margin: 0;
  }
`

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`


export default function AuctionsComponent({btnLabel, options}) {
   
    useEffect(() => {
    }, []);

    return (
      <>
          <Container>
              <CardsContainer>

                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
                  <AuctionsCardComponent></AuctionsCardComponent>
              </CardsContainer>
          </Container>
      </>
    );
}