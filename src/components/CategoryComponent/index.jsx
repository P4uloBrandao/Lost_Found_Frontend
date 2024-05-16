import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {PasswordStrength} from '../controllers/index'
import InputF  from '../inputFieldComponent/InputField';
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';
import "../../assets/colors/colors.css"
import DropdownInput from "../dropdownInputComponent/index";

const Container = styled.div`
  width: 180vh;
 
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
const InputBox = styled.div`

  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  
`;
const InputSubmit = styled.button`


width: 12.93306rem;
    height: 3.25rem;
    background: var(--primary-green-color);
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.11);
    transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
    text-align: center;
    font-family: Roboto;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 135.5%;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    color: var(--white-color);
    transition: 0.3s;
  &:hover {
    background: var(--white-color);
    border: solid 2px var(--primary-green-color);
    color:var(--primary-green-color);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.30), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }
`;
const Title = styled.h2`
  font-size: 1.5rem;
  color: var(--black-color); 
  opacity: 1;
  margin-bottom: 40px; 
`;
const CategoryTitle = styled.h2`
color: #3CB684;
display :flex;
font-family: 'Roboto', sans-serif;
font-size: 24px;
font-weight: 400;
line-height: 27px;
text-align: left;

margin-top: 0px;
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
export default function AddCategoryComponent() {
    const [errorMessage, setErrorMessage]= useState("")
    const [categories, setCategories] = React.useState('');
    const [mainCategory, setMainCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [category, setCategory] = React.useState('');
    const [categoryToCreate, setCategoryToCreate] = React.useState('');
    const [categoryToDelete, setCategoryToDelete] = React.useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/category');
          setCategories(response.data);
          setLoading(false); // Definir o estado de carregamento como falso quando o fetch estiver concluído
        } catch (error) {
          console.error('Failed to fetch categories', error);
          // Lide com erros conforme necessário
        }
      };
  
      fetchCategories();
    }, []);
  
    if (loading) {
      return <div>Carregando...</div>; // Ou qualquer indicador de carregamento que você preferir
    }
  
    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/category/`,{"name": categoryToCreate});
           
            console.log(category)
        } catch (error) {
            console.error( error);
    
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
        window.location.reload();
    }
    const handleCreateSubCategory = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.post(`http://localhost:3000/api/category/subCat/${mainCategory}`,{"name": subCategory});
         
          console.log(mainCategory,"----",subCategory)
      } catch (error) {
          console.error( error);
  
          if (error.response && error.response.data) {
              setErrorMessage(error.response.data); // Set the error message if present in the error response
          } else {
              setErrorMessage("An unexpected error occurred. Please try again.");
          }
      }
      window.location.reload();
  }
    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/api/category/${category}`,);
            
            console.log(category)
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
    const handleCategoryClick = (category) => {
        setCategory(category);
      };
    // const categoriesArray = Object.entries(categories);
    const handleDropdownChange = (selectedOptionName) => {
      setCategoryToDelete(selectedOptionName)
      // Faça o que for necessário com o nome da opção selecionada
    };
    const handleDropdownMainCategoryChange = (selectedOptionName) => {
      setMainCategory(selectedOptionName)
      // Faça o que for necessário com o nome da opção selecionada
    };
    function getIdFromName(categoryName) {
      // Procurar a categoria com o nome fornecido no array de categorias
      const category = categories.find(category => category.name === categoryName);
      
      // Se a categoria for encontrada, retornar o ID, caso contrário, retornar null
      return category ? category._id : null;
    }
    return (<>
        <Container>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Title>Create Category</Title>
            <CategoryTitle> New categoty to create </CategoryTitle>
            
              <InputBox>
              <InputF 
              type={'text'} 
              placeholder={'Insert new category'}  
              id="category"
              required
              onChange={(e) => setCategoryToCreate(e.target.value)}
              value={categoryToCreate}
              
              errorMessage={'invalid'}
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
              <DropdownInput 
                
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
        <Container>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12}> <Title>Create Subcategory</Title></Grid>
        <Grid item xs={12} sm={6}>
       
            <CategoryTitle> Choose main category </CategoryTitle>
                          <InputBox>
              <DropdownInput 
                
                placeholder={'Categories'}  
                id="mainCategory"
                required
                onClick = {(e) => setMainCategory(e.target.value)}
                value={mainCategory}
                onChange={handleDropdownMainCategoryChange}
                name="Categories"
                options={categories}
                
              />
            </InputBox>
                </Grid>
            <Grid item xs={12} sm={6}>
                
            <CategoryTitle> Write subcategory to create  </CategoryTitle>
            
            <InputBox>
              <InputF 
              type={'text'} 
              placeholder={'Insert subcategory'}  
              id="subcategory"
              required
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              
              errorMessage={'invalid'}
              name="Subcategory"/>
      
       
              </InputBox>
      
        
        </Grid>
        <Grid item xs={12} sm={12}> <InputSubmit type="submit" onClick={handleCreateSubCategory}>
            Create
        </InputSubmit></Grid>
        










        </Grid>
        </Container>
            
        </>
    );
}