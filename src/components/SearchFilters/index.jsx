import React from 'react';
import styled, { keyframes } from 'styled-components';
import "../../assets/colors/colors.css"
const Container = styled.div`
border:1px solid black;
width: 100%;
    
  
`;
;const Button = styled.div`
color: var(--black-color);

text-align: center;
font-family: Roboto;
font-size: 1.5rem;
font-style: normal;
font-weight: 700;
line-height: 1.25rem; /* 83.333% */
letter-spacing: -0.015rem;
text-transform: uppercase;
  
`;
const FilterButtons = ({ filters, handleFilterClick }) => {
  return (
    <Container >
      {filters.map((filter, index) => (
        <Button
          key={index}
          onClick={() => handleFilterClick(filter)}
          style={{ width: '100%', marginBottom: '5px' }}
        >
          {filter}
        </Button>
      ))}
    </Container>
  );
};

export default FilterButtons;