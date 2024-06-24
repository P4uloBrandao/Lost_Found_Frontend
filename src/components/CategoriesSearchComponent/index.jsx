import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';
import "../../assets/colors/colors.css"
import SearchInput from "../SearchInputFieldComponent/index";
import { InputSubmit, Container, InputBox, Title, CategoryTitle } from '../../assets/StylePopularComponent/style';
import Grid from '@mui/material/Grid';
import Loader from '../LoadingComponent/index';

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

export default function CategorySelectionComponent({ onFilteredObjects,onClose }) {
  const [count, setCount] = useState(0);
  const [mainCategory, setMainCategory] = useState('');
  const [subMainCategory, setSubMainCategory] = useState('');
  const [subSubMainCategory, setSubSubMainCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [fullDataCategories, setFullDataCategories] = useState([]);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subMainCategory !== null && subSubCategories.length === 0) {
      const tempMain = getCategoryNameFromId(mainCategory);
      if (mainCategory && subMainCategory) {
        const newSubSubCategories = getSubSubCategories(tempMain, subMainCategory);
        setSubSubCategories(newSubSubCategories);
        console.log("subSubCategories:", newSubSubCategories);
      }
    }
  }, [subMainCategory, subSubCategories, fullDataCategories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+'/api/category');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  const fetchSubCategories = async (data) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL+`/api/category/subCat/${data}`);
      setFullDataCategories(response.data);
      setSubCategories(extractSubcategories(response.data));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  }

  function extractSubcategories(categories) {
    return categories.map(category => ({
      _id: category.subcategory._id,
      name: category.subcategory.name
    }));
  }

  function getSubSubCategories(categoryName, subcategoryId) {
    for (const item of fullDataCategories) {
      if (item.category.name === categoryName && item.subcategory._id === getSubCategoryIdFromName(subcategoryId)) {
        setSubSubCategories(item.subSubCategories);
        setLoading(false);
        return item.subSubCategories;
      }
    }
    setLoading(false);
    return [subSubCategories];
  }

  const handleSearch = async () => {
    const mainCatId = getCategoryIdFromName(mainCategory);
    const subCatId = getSubCategoryIdFromName(subMainCategory);
    const subSubCatId = getSubSubCategoryIdFromName(subSubMainCategory);

    try {
      const response = await axios.get(process.env.REACT_APP_API_URL+`/api/lost-objects/categories/${mainCatId}/${subCatId}/${subSubCatId}`);
      setFilteredObjects(response.data);
      onFilteredObjects(response.data); // Chamar a função de callback com os dados filtrados
      onClose(); // Fechar o popup após a busca
    } catch (error) {
      console.error('API call failed', error);
    }
  }

  const handleDropdownSubCategoryChange = (event) => {
    if (count === 0) {
      setCount(1);
      setLoading(true);
    }
    getSubSubCategories(getCategoryNameFromId(mainCategory), event);
    setSubMainCategory(event);
  };

  const handleDropdownSubSubCategoryChange = (event) => {
    if (count === 0) {
      setCount(1);
      setLoading(true);
    }
    getSubSubCategories(getCategoryNameFromId(mainCategory), event);
    setSubSubMainCategory(event);
  };

  const handleDropdownMainCategoryChange = (selectedOptionName) => {
    setLoading(true);
    setMainCategory(selectedOptionName);
    fetchSubCategories(getCategoryNameFromId(selectedOptionName));
  };

  function getCategoryNameFromId(categoryName) {
    const category = categories.find(category => category.name === categoryName);
    return category ? category.name : null;
  }

  function getCategoryIdFromName(categoryName) {
    const category = categories.find(category => category.name === categoryName);
    return category ? category._id : null;
  }

  function getSubCategoryNameFromId(subCategoryName) {
    const subCategory = subCategories.find(subCategory => subCategory.name === subCategoryName);
    return subCategory ? subCategory.name : null;
  }

  function getSubCategoryIdFromName(subCategoryName) {
    const subCategory = subCategories.find(subCategory => subCategory.name === subCategoryName);
    return subCategory ? subCategory._id : null;
  }

  function getSubSubCategoryIdFromName(subSubCategoryName) {
    const subSubCategory = subSubCategories.find(subSubCategory => subSubCategory.name === subSubCategoryName);
    return subSubCategory ? subSubCategory._id : null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}><Title>Search Category</Title></Grid>
        <Grid item xs={12} sm={4}>
          <CategoryTitle>Choose main category</CategoryTitle>
          <InputBox>
            <SearchInput
              placeholder={mainCategory ? getCategoryNameFromId(mainCategory) : 'Insert category'}
              id="mainCategory"
              required
              value={mainCategory}
              onChange={handleDropdownMainCategoryChange}
              name="Categories"
              options={categories}
            />
          </InputBox>
        </Grid>
        {mainCategory && (
          <Grid item xs={12} sm={4}>
            <CategoryTitle>Select subcategory</CategoryTitle>
            <InputBox>
              <SearchInput
                placeholder={subMainCategory ? getSubCategoryNameFromId(subMainCategory) : 'Insert subcategory'}
                id="subMaincategory"
                required
                value={subMainCategory}
                onChange={handleDropdownSubCategoryChange}
                options={subCategories}
                name="Subcategory"
              />
            </InputBox>
          </Grid>
        )}
        {mainCategory && subMainCategory && (
          <Grid item xs={12} sm={4}>
            <CategoryTitle>Select option</CategoryTitle>
            <InputBox>
              <SearchInput
                placeholder={subSubMainCategory ? subSubMainCategory : 'Insert subcategory'}
                id="subSubMaincategory"
                required
                value={subSubMainCategory}
                onChange={handleDropdownSubSubCategoryChange}
                options={subSubCategories}
                name="Option"
              />
            </InputBox>
          </Grid>
        )}
        <Grid item xs={12} sm={12}>
          <InputSubmit type="button" onClick={handleSearch}>
            Search
          </InputSubmit>
        </Grid>
      </Grid>
    </>
  );
}
