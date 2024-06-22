// Menu.jsx
import React from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Adding shadow */
  flex-wrap: wrap;
`;

const ItemWrapper = styled.div `

  min-width: 84px;
`

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
  width: 100%;
  border-radius: 20px;
  height: 5px;
  background: linear-gradient(90deg, #039baf, #f7db61); /* Gradient color */
  transition: opacity 0.3s ease-in;
  
`;

const Menu = ({ options, selectedOption, setSelectedOption , style }) => {

  setSelectedOption(selectedOption);

  const handleClick = (option) => {
    
    setSelectedOption(option); 

  };

  return (
      <MenuContainer style={style}>
        {options.map((option) => (
            <ItemWrapper style={{
              width: `${100 / options.length}%`,
            }}>
                <MenuItem
                  key={option}
                  onClick={() => handleClick(option)}
                >
                  {option}
                </MenuItem>
                  <SelectedBar style={{
                    opacity: option === selectedOption ? 1: 0
                  }}/>

            </ItemWrapper>
        ))}
      </MenuContainer>
  );
};

export default Menu;
