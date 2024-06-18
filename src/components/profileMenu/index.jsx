import React, { useState } from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Adding shadow */
  width: 100%; /* Adjusted width */
  height: 6vh;
`;

const MenuItem = styled.div`
  flex: 1;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectedBar = styled.div`
  position: absolute;
  bottom: 0;
  border-radius: 20px;
  height: 5px;
  background: linear-gradient(90deg, #039baf, #f7db61); /* Gradient color */
  transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
`;


const Menu = ({ options, selectedOption, setSelectedOption , style }) => {

  setSelectedOption(selectedOption);

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <MenuContainer style={style}>

        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleClick(option)}
          >
            {option}
          </MenuItem>
        ))}
        {selectedOption && (
          <SelectedBar
            style={{
              width: `${100 / options.length}%`,
              left: `${options.indexOf(selectedOption) * (100 / options.length)}%`,
            }}
          />
        )}
      </MenuContainer>
    </div>
  );
};

export default Menu;
