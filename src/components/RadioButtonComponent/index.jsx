import React, { useState } from 'react';
import styled from 'styled-components';
import './style.css'
const RadioGroup = styled.div`
  display : flex;
`;

const Wrapper = styled.div`
margin: 0px 18px 0px 41px;
`;

const Input = styled.input`
 
`;

const Label = styled.label`
  
`;

const Text = styled.span`
  `;

const Indicator = styled.div`
 
`;
const RadioButton = ({ options, onChange, value }) => {
    const [selectedOption, setSelectedOption] = useState(value);
  
    const handleOptionChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
      if (onChange) {
        onChange(selectedValue);
      }
    };
  
    return (
      <RadioGroup>
        {options.map((option) => (
          <div key={option.id}>
            <input
              className="state"
              type="radio"
              name="app"
              id={option.id}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={handleOptionChange}
            />
            <label className="label" htmlFor={option.id}>
              <span className="indicator" />
              <span className="text">{option.text}</span>
            </label>
          </div>
        ))}
      </RadioGroup>
    );
  };
  



export default RadioButton;
