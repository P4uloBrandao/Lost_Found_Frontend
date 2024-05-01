import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import FilterButtons from "../components/SearchFilters/index";
import Card from "../components/CardComponent/index";

const Container = styled.div`
    top: 3em;
    position: relative;
`;

export default function LostObjectCatalogPage() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [objects, setObjects] = useState([]);

  const filters = ['Filter 1', 'Filter 2', 'Filter 3'];

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      // Assume you have a function to fetch lost objects data from an API
      // For simulation purposes, let's just set some sample data
      const sampleData = [
        {
          "_id": "6630af0c4d90e2535504a7fc",
          "userWhoFound": "65f2fb76b2cdde0f96f64dc3",
          "policeOfficerThatReceived": "65f2fb76b2cdde0f96f64dc3",
          "category": "Roupa",
          "description": "Camisola vermelha",
          "location": "Campo grande, Lisboa",
          "price": "0",
          "date": "05/05/2024",
          "photo": "https://ricardohage.com.br/wp-content/uploads/2019/01/fotografia-dicas-tutorial-efeito-especial_0000_objeto-flutuante.jpg",
          "status": "5 Matches Found",
          "claimant": null,
          "__v": "0"
        }, {
          "_id": "6630af0c4d90e2535504a7fc",
          "userWhoFound": "65f2fb76b2cdde0f96f64dc3",
          "policeOfficerThatReceived": "65f2fb76b2cdde0f96f64dc3",
          "category": "Roupa",
          "description": "Camisola vermelha",
          "location": "Campo grande, Lisboa",
          "price": "0",
          "date": "05/05/2024",
          "photo": "https://ricardohage.com.br/wp-content/uploads/2019/01/fotografia-dicas-tutorial-efeito-especial_0000_objeto-flutuante.jpg",
          "status": "5 Matches Found",
          "claimant": null,
          "__v": "0"
        }, {
          "_id": "6630af0c4d90e2535504a7fc",
          "userWhoFound": "65f2fb76b2cdde0f96f64dc3",
          "policeOfficerThatReceived": "65f2fb76b2cdde0f96f64dc3",
          "category": "Roupa",
          "description": "Camisola vermelha",
          "location": "Campo grande, Lisboa",
          "price": "0",
          "date": "05/05/2024",
          "photo": "https://ricardohage.com.br/wp-content/uploads/2019/01/fotografia-dicas-tutorial-efeito-especial_0000_objeto-flutuante.jpg",
          "status": "5 Matches Found",
          "claimant": null,
          "__v": "0"
        }, {
          "_id": "6630af0c4d90e2535504a7fc",
          "userWhoFound": "65f2fb76b2cdde0f96f64dc3",
          "policeOfficerThatReceived": "65f2fb76b2cdde0f96f64dc3",
          "category": "Roupa",
          "description": "Camisola vermelha",
          "location": "Campo grande, Lisboa",
          "price": "0",
          "date": "05/05/2024",
          "photo": "https://ricardohage.com.br/wp-content/uploads/2019/01/fotografia-dicas-tutorial-efeito-especial_0000_objeto-flutuante.jpg",
          "status": "5 Matches Found",
          "claimant": null,
          "__v": "0"
        }, {
          "_id": "6630af0c4d90e2535504a7fc",
          "userWhoFound": "65f2fb76b2cdde0f96f64dc3",
          "policeOfficerThatReceived": "65f2fb76b2cdde0f96f64dc3",
          "category": "Roupa",
          "description": "Camisola vermelha",
          "location": "Campo grande, Lisboa",
          "price": "0",
          "date": "05/05/2024",
          "photo": "https://ricardohage.com.br/wp-content/uploads/2019/01/fotografia-dicas-tutorial-efeito-especial_0000_objeto-flutuante.jpg",
          "status": "Found",
          "claimant": null,
          "__v": "0"
        },
        
      ];

      // Update the objects state with the fetched data
      setObjects(sampleData);
    };

    fetchData();
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    // Add code to apply the selected filter
  };

  return (
    <Container>
      <h1>Lost Object Catalogue</h1>
      <FilterButtons  filters={filters} handleFilterClick={handleFilterClick} />
      <Grid sx={{ textAlign: '-webkit-center',padding: '0 10rem',placeContent: 'center' }} container spacing={5}>
        {objects.map((object, index) => (
          <Grid spacing={2} sx={{justifyContent: 'center'        
          }} item  xs={10} md={10} key={index}>
            <Card  spacing={2}
              name={object.description}
              description={object.description}
              location={object.location}
              category={object.category}
              id={object._id}
              date ={object.date}
              photo ={object.photo}
              status={object.status}
              policeOfficer={object.policeOfficerThatReceived}
            />
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}
