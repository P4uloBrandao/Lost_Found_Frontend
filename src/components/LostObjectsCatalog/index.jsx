import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

import Card from "../CardComponent/index";
import SearchInput from "../SearchInputFieldComponent/index";
import axios from "axios";

const Container = styled.div`
    position: relative;
`;

const Title = styled.h2`
  color: var(--black-color);
  opacity: 1;
  text-align: left;
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  color: #3cb684;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  text-align: left !important;
  margin-top: 0px;
`;

const SearchButton = styled.button`
  bottom: 50px;
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #3cb684;
  color: white;
  border: none;
  border-radius: 33px;
  cursor: pointer;
  &:hover {
    background-color: #34a26a;
  }
`;

const ResetButton = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: var(--primary-green-color);
  cursor: pointer;
  margin-right: 11px;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function LostObjectCatalog() {
  const [errorMessage, setErrorMessage] = useState("");
  const [objects, setObjects] = useState([]);
  const [objectName, setObjectName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null); // UseRef para o campo de busca

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        // Buscar os dados dos objetos perdidos
        const objectsResponse = await axios.get(`http://localhost:3000/api/lost-objects/user/${token}`);
        let objectsData = objectsResponse.data;

        // Renomear o campo title para name
        objectsData = objectsData.map(obj => ({ ...obj, name: obj.title }));
       
        // Atualizar o estado dos objetos com os dados buscados
        setObjects(objectsData);
        setFilteredObjects(objectsData); // Inicialmente, mostrar todos os objetos
  
        setIsLoading(false);
  
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Lidar com erros conforme necessário
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log("Current objectName:", objectName); // Print objectName to the console whenever it changes
  }, [objectName]);

  useEffect(() => {
    console.log("Current searchTerm:", searchTerm); // Print searchTerm to the console whenever it changes
  }, [searchTerm]);

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.put(`http://localhost:3000/api/lost-objects/${getLostObjectID(objectName,objects)}`);
    } catch (error) {
        console.error(error);

        if (error.response && error.response.data) {
            setErrorMessage(error.response.data); // Set the error message if present in the error response
        } else {
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    }
    //  window.location.reload();
  }

  const handleDropdownChange = (selectedOptionName) => {
    setObjectName(selectedOptionName)
  };

  const handleSearch = (value) => {
    const filtered = objects.filter(obj =>
      obj.name.toLowerCase() === value.toLowerCase()
    );
    setFilteredObjects(filtered);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilteredObjects(objects); // Exibir todos os objetos novamente
  };

  function getLostObjectID(name, objects) {
    const foundItem = objects.find(item => item.name === name);
    return foundItem ? foundItem._id : null;
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Title>My Lost Objects</Title>
      <CategoryTitle>
        Here you can view all your lost objects. Remember to never lose hope!
      </CategoryTitle>
      <div>
        <ButtonContainer>
          <SearchInput 
            placeholder={'Search your Lost Objects'}  
            id="Objects"
            required
            onChange={handleDropdownChange}
            name="Lost Object"
            options={objects}
            ref={searchInputRef}
          />
          <SearchButton onClick={() => {handleSearch(objectName); }}>Search</SearchButton>
          <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>
        </ButtonContainer>
      </div>
      <Grid sx={{ textAlign: '-webkit-center', pt: 7, width: '100%' }} container spacing={5}>
        {filteredObjects.map((object, index) => (
          <Grid spacing={2} sx={{ justifyContent: 'center' }} item xs={10} md={10} key={index}>
            <Card  
              spacing={2}
              name={object.name} 
              description={object.description}
              location={object.location}
              category={object.category}
              id={object.object_id}
              catId={object.category_id}
              date={object.lostDate}
              photo={object.objectImage}
              status={object.status}
              matchButton={true}
            />
          </Grid>
        ))}
      </Grid> 
    </Container>
  );
}
