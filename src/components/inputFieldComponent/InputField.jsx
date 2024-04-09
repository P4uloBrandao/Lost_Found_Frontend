import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled, { keyframes, css} from 'styled-components';

const colors = css`
  --primary-color: #c6c3c3;
  --second-color: #ffffff;
  --black-color: #000000;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;

const InputField = styled.input`
  ${colors}
  width: 95%;
  height: ${(props) => props.height || '38px' };
  font-size: 16px;
  background: #ECECEC;
  color: var(--black-color);
  padding-inline: 20px 0px;
  border: none;
  border-radius: 30px;
  outline: none;

  &::placeholder {
    color: var(--black-color); /* Change this line to set the placeholder text color */
    opacity: 0.7;
    text-indent: 30px; 
  }
  & {
    text-indent: 30px; 
  }

  &:focus ~ label,
  &:valid + label {
    position: absolute;
    top: -10px;
    left: 20px;
    color: var(--second-color);
    font-size: 14px;
    font-weight: bold;
    background-color: var(--primary-color);
    border-radius: 30px;
    padding: 0 10px;
    transition: 0.2s;
  }
  ${({ type }) =>
    type === 'date' &&
    css`
      &::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
      }
    `}
`;

const Label = styled.label`
  position: absolute;
  top: -28px;
  left: 20px;
  transition: 0.2s;
  color: var(--primary-color); /* Change this line to set the placeholder label color */
`;
const IconWrapper = styled.i`

  position: absolute;
  top: 8px;
  left: 13px;
  font-size: 20px;

`;

const ErrorMessage = styled.p`
  color: #ad0000;
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  margin-top: 5px;
`;


const CustomInput = ({ height,icon, type, placeholder, id, required, onChange, value, name,setShowPassword, errorMessage = null, errorValidation = null  }) => {
    const removeValidation = () => {
        errorValidation = false;
    }
  return (
    <InputBox>
      <InputField
        height = {height}
        type={type}
        placeholder={placeholder}
        id={id}
        // required={required}
        onChange={onChange}
        value={value}
        name={name}
        onFocus={removeValidation}
      />
      <Label className="label">{name}</Label>
      <IconWrapper onClick={setShowPassword}>{icon} </IconWrapper>
        {<ErrorMessage>{errorValidation && errorMessage ? errorMessage : null}</ErrorMessage>}

    </InputBox>

  );
};

export default CustomInput;