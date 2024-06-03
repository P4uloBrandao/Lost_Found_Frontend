import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import '../../assets/colors/colors.css'
import { InputSubmit, Container, InputBox, Title, Form, Wrapper } from '../../assets/StylePopularComponent/style';
import InputF from '../inputFieldComponent/InputField';
import useDebounce from './useDebounce';

const Choose = styled.span`
  color: #555;
  padding: 5px 0 10px;
  display: inherit;
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
  cursor: pointer;
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
  position: relative;
  width: -webkit-fill-available;
  left: -9px;
  margin: 0 12px;
  top: 0pt;
  border-radius: 17px;
  overflow: hidden;
  display: ${(props) => (props.active ? 'block' : 'none')};
  max-height: 144px;
  overflow-y: auto;
  z-index: ${(props) => (props.active ? "4" : "0")};
  padding: 0;
  color: var(--black-color);
  background-color: var(--primary-grey-color);
  list-style: none;
`;

const DropdownContainer = styled.div`
  position: absolute;
  box-shadow: 0px 0px 10px 2px rgba(1, 0, 0, 0.2);
  width: -webkit-fill-available;
  left: 0;
  margin: 0 12px;
  top: 37pt !important;
  border-radius: 17px;
  overflow: hidden;
  display: ${(props) => (props.active ? 'block' : 'none')};
  max-height: 144px;
  overflow-y: auto;
  z-index: ${(props) => (props.active ? "4" : "0")};
  padding: 0;
  color: var(--black-color);
  background-color: var(--primary-grey-color);
  list-style: none;
`;

const DropdownItem = styled.li`
  margin-left: 18px;
  padding: 10px;
  border-radius: 18px;
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
  color: var(--black-color);
  position: relative;
  top: 8px;
`;

const DropdownComponent = ({ name, disable, icon, options, placeholder, onChange, onClick, errorMessage, field_name }) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [text, setText] = useState('');
  const deb = useDebounce(text, 500);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (options) {
      const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filteredOptions);
    } else {
      setResults([]);
    }

    if (text === '') {
      setIsDropdownActive(false);
    } else {
      setIsDropdownActive(true);
    }
  }, [text, options]);

  const handleOptionClick = (option) => {
    setIsDropdownActive(false)
    setSelectedOption(option._id);
    onChange(option.name);
    setText(option.name);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target) &&
      searchInputRef.current && !searchInputRef.current.contains(event.target)
    ) {
      setIsDropdownActive(false);
    }
  };

  useEffect(() => {
    if (isDropdownActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownActive, selectedOption]);

  return (
    <>
      <InputBox
        className={isDropdownActive || text ? 'dropdown active' : 'dropdown'}
        onClick={() => setIsDropdownActive(!isDropdownActive)}>
        <InputF
          id='searchInput'
          type="text"
          placeholder={placeholder}
          value={text}
          name={name}
          disable={disable}
          onChange={(e) => setText(e.target.value)}
        />
      </InputBox>

      <DropdownContainer ref={dropdownRef} active={isDropdownActive}>
        <DropdownMenu onChange={onChange} active={isDropdownActive}>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {results.length > 0 ? 
            results.map((option, index) => (
              <DropdownItem key={index} onClick={() => handleOptionClick(option)} id={option.name}>
                {option.name}
              </DropdownItem>
            )) : (
              <DropdownItem>
                {'No results'}
              </DropdownItem>
            )
          }
        </DropdownMenu>
      </DropdownContainer>
    </>
  );
};

export default DropdownComponent;
