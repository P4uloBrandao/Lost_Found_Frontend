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


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;



const InputSubmit = styled.button`
${colors};
width: 100%;
  height: 40px;
  background: #c6c3c3;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--white-color);
  }
`;

const InputBox = styled.div`

  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 100%;
  
`;
const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const Title = styled.h2`
  color: var(--black-color);
  opacity: 1;
  text-align: left;
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  color: #3cb684;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  text-align: left !important;
  margin-top: 0px;
`;

const genders = [
    {
      value: 'male',
      label: 'male'
    },
    {
      value: 'female',
      label: 'female'
    },
    {
      value: 'undefined',
      label: 'undefined'
    },3
  ]
const defaultTheme = createTheme();
// Função para formatar a data como "DD-MM-YYYY"


export default function AuctionsComponent({btnLabel, options}) {
   
    useEffect(() => {
    }, []);

    return (
      <>
      <Title>Personal Information</Title>
      <CategoryTitle>
        You can edit your personal info in the fields that are not locked anytime! Remember to save all changes
        in the end.
      </CategoryTitle>
      
        <Wrapper>

      </Wrapper>
      </>
    );
}