import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

import axios from "axios";
import Loader from '../../LoadingComponent/index';
import  SearchInput  from '../../../components/SearchInputFieldComponent/index';
import { useAuth } from '../../AuthContext';
import '../../../assets/colors/colors.css'
import { InputSubmit, Container,InputBox ,Title,Form, Wrapper,SubCategoryTitle,CategoryTitle , CategorySection } from '../../../assets/StylePopularComponent/style';
const CategoryButton = styled.button`
    width: max-content;
    padding: 4px 9px;
    border-radius: 33px;
    border: 1px solid var(--primary-green-color);
    background-color: var(--white-color);
    color: var(--black-color);
    cursor: pointer;
    font-size: 1rem;
    opacity: 1;
    background-color: ${props => props.isSelected ? 'var(--primary-green-color)' : 'var(--white-color)'};
    color: ${props => props.isSelected ? 'var(--white-color)' : 'var(--black-color)'};
    &:hover {
      background-color: var(--primary-green-color);
      color: var(--white-color);
    }
    font-size: 1rem;
    opacity: 1;
`;

const RemoveButton = styled.button`
    margin-left: 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: darkred;
    }
`;
export default function AddCategory  ({ index, removeCategory })  {
    const [loading, setLoading] = useState(true);


    const [subCategories, setSubCategories] = React.useState('');
    const [subCategory, setSelectedSubCategory] = React.useState('');
    const [categories, setCategories] = React.useState('');
    const [category, setSelectedCategory] = React.useState('');
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [subSubCategory, setSubSubCategory] = useState(null);
    //List with objectCategories
    const [objectCategories, setObjectCategories] = useState({});


    const [fullDataCategories, setFullDataCategories] = useState([]);
    const [activeButton, setActiveButton] = useState(null);

     //GET CATEGORIES
    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/category');
            setCategories(response.data);
            setLoading(false)

            console.error(response.data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
            // Lide com erros conforme necessário
        }
        };
    
     fetchCategories();
    setLoading(false)
  }, []);
  function getCategoryNameFromId(categoryName) {
    console.log(categories)
    console.log(categoryName)
    const category = categories.find(category => category._id === categoryName);
    console.log(category)
    return category ? category.name : null;
   }
    //GET SUBCATEGORIES AND SUBSUBCATEGORIES
    const fetchSubCategories = async (data) => {
        try {
        console.log(data)
        const response = await axios.get(`http://localhost:3000/api/category/subCat/${getCategoryNameFromId(data)}`);
        setFullDataCategories(response.data);
        console.log(response.data)
        setSubCategories(extractSubcategories (response.data));
        setLoading(false); // Definir o estado de carregamento como falso quando o fetch estiver concluído
        console.log(data)
        setSelectedCategory(data) 
        
    } catch (error) {
        console.error('Failed to fetch categories', error);
        // Lide com erros conforme necessário
        }
    }

    function getSubSubCategories(categoryName, subcategoryId) {
        for (const item of fullDataCategories) {
        
          if (item.category.name === categoryName && item.subcategory._id === subcategoryId) {
  
            setSubSubCategories(Object.entries(item.subSubCategories));
            console.log(subSubCategories)
            setLoading(false);
                return item.subSubCategories;
            }
        }
        setLoading(false);
  
        return [subSubCategories];
    }
        // Função para buscar subcategorias do json que vem da api
    function extractSubcategories(categories) {
        return categories.map(category => ({
            _id: category.subcategory._id,
            name: category.subcategory.name
        }));
    }
    const handleDropdownChangeCategory = (category) => {
        console.log(getCategoryNameFromId(category))
        setSelectedCategory(getCategoryNameFromId(category));
        setLoading(true);
        fetchSubCategories(category)
    
      };
      const handleSubCategoryClick = (subCategory) => {
        setSelectedSubCategory(subCategory);
        createObjectSubCategories(subCategory)
          
      };
      const handleDropdownChangeSubCategory = (selectedOptionName) => {
        setSelectedSubCategory(selectedOptionName)
        handleSubCategoryClick(selectedOptionName)
        // Faça o que for necessário com o nome da opção selecionada
      }; 
      function createObjectSubCategories(subCategory){
        console.log(subCategory)
        console.log(fullDataCategories)
        const subCategories = fullDataCategories.find(category => category.subcategory._id === subCategory);
        console.log(category) 
        console.log(getSubSubCategories(getCategoryNameFromId(category),subCategory) )
    
      }
      function handleSubSubCategoryClick(subSubCategory) {
        console.log(subSubCategory)
        setSubSubCategory(subSubCategory);
        const subSubCategoryObject = {
          "name": getSubCategoryNameFromId(subCategory),
          "subSubCategory": getSubSubCategoryNameFromId(subSubCategory),
        }
        // Determine the new key (next index)
        const newKey = Object.keys(objectCategories).length;
    
        // Update the state immutably
        setObjectCategories(prevState => ({
          ...prevState,
          [newKey]: subSubCategoryObject
        }));
        console.log(objectCategories)
      }
      function getSubSubCategoryNameFromId(categoryName) {
        const flattenedSubSubCategories = subSubCategories.flat();
        const category = flattenedSubSubCategories.find(category => category._id === categoryName);
        return category ? category.name : null;
      }
      function getSubCategoryNameFromId(categoryName) {
        const category = subCategories.find(category => category._id === categoryName);
        return category ? category.name : null;
       }
if (loading) {
    return <Loader/>; // Ou qualquer indicador de carregamento que você preferir
  }
return (
<>
<Grid container spacing={2}>
       
      <Grid item xs={12} sm={3}> 
      <SubCategoryTitle>Choose the category of the found object.</SubCategoryTitle>
      
     
       <InputBox>
              <SearchInput 
                
                placeholder={category ? getCategoryNameFromId(category) : 'Insert category'} 
                id="category"
                required
                onClick = {(e) => handleDropdownChangeCategory(e.target.value)}
                value={category}
                onChange={handleDropdownChangeCategory}
                name="Categories"
                options={categories}
                
              />
            </InputBox>   
      
      </Grid>
      
      <Grid item xs={12} sm={3}>
        
  {category !== null && ( <>
        <SubCategoryTitle>Choose the subcategory of the found object.</SubCategoryTitle>
        <InputBox>
          <SearchInput 
            
            placeholder={'Subcategories'}  
            id="subcategory"
            required
            onClick = {(e) => handleSubCategoryClick(e.target.value)}
            value={subCategory}
            onChange={handleDropdownChangeSubCategory}
            name="Sub categories"
            options={subCategories}
            
          />
        </InputBox> </>
  )}
      </Grid>
      <Grid item xs={12} sm={5}> 
       {subCategory !== null && ( <>
     <CategorySection>
      {subSubCategories.map(([key, value], index) => (
        <CategoryButton
          key={index}
          isSelected={subSubCategory === value._id}
          onClick={() => handleSubSubCategoryClick(value._id)}
          active={activeButton === value._id}
        >
          {value.name}
        </CategoryButton>
      ))}
       
      </CategorySection> </>
      )}
      <Grid item xs={12} sm={1}> 
      <div>
      <span>Categoria {index + 1}</span>
      <RemoveButton onClick={() => removeCategory(index)}>Remover</RemoveButton>
        </div>
        </Grid> 
      </Grid> 
      </Grid>

</>);
}
 