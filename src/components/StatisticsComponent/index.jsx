// components/Estatistics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InputSubmit, Container,InputBox ,Title,Form, Wrapper,SubCategoryTitle,CategoryTitle } from '../../assets/StylePopularComponent/style';
import styled from 'styled-components';

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
        <ul>
          {stats.usersByRole.map(role => (
            <li key={role._id}>{role._id}: {role.count}</li>
          ))}
        </ul>
      </div>
      <div>
        <SubCategoryTitle>Police Officers by Station</SubCategoryTitle>
        <ul>
          {stats.policeOfficersByStation.map(police => (
            <li key={police._id}>{police.stationName}: {police.count}</li>
          ))}
        </ul>
      </div>
      <div>
        <SubCategoryTitle>Lost Objects by Category</SubCategoryTitle>
        <ul>
          {stats.lostObjectsByCategory.map(category => (
            <li key={category._id}>{category.categoryName}: {category.count}</li>
          ))}
        </ul>
      </div>
      <div>
        <SubCategoryTitle>Found Objects by Category</SubCategoryTitle>
        <ul>
          {stats.foundObjectsByCategory.map(category => (
            <li key={category._id}>{category.categoryName}: {category.count}</li>
          ))}
        </ul>
      </div>
      <div>
        <SubCategoryTitle>Users by Gender</SubCategoryTitle>
        <ul>
          {stats.usersByGender.map(gender => (
            <li key={gender._id}>{gender._id || 'Not specified'}: {gender.count}</li>
          ))}
        </ul>
      </div>
      <div>
        <SubCategoryTitle>Users by Status</SubCategoryTitle>
        <ul>
          {stats.usersByStatus.map(status => (
            <li key={status._id}>{status._id || 'Not specified'}: {status.count}</li>
          ))}
        </ul>
      </div></Grid>
    </Container>
  );
};

export default Estatistics;
