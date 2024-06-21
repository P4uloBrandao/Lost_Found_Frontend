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

const ErrorMessage= styled.p `
  color: #ad0000;
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  padding-right: 15px;
  margin-top: 5px;
  text-align: end;
  width: 100%;
  `

export default function AddCategoryComponent() {
  const [categoryToDelete, setCategoryToDelete] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [fullDataCategories, setFullDataCategories] = useState([]);
  const [mainCategoryToDelete, setMainCategoryToDelete] = useState('');

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [subCategoryToDelete,setSubCategoryToDelete] = useState('');

  const [subCategoryToCreate, setSubCategorytoCreate] = useState('');
  const [category, setCategory] = useState('');

    // Validations
    const [selectCreateCategoryMainError, setSelectCreateCategoryMainError ] = useState(false);
    const [selectSubCreateCategoryMainError, setSelectSubCreateCategoryMainError ] = useState(false);
    const [deleteSelectCategoryMainError, setDeleteSelectCategoryMainError ] = useState(false);
    const [deleteSubCategoryMainError, setDeleteSubCategoryMainError ] = useState(false);
    const validationSetter= [setSelectCreateCategoryMainError, setSelectSubCreateCategoryMainError, setDeleteSelectCategoryMainError, setDeleteSubCategoryMainError];

    const clearErrors = () => {
        for (let i = 0; i < validationSetter.length; i++) {
            validationSetter[i](false);
        }
    }

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
    
   
  if (categories.length === 0){
    fetchCategories();
  }
      
    }, [categories]);
   const fetchSubCategories = async (data) => {
    
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+`/api/category/subCat/${getCategoryNameFromId(data)}`);
        setFullDataCategories(response.data);
       
        setSubCategories(extractSubcategories (response.data));
        setLoading(false); // Definir o estado de carregamento como falso quando o fetch estiver concluído
      } catch (error) {
        console.error('Failed to fetch categories', error);
        // Lide com erros conforme necessário
      }
    }
   // Função para buscar subcategorias do json que vem da api
   function extractSubcategories(categories) {
    return categories.map(category => ({
        _id: category.subcategory._id,
        name: category.subcategory.name
    }));
  }
    const handleDeleteSubCategory = async (event) => {
       clearErrors();
        event.preventDefault();


        if(mainCategoryToDelete === '' || subCategoryToDelete === ''){
            if (mainCategoryToDelete === '') {
                setDeleteSelectCategoryMainError(true);
            } else {
                setDeleteSubCategoryMainError(true);
            }
        }
        try {
            const response = await axios.delete(process.env.REACT_APP_API_URL+`/api/category/subCat/${getCategoryNameFromId(mainCategoryToDelete)}/${getSubCategoryNameFromId(subCategoryToDelete)}`,);
            
           console.log(subCategoryToDelete)
        } catch (error) {
            setSelectSubCreateCategoryMainError(true);

            console.error( error);
    
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
        //  window.location.reload();
    };

    const handleCreateSubCategory = async (event) => {
        clearErrors();

        if(mainCategory === '' || subCategoryToCreate === ''){
            if (mainCategory === '') {
                setSelectCreateCategoryMainError(true);
            } else {
                setSelectSubCreateCategoryMainError(true);
            }
        }
      event.preventDefault();
      console.log(mainCategory)
      console.log(subCategoryToCreate)
      try {
          const response = await axios.post(process.env.REACT_APP_API_URL+`/api/category/subCat/${getCategoryNameFromId(mainCategory)}`,{"name": subCategoryToCreate});
      

      } catch (error) {

          if (mainCategory === '') {
              setSelectCreateCategoryMainError(true);
          } else {
              setSelectSubCreateCategoryMainError(true);
          }
          console.error( error);
  
          if (error.response && error.response.data) {
              setErrorMessage(error.response.data); // Set the error message if present in the error response
          } else {
              setErrorMessage("An unexpected error occurred. Please try again.");
          }
      }
      // window.location.reload();
  }
  
    function getCategoryNameFromId(categoryName) {

      const category = categories.find(category => category.name === categoryName);
      return category ? category.name : null;
     }
     function getSubCategoryNameFromId(categoryName) {
      const category = subCategories.find(category => category.name === categoryName);
      return category ? category.name : null;
     }
    function handleDropdownMainCategoryChange1(selectedOptionName) {
      setMainCategory(selectedOptionName);
      fetchSubCategories(selectedOptionName);
    }
    function handleDropdownMainCategoryToDeleteChange(selectedOptionName) {
      fetchSubCategories(selectedOptionName);
      setMainCategoryToDelete(selectedOptionName); 
           console.log(selectedOptionName)

    }
    
    
    function handleDropdownSubCategoryToDeleteChange(selectedOptionName) {
      console.log(selectedOptionName)

      setSubCategoryToDelete(selectedOptionName);
    }
  
    if (loading) {
      return <div>Carregando...</div>; // Ou qualquer indicador de carregamento que você preferir
    }
  
    return (<>
        <Container><Title>Create SubCategory</Title>
        <Grid container spacing={2}>
          
        <Grid item xs={12} sm={6}>
        
          <CategoryTitle> Choose main category </CategoryTitle>
            <InputBox>
            <SearchInput 
              placeholder={mainCategory ? getCategoryNameFromId(mainCategory) : 'Insert category'} 
              id="mainCategory"
              required
              onClick = {(e) => setMainCategory(e.target.value)}
              value={mainCategory}
              onChange={handleDropdownMainCategoryChange1}
              name="Categories"
              options={categories}
              
            />
          </InputBox>
            {selectCreateCategoryMainError && <ErrorMessage>Category not found</ErrorMessage>}

                
        </Grid>
            <Grid item xs={12} sm={6}>
          
            <CategoryTitle> Write subcategory label  </CategoryTitle>
              <InputBox>
              <InputF
              type={'text'} 
              placeholder={ 'Insert subcategory label'}
              id="subcategory"
              required
              onChange={(e) => setSubCategorytoCreate(e.target.value)}
              value={subCategoryToCreate}

              errorMessage={'Subcategory already exist'}

              name="Sub-category"/>
                  </InputBox>
                {selectSubCreateCategoryMainError && <ErrorMessage>SubCategory invalid</ErrorMessage>}
      
        
        </Grid>
        <Grid item xs={12} sm={12}>
                      
          <InputSubmit type="submit" onClick={handleCreateSubCategory}>
            Create SubCategory
          </InputSubmit>
              
        </Grid>
       
        </Grid>
        </Container>
        
        <Container><Title>Delete SubCategory</Title>
        <Grid container spacing={2}>
          
        <Grid item xs={12} sm={6}>
        
          <CategoryTitle> Choose main category </CategoryTitle>
            <InputBox>
            <SearchInput 
              placeholder={mainCategoryToDelete ? getCategoryNameFromId(mainCategoryToDelete) : 'Insert category'} 
              id="mainCategory"
              required
              onClick = {(e) => setMainCategoryToDelete(e.target.value)}
              onChange={handleDropdownMainCategoryToDeleteChange}
              name="Categories"
              options={categories}
              
            />
          </InputBox>

            {deleteSelectCategoryMainError && <ErrorMessage>Category not found</ErrorMessage>}
                
        </Grid>
            <Grid item xs={12} sm={6}>
          
            <CategoryTitle> Write subcategory label  </CategoryTitle>
              <InputBox>
              <SearchInput 
              placeholder={mainCategoryToDelete ? getCategoryNameFromId(mainCategoryToDelete) : 'Insert category'}
              id="mainCategory"
              required
              onClick = {(e) => setSubCategoryToDelete(e.target.value)}
              onChange={handleDropdownSubCategoryToDeleteChange}
              name="Sub Categories"
              options={subCategories}
              
            />
                  </InputBox>
                {deleteSubCategoryMainError && <ErrorMessage>Subcategory invalid</ErrorMessage>}

      
        
        </Grid>
        <Grid item xs={12} sm={12}>
                      
          <InputSubmit type="submit" onClick={handleDeleteSubCategory}>
            Delete SubCategory
          </InputSubmit>
              
        </Grid>
       
        </Grid>
        </Container>    
        </>
    );
}