// components/Estatistics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InputSubmit, Container,InputBox ,Title,Form, Wrapper,SubCategoryTitle,CategoryTitle } from '../../assets/StylePopularComponent/style';
import styled from 'styled-components';
import BarChart from '../BarChartComponent';
const Grid = styled.div`
display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 70pt;
  
  align-self: center;
`;
const Estatistics = () => {
  const [stats, setStats] = useState({
    usersByRole: [],
    policeOfficersByStation: [],
    lostObjectsByCategory: [],
    foundObjectsByCategory: [],
    usersByGender: [],
    usersByStatus: [],

  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stats');
        setStats(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      
      <Title style={{ alignSelf: 'center' }}>Statistics</Title>
      <Grid>
      <div>
        <SubCategoryTitle>Users by Role</SubCategoryTitle>
        <BarChart data={stats.usersByRole} />

      </div>
      <div>
        <SubCategoryTitle>Police Officers by Station</SubCategoryTitle>
        <BarChart data={stats.policeOfficersByStation} />
          
      </div>
      <div>
        <SubCategoryTitle>Lost Objects by Category</SubCategoryTitle>
        <BarChart data={stats.lostObjectsByCategory} />

      </div>
      <div>
        <SubCategoryTitle>Found Objects by Category</SubCategoryTitle>
        <BarChart data={stats.lofoundObjectsByCategorystObjectsByCategory} />
          
        
      </div>
      <div>
        <SubCategoryTitle>Users by Gender</SubCategoryTitle>
        <BarChart data={stats.usersByGender} />

      </div>
      <div>
        <SubCategoryTitle>Users by Status</SubCategoryTitle>
        <BarChart data={stats.usersByStatus} />
      </div></Grid>
    </Container>
  );
};

export default Estatistics;
