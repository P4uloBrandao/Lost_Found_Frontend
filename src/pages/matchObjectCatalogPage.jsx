import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Card from "../components/CardComponent/index";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import LostItemComponent from '../components/matchItemsComponents/LostItemComponent';
const Container = styled.div`
  top: 3em;
  position: relative;
`;

export default function LostObjectCatalogPage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param1 = searchParams.get('param1');
  const param2 = searchParams.get('param2');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        // Buscar os dados dos objetos perdidos
        const objectsResponse = await axios.post(`http://localhost:3000/api/match`, {
          "category": param1
      });
        const objectsData = objectsResponse.data;
  
        // Atualizar o estado dos objetos com os dados buscados
        setObjects(objectsData);
  
        // Para cada objeto, buscar o nome da categoria associada
        const updatedObjects = await Promise.all(objectsData.map(async (object) => {
          const catId = object.category;
          const categoryResponse = await axios.get(`http://localhost:3000/api/category/${catId}`);
          const categoryName = categoryResponse.data.name;
  
          // Retornar um novo objeto com o nome da categoria atualizado
          return {
            ...object,
            category: categoryName
          };
        }));
  
        // Atualizar o estado dos objetos com os dados das categorias atualizados
        setObjects(updatedObjects);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Lidar com erros conforme necessário
      }
    };
  
    fetchData();
  }, []);
  
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    // Add code to apply the selected filter
  };
  
  return (
    <div>
      <WelcomeHeaderComponent name={'Carlos'} description={'Did you know that over 30 milion wallets are lost every year?'}/>
      <Menu options={option} selected={'My Lost Objects'} />
      <LostItemComponent/>
    </div>
   


  );
}