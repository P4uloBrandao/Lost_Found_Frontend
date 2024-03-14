// make a dropdown

import styled, {css} from "styled-components";
import React from "react";



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

const SelectField = styled.select`
  ${colors};
  width: 95%;
  height: ${(props) => props.height || '38px' };
  font-size: 16px;
  background: transparent;
  color: var(--second-color);
  padding-inline: 20px 0px;
  border: 2px solid var(--primary-color);
  border-radius: 30px;
  outline: none;

  &::placeholder {
    color: var(--second-color); /* Change this line to set the placeholder text color */
    opacity: 0.7;
  }

  &:focus ~ label,
  &:valid + label {
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 14px;
    font-weight: bold;
    background-color: var(--primary-color);
    border-radius: 30px;
    color: #456d74;
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
  top: 11px;
  right: 25px;
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
export const DropdownInput = ({icon, placeholder, id, required, onChange, value,setShowPassword, options, errorMessage = null, errorValidation = null   }) => {

    return (


        <InputBox>
            <SelectField
                placeholder={placeholder}
                id={id}
                required={required}
                onChange={onChange}
                value={value}
                // onFocus={removeValidation}
            >
                <option value="">Selecione um opção</option>

                {options.map ((option) => {
                    return <option value={option.value}>{option.label}</option>
                })}
            </SelectField>
            <Label className="label">{placeholder}</Label>
            <IconWrapper onClick={setShowPassword}>{icon} </IconWrapper>
            {<ErrorMessage>{errorValidation && errorMessage ? errorMessage : null}</ErrorMessage>}

        </InputBox>


    );
}