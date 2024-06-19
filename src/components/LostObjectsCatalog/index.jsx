import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components'; // Importe styled-components
import Grid from '@mui/material/Grid';
import Card from "../CardComponent/index";
import SearchInput from "../SearchInputFieldComponent/index";
import Categories from "../CategoriesComponents/AddCategoriesObjectComponent/index";
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

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const LargePopupContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 40px; /* Ajuste o padding conforme necessário */
  width: 600px; /* Ajuste a largura conforme necessário */
  height: 400px; /* Ajuste a altura conforme necessário */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const Textbox = styled.textarea`
  width: 100%;
  height: 70%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #3cb684;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #34a26a;
  }
`;

export default function LostObjectCatalog() {
  const [errorMessage, setErrorMessage] = useState("");
  const [objects, setObjects] = useState([]);
  const [objectName, setObjectName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCategoriesPopupOpen, setIsCategoriesPopupOpen] = useState(false);
  const [description, setDescription] = useState(''); // Novo estado para descrição
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

  
  const handleDropdownChange = (selectedOptionName) => {
    setObjectName(selectedOptionName)
  };

  const handleSearch = (value) => {
    const filtered = objects.filter(obj =>
      obj.name.toLowerCase() === value.toLowerCase()
    );
    setFilteredObjects(filtered);
  };

  const handleDescriptionSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/lost-objects/description', {
        description: description
      });
      setFilteredObjects(response.data); // Atualizar os objetos filtrados com a resposta da API
      console.log(response.data[0])
      setIsPopupOpen(false); // Fechar o popup após a pesquisa
    } catch (error) {
      console.error("Failed to fetch objects by description:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilteredObjects(objects); // Exibir todos os objetos novamente
  };

 

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleCategoriesPopup = () => {
    setIsCategoriesPopupOpen(!isCategoriesPopupOpen);
  };

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
          <SearchButton onClick={togglePopup}>Description Filter</SearchButton>
          <SearchButton onClick={toggleCategoriesPopup}>Category Filter</SearchButton>
          <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>
        </ButtonContainer>
      </div>
      <Grid sx={{ textAlign: '-webkit-center', pt: 7, width: '100%' }} container spacing={5}>
        {filteredObjects.map((object, index) => (
          <Grid spacing={2} sx={{ justifyContent: 'center' }} item xs={10} md={10} key={index}>
            <Card  
              spacing={2}
              name={object.title} 
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
      {isPopupOpen && (
        <PopupOverlay>
          <PopupContent>
            <CloseButton onClick={togglePopup}>X</CloseButton>
            <Textbox 
              placeholder="Enter your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <SubmitButton onClick={handleDescriptionSearch}>Submit</SubmitButton>
          </PopupContent>
        </PopupOverlay>
      )}
      {isCategoriesPopupOpen && (
        <PopupOverlay>
          <LargePopupContent>
            <CloseButton onClick={toggleCategoriesPopup}>X</CloseButton>
            <Categories />
          </LargePopupContent>
        </PopupOverlay>
      )}
    </Container>
  );
}
