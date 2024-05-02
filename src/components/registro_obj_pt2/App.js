import React, { useState } from 'react';
import styled from 'styled-components';
import InputF  from '../inputFieldComponent/InputField';

const Container = styled.div`
  width: 1188px;
  height: 562px;
  margin: 5em 0;
  
  border-radius: 20px 20px 20px 20px; 
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  justify-content: flex-start; 
  box-sizing: border-box;
  border: 1px solid #D3D3D3; 
  background-color: white; 
  padding: 40px; 
`;

const CategoryTitle = styled.h2`
  color: #3CB684; 
  font-family: 'Roboto', sans-serif; 
  font-size: 24px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  width: 524.32px;
  height: 28px;
  opacity: 1; 
  margin-bottom: 20px; 
  margin-top: 0px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #000; 
  opacity: 1;
  margin-bottom: 40px; 
`;



const CategorySection = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); 
  grid-gap: 10px; 
  justify-content: center; 
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  width: 174px;
  height: 66px;
  padding: 16px 24px;
  border-radius: 33px;
  border: 1px solid #3CB684;
  background-color: ${props => props.isSelected ? '#3CB684' : 'white'};
  color: ${props => props.isSelected ? 'white' : 'black'};
  cursor: pointer;
  &:hover {
    background-color: #3CB684;
    color: white;
  }
  font-size: 1rem;
  opacity: 1;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: -webkit-fill-available;
`;

export default function LostObjectForm  ()  {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [titleError, setTitleError ] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const categories = [
    'Button sample 1', 'Button sample 2', 'Button sample 3', 'Button sample 4', 'Button sample 5', 'Button sample 6',
    'Button sample 7', 'Button sample 8', 'Button sample 9', 'Button sample 10', 'Button sample 11', 'Button sample 12'
  ];

  return ( <>
    <Container>
      <Title>Found Object Identification</Title>
      <InputBox>
        <InputF 
        type={'text'} 
        placeholder={'Insert title of lost object'}  
        id="title"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        errorValidation={titleError}
        errorMessage={'invalid'}
        name="Title"/>

 
        </InputBox>
      <Title>Object's Category</Title>
      <CategoryTitle>Choose the category of the found object.</CategoryTitle>
      <CategorySection>
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            isSelected={selectedCategory === category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategorySection>
    </Container>
      <Container>

      </Container>
        <Container>

        </Container>
       </>
  );
};

