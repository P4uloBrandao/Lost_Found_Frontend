import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import InputF  from '../../inputFieldComponent/InputField';
import styled from 'styled-components';
import "../../../assets/colors/colors.css"
import SearchInput from "../../SearchInputFieldComponent/index";
import { InputSubmit, Container,InputBox ,Title,Form,CategoryTitle,CategorySection, Wrapper } from '../../../assets/StylePopularComponent/style';
import Grid from '@mui/material/Grid';
import Loader from '../../LoadingComponent/index';

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
  const [mainCategory, setMainCategory] = useState('');
  const [subMainCategory, setSubMainCategory] = useState('');
  const [newSubSubCategory, setNewSubSubCategory] = useState('');
  
  const [mainCategoryToDelete, setMainCategoryToDelete] = useState('');
  const [subMainCategoryToDelete, setSubMainCategoryToDelete] = useState('');

  const [subSubMainCategoryToDelete, setSubSubMainCategoryToDelete] = useState('');


  const [newSubSubCategoryToCreate, setNewSubSubCategoryToCreate] = useState('');

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  const [fullDataCategories, setFullDataCategories] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [subCategory, setSubCategory] = useState('');
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
    if (subMainCategory !== null) {
      if (subSubCategories.length === 0) {
  
        const tempMain = getCategoryNameFromId(mainCategory);
        if (mainCategory && subMainCategory) {
        const newSubSubCategories = getSubSubCategories(tempMain, subMainCategory);
        setSubSubCategories(newSubSubCategories);
        console.log("subSubCategories:",newSubSubCategories)}
      }
    }
  }, [subMainCategory, subSubCategories,fullDataCategories]);
    useEffect(() => {
      
      const fetchCategories = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_API_URL+'/api/category');
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
   // Função para buscar subcategorias de uma categoria
    const fetchSubCategories = async (data) => {
      try {
        console.log('data:', data);
        const response = await axios.get(process.env.REACT_APP_API_URL+`/api/category/subCat/${data}`);
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
    
    function getSubSubCategories(categoryName, subcategoryId) {
      

      for (const item of fullDataCategories) {
        console.log('item:', item);
       
        if (item.category.name === categoryName && item.subcategory._id === getSubCategoryIdFromName(subcategoryId)) {
          console.log('item.subSubCategories:', item.subSubCategories);
          setSubSubCategories(item.subSubCategories);
          setLoading(false);
              return item.subSubCategories;
          }
      }
      setLoading(false);

      return [subSubCategories];
  }
   

  const handleCreateSubSubCategory = async (event) => {
    event.preventDefault();
    console.log(newSubSubCategoryToCreate)
  
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL+`/api/category/subSubCat/${getCategoryNameFromId(mainCategory)}/${getSubCategoryNameFromId(subMainCategory)}`,{"name": newSubSubCategoryToCreate});
      console.log(response)
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
const handleDeleteSubSubCategory = async (event) => {
  event.preventDefault();
  console.log(subSubMainCategoryToDelete)

  try {
      const response = await axios.delete(process.env.REACT_APP_API_URL+`/api/category/subSubCat/${getCategoryNameFromId(mainCategoryToDelete)}/${getSubCategoryNameFromId(subMainCategoryToDelete)}/${getSubSubCategoryNameFromId(subSubMainCategoryToDelete)}`);
    console.log(response)
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
   

    const handleDropdownMainCategoryChange = (selectedOptionName) => {
      setLoading(true)
      setMainCategory(selectedOptionName)
      console.log(selectedOptionName)
      fetchSubCategories(getCategoryNameFromId(selectedOptionName))
    };

    const handleDropdownSubCategoryChange = (event) => {
      if (count === 0) {
        setCount(1)
        setLoading(true);
      }

       getSubSubCategories(getCategoryNameFromId(mainCategory), event)
      setSubMainCategory(event);
    };
    const handleDropdownSubCategoryChangeToDelete = (event) => {
      if (count === 0) {
        setCount(1)
        setLoading(true);
      }

       getSubSubCategories(getCategoryNameFromId(mainCategoryToDelete), event)
      setSubMainCategoryToDelete(event);
    };
    const handleDropdownSubSubCategoryChangeToDelete = (event) => {
      if (count === 0) {
        setCount(1)
        setLoading(true);
      }

       getSubSubCategories(getCategoryNameFromId(mainCategoryToDelete), event)
      setSubSubMainCategoryToDelete(event);
    };
    const handleDropdownMainCategoryChangeToDelete = (selectedOptionName) => {
      setLoading(true)
      setMainCategoryToDelete(selectedOptionName)
      console.log(selectedOptionName)
      fetchSubCategories(getCategoryNameFromId(selectedOptionName))
    };

    function getCategoryNameFromId(categoryName) {
  
      const category = categories.find(category => category.name === categoryName);
      return category ? category.name : null;
     }
     function getSubCategoryNameFromId(subCategoryName) {
      const subCategory = subCategories.find(subCategories => subCategories.name === subCategoryName);
      return subCategory ? subCategory.name : null;
 
    }
    function getSubCategoryIdFromName( subCategoryName) {
      const subCategory = subCategories.find(subCategory => subCategory.name === subCategoryName);
      return subCategory ? subCategory._id : null;
    }
    function getSubSubCategoryNameFromId(subCategoryName) {
      const subCategory = subSubCategories.find(subCategories => subCategories.name === subCategoryName);
      return subCategory ? subCategory.name : null;
 
    }
    
   
    if (loading) {
      return <Loader/>; // Ou qualquer indicador de carregamento que você preferir
    }
  
    return (<>
        
        <Container>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12}> <Title>Create Subcategory label</Title></Grid>
        <Grid item xs={12} sm={4}>
       
            <CategoryTitle> Choose main category </CategoryTitle>
                          <InputBox>
              <SearchInput 
                placeholder={mainCategory ? getCategoryNameFromId(mainCategory) : 'Insert category'} 
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
              placeholder={subMainCategory ? getSubCategoryNameFromId(subMainCategory) : 'Insert subcategory'}
              id="subMaincategory"
              required
              onClick={(e) => setSubMainCategory(e.target.value)} // This might not be necessary
              value={subMainCategory}
              onChange={ handleDropdownSubCategoryChange} // Adjusted to match event handling
              options={subCategories}
              
              name="Subcategory"
            />
            </InputBox>
              </Grid>
              )}
              {mainCategory && subMainCategory && (  
              <Grid item xs={12} sm={4}>
               
            <CategoryTitle> Write subcategory label  </CategoryTitle>
              <InputBox>
              <InputF
              type={'text'} 
              placeholder={ 'Insert subcategory label'}
              id="subsubcategory"
              required
              onChange={(e) => setNewSubSubCategoryToCreate(e.target.value)}  
              value={newSubSubCategoryToCreate}
              name="label"/>
                  </InputBox>
              </Grid>
               )}
        <Grid item xs={12} sm={12}> <InputSubmit type="submit" onClick={handleCreateSubSubCategory}>
            Create Label
        </InputSubmit></Grid>
            </Grid>
        </Container>

        <Container>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12}> <Title>Delete Subcategory label</Title></Grid>
        <Grid item xs={12} sm={4}>
       
            <CategoryTitle> Choose main category first </CategoryTitle>
                          <InputBox>
              <SearchInput 
                placeholder={mainCategoryToDelete ? getCategoryNameFromId(mainCategoryToDelete) : 'Insert category'} 
                id="mainCategoryToDelete"
                required
                onClick = {(e) => setMainCategoryToDelete(e.target.value)}
                value={mainCategoryToDelete}
                onChange={handleDropdownMainCategoryChangeToDelete}
                name="Categories"
                options={categories}
                
              />
            </InputBox>
                </Grid>
            {mainCategoryToDelete && (  
            <Grid item xs={12} sm={4}>
             
            <CategoryTitle> select subcategory  </CategoryTitle>
            
            <InputBox>
            <SearchInput
              type={'text'}
              placeholder={subMainCategoryToDelete ? getSubCategoryNameFromId(subMainCategoryToDelete) : 'Insert subcategory'}
              id="subMaincategoryToDelete"
              required
              onClick={(e) => setSubMainCategoryToDelete(e.target.value)} // This might not be necessary
              value={subMainCategoryToDelete}
              onChange={ handleDropdownSubCategoryChangeToDelete} // Adjusted to match event handling
              options={subCategories}
              
              name="Subcategory"
            />
            </InputBox>
              </Grid>
              )}
              {mainCategoryToDelete && subMainCategoryToDelete && (  
              <Grid item xs={12} sm={4}>
               
            <CategoryTitle> Select subcategory label  </CategoryTitle>
              <InputBox>
              {/* <InputF
              type={'text'} 
              placeholder={ 'Insert subcategory label'}
              id="subsubcategoryToDelete"
              required
              onchange={(e) => setNewSubSubCategoryToDelete(e.target.value)}
              
              
              name="label"/>
      
                  </InputBox> */}
                  <SearchInput
              type={'text'}
              placeholder={subSubMainCategoryToDelete ? (subSubMainCategoryToDelete) : 'Insert subcategory'}
              id="subMaincategoryToDelete"
              required
              onClick={(e) => setSubSubMainCategoryToDelete(e.target.value)} // This might not be necessary
              value={subSubMainCategoryToDelete}
              onChange={ handleDropdownSubSubCategoryChangeToDelete} // Adjusted to match event handling
              options={subSubCategories}
              
              name="Subcategory"
            />
                        </InputBox>

              </Grid>
               )}
        <Grid item xs={12} sm={12}> <InputSubmit type="submit" onClick={handleDeleteSubSubCategory}>
            Delete Label 
        </InputSubmit></Grid>
            </Grid>
        </Container> 
        </>
    );
}