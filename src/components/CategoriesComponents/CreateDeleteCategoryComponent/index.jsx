import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import axios from "axios";
import InputF  from '../../inputFieldComponent/InputField';
import styled from 'styled-components';
import "../../../assets/colors/colors.css"
import SearchInput from "../../SearchInputFieldComponent/index";
import { InputSubmit, Container,InputBox ,Title,Form,CategoryTitle,CategorySection, Wrapper } from '../../../assets/StylePopularComponent/style';


const CategoryButton = styled.button`
  width: 174px;
  height: 66px;
  padding: 16px 24px;
  border-radius: 33px;
  border: 1px solid var(--primary-green-color);
  background-color: ${props => props.isSelected ? 'var(--primary-green-color)' : 'var(--white-color)'};
  color: ${props => props.isSelected ? 'var(--white-color)' : 'var(--black-color)'};
  cursor: pointer;
  &:hover {
    background-color: var(--primary-green-color);
    color: var(--white-color);
  }
  font-size: 1rem;
  opacity: 1;
`;

export default function AddCategoryComponent() {
  const [count, setCount] = useState(0);

  const [categoryToCreate, setCategoryToCreate] = useState('');
  const [categoryToDelete, setCategoryToDelete] = useState('');
  
  const [categories, setCategories] = useState([]);

  
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [category, setCategory] = useState('');
  
    useEffect(() => {
      
      const fetchCategories = async () => {
        try {
          const response = await axios.get('https://bidfinderbackend.ddns.net/api/category');
          setCategories(response.data);
          setLoading(false); // Definir o estado de carregamento como falso quando o fetch estiver concluído
        } catch (error) {
          console.error('Failed to fetch categories', error);
          // Lide com erros conforme necessário
        }
      };
      if (categories.length === 0){
        fetchCategories();
      }
          
        }, [categories]);
   
    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`https://bidfinderbackend.ddns.net/api/category/`,{"name": categoryToCreate});
           
            console.log(category)
        } catch (error) {
            console.error( error);
    
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
        // window.location.reload();
    }
    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`https://bidfinderbackend.ddns.net/api/category/${categoryToDelete}`,);
            
            console.log(categoryToDelete)
        } catch (error) {
            console.error( error);
    
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
         window.location.reload();
    };


  
    const handleDropdownChange = (selectedOptionName) => {
      setCategoryToDelete(getCategoryNameFromId(selectedOptionName))
    };

   
    
   
    

    function getCategoryNameFromId(categoryName) {
      const category = categories.find(category => category._id === categoryName);
      return category ? category.name : null;
     
    
    
    };

    if (loading) {
      return <div>Carregando...</div>;
    }

    
  
    return (<>
        <Container>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Title>Create Category</Title>
            <CategoryTitle> New category to create </CategoryTitle>
            
              <InputBox>
              <InputF 
              type={'text'} 
              placeholder={'Insert new category'}  
              id="category"
              required
              onChange={(e) => setCategoryToCreate(e.target.value)}
              value={categoryToCreate}
              
              errorMessage={'Category already exist'}
              name="category"/>
      
       
              </InputBox>
              <InputSubmit type="submit" onClick={handleCreateSubmit}>
                  Create
                </InputSubmit>
                </Grid>
            <Grid item xs={12} sm={6}>
                <Title>Delete Category</Title>
            <CategoryTitle> Choose category to delete  </CategoryTitle>
            
             
               <InputBox>
              <SearchInput 
                
                placeholder={'Categories'}  
                id="categoryToDelete"
                required
                onClick = {(e) => setCategoryToDelete(e.target.value)}
                value={categoryToDelete}
                onChange={handleDropdownChange}
                name="Categories"
                options={categories}
                
              />
            </InputBox> 
      
        <InputSubmit type="submit" onClick={handleDeleteSubmit}>
            Delete
        </InputSubmit>
        </Grid>
        </Grid>
        </Container>
        
            
        </>
    );
  }
