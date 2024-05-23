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
import SearchInput from "../SearchInputFieldComponent/index";
import { InputSubmit, Container,InputBox ,Title,Form,CategoryTitle,CategorySection, Wrapper } from '../../assets/StylePopularComponent/style';


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
    const [categoryToCreate, setCategoryToCreate] = React.useState('');
    const [categoryToDelete, setCategoryToDelete] = React.useState('');
    
    const [mainCategory, setMainCategory] = useState(null);
    const [subMainCategory, setSubMainCategory] = useState(null);
    const [subSubCategory, setSubSubCategory] = useState(null);
    
    const [categories, setCategories] = React.useState('');
    const [subCategories, setSubCategories] = React.useState('');
    const [subSubCategories, setSubSubCategories] = React.useState('');
    
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage]= useState("")
    
    const [subCategory, setSubCategory] = useState(null);

    const [category, setCategory] = React.useState('');

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
   
    const fetchSubCategories = async (data) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/category/subCat/${data}`);
        setSubCategories(response.data);
        setLoading(false); // Definir o estado de carregamento como falso quando o fetch estiver concluído
      } catch (error) {
        console.error('Failed to fetch categories', error);
        // Lide com erros conforme necessário
      }
    };
  
    const fetchSubSubCategories = async (data) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/category/subSubCat/${mainCategory}/${subCategory}`);
        setSubSubCategories(response.data);
        setLoading(false); // Definir o estado de carregamento como falso quando o fetch estiver concluído
      } catch (error) {
        console.error('Failed to fetch categories', error);
        // Lide com erros conforme necessário
      }
    };
    
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
        // window.location.reload();
    }
    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/api/category/${categoryToDelete}`,);
            
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

    const handleCreateSubCategory = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.post(`http://localhost:3000/api/category/subCat/${mainCategory}`,{"name": subCategory});
      

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
    
    
    // const handleCategoryClick = (category) => {
    //     setCategory(category);
    //   };
    // const categoriesArray = Object.entries(categories);
    const handleDropdownChange = (selectedOptionName) => {
      setCategoryToDelete(getNameFromId(selectedOptionName))
      // Faça o que for necessário com o nome da opção selecionada
    };
    const handleDropdownMainCategoryChange = (selectedOptionName) => {
      setLoading(true)
      setMainCategory(selectedOptionName)
      fetchSubCategories(getNameFromId(selectedOptionName))
      // Faça o que for necessário com o nome da opção selecionada
    };
    const handleDropdownSubCategoryChange = (selectedOptionName) => {
      console.log(selectedOptionName)
      setLoading(true)
      setSubMainCategory(selectedOptionName)
      fetchSubSubCategories()
      // Faça o que for necessário com o nome da opção selecionada
    };
    function getNameFromId(categoryName) {
      // Procurar a categoria com o nome fornecido no array de categorias
      const category = categories.find(category => category._id === categoryName);
      
      // Se a categoria for encontrada, retornar o ID, caso contrário, retornar null
      return category ? category.name : null;
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
        <Container>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12}> <Title>Create Subcategory</Title></Grid>
        <Grid item xs={12} sm={4}>
       
            <CategoryTitle> Choose main category </CategoryTitle>
                          <InputBox>
              <SearchInput 
                placeholder={mainCategory ? getNameFromId(mainCategory) : 'Insert category'} 
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
            {mainCategory && (  
            <Grid item xs={12} sm={4}>
             
            <CategoryTitle> Write subcategory to create  </CategoryTitle>
            
            <InputBox>
              <SearchInput
              type={'text'} 
              placeholder={subMainCategory ? subMainCategory : 'Insert subcategory'} 
              id="subcategory"
              required
              onClick = {(e) => setSubMainCategory(e.target.value)}

              onChange={ handleDropdownSubCategoryChange}
              value={subMainCategory}
              options = {subCategories}
              errorMessage={'invalid'}
              name="Subcategory"/>
      
       
              </InputBox>
              </Grid>
              )}
              {mainCategory && subMainCategory && (  
              <Grid item xs={12} sm={4}>
               
            <CategoryTitle> Write subcategory label  </CategoryTitle>
              <InputBox>
              <SearchInput
              type={'text'} 
              placeholder={'Insert label for subcategry'}  
              id="subsubcategory"
              required
              onChange={(e) => setSubSubCategory(e.target.value)}
              value={subSubCategory}
              options={subSubCategories}
              errorMessage={'invalid'}
              name="label"/>
      
       
              </InputBox>
        
        </Grid>
               )}
        <Grid item xs={12} sm={12}> <InputSubmit type="submit" onClick={handleCreateSubCategory}>
            Create
        </InputSubmit></Grid>
        










        </Grid>
        </Container>
            
        </>
    );
}