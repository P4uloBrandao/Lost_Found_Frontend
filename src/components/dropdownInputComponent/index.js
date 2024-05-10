import React, { useState } from 'react';
import styled from 'styled-components';
import '../../assets/colors/colors.css'



const Choose = styled.span`
  color: #555;
  padding: 5px 0 10px;
  display: inherit;
`;

const DropdownContainer = styled.div`
  width: auto;
  display: inline-block;
  background-color: var(--secondary-grey-color);
  border-radius: 35px;
  transition: all 0.5s ease;
  position: relative;
  margin-left: 13px;
  margin-right: 13px;
  margin-bottom: 5px;
  font-size: 17px;
  color: var(--secondary-grey-color);
  height: 100%;
  text-align: left;

  &:hover {
    box-shadow: 0 0 4px rgb(204, 204, 204);
  }

  &:active {
    background-color: #f8f8f8;
  }

  &.active {
    box-shadow: 0 0 4px rgb(204, 204, 204);
    background-color: #f8f8f8;

    .select > i {
      transform: rotate(-90deg);
    }
  }
`;
const IconWrapper = styled.i`
  position: absolute;
  top: 8px;
  right: 25px;
  font-size: 20px;
  z-index: 1;
`;
const Label = styled.label`
  position: absolute;
  top: -10px;
  left: 20px;
  font-size: 14px;
  font-weight: bold;
  background-color: var( --primary-green-color);
  border-radius: 30px;
  color: var( --white-color);
  padding: 0 10px;
  transition: 0.2s;
  
`;
const Select = styled.div`
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
width: 100%;
cursor:pointer;
height: ${(props) => props.height || '38px' };
font-size: 16px;
background: var(--primary-grey-color);
color: var(--black-color);
padding-inline: 20px 0px;
border-radius: 30px;
outline: none;
border: transparent;

`;

const Icon = styled.i`
  font-size: 13px;
  color: #888;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  float: right;
  line-height: 20px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  width: 100%;
  left: 0;
  top: 11px;
  border-radius: 0px 0px 17px 17px;
    overflow: hidden;
  display: ${(props) => (props.active ? 'block' : 'none')};
  max-height: 144px;
  overflow-y: auto;
  z-index: ${(props) => (props.active ? "4" : "0")};
    padding: 0;
  color: var(--black-color);
  background-color:var(--primary-grey-color);
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

  &:active {
    background-color: #e2e2e2;
  }
`;


const Pholder = styled.span`
  color:var(--black-color);
  position: relative;
  top: 8px;

`;
// Main component
const DropdownComponent = ({ icon, options, placeholder, onChange, onClick }) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ name: null, id: null });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    
    setIsDropdownActive(false);
    
    
  };
 
  return (
    <>
      <DropdownContainer 
        className={isDropdownActive ? 'dropdown active' : 'dropdown'}
        onClick={() => setIsDropdownActive(!isDropdownActive)}
        tabIndex="0"
      >
        <Select>
          <Pholder>{selectedOption.name !== null ? selectedOption.name : "Select one"}</Pholder>
          <IconWrapper>{icon}</IconWrapper>
        </Select>
        <DropdownMenu onChange={onChange} active={isDropdownActive}>
          {options.map((option, index) => (
            <DropdownItem key={index} onChange={() => handleOptionClick(option)}  onClick={() => handleOptionClick(option)} id={option.name}>
              {option.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
        <Label className="label">{placeholder}</Label>
        {/* {selectedOption && <Msg>Hidden input value: {selectedOption}</Msg>} */}
      </DropdownContainer>
    </>
  );
};

export default DropdownComponent;