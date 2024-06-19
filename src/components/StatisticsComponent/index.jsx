// components/Estatistics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InputSubmit, Container,InputBox ,Title,Form, Wrapper,SubCategoryTitle,CategoryTitle } from '../../assets/StylePopularComponent/style';
import styled from 'styled-components';
import BarChart from '../BarChartComponent';
import Loader from '../LoadingComponent/index';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 70pt;
  align-self: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50pt; /* Ajuste o gap conforme necessário */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 30pt; /* Ajuste o gap conforme necessário */
  }
`;
const Estatistics = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 38.72, lng: -9.14 }); // Initial center (Lisbon)
  const libraries = ['places']; // Include places library for location search
  const [loading, setLoading] = useState(true);
  const [location, setObjLoc] = React.useState('');
  const [foundObjects, setFoundObjects] = useState([]);
  const [lostObjects, setLostObjects] = useState([]);
  const [filteredFoundObjects, setFilteredFoundObjects] = useState([]);
  const [filteredLostObjects, setFilteredLostObjects] = useState([]);

  const [stats, setStats] = useState({
    usersByRole: [],
    policeOfficersByStation: [],
    lostObjectsByCategory: [],
    foundObjectsByCategory: [],
    usersByGender: [],
    usersByStatus: [],

  });
  const mapContainerStyle = {
    width: '50vw',
    height: '50vh',
      alignSelf: 'center',
  };

  useEffect(() => {
    const fetchFoundObjects = async () => {
      try {
        // Buscar os dados dos objetos encontrados
        const objectsResponse = await axios.get('http://localhost:3000/api/found-objects');
        let objectsData = objectsResponse.data;
  
        // Atualizar o estado dos objetos com os dados buscados
        setFoundObjects(objectsData);
  
        // Atualizar os pontos filtrados no mapa para objetos encontrados
        let temp = getPreSelectedLocations(objectsData);
        console.log(temp);
        setFilteredFoundObjects(temp);
  
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch found objects data:', error);
        // Lidar com erros conforme necessário
      }
    };
  
    fetchFoundObjects();
  }, []); // Dependências vazias para executar apenas uma vez ao montar o componente
  
  useEffect(() => {
    const fetchLostObjects = async () => {
      try {
        // Buscar os dados dos objetos perdidos
        const objectsResponse = await axios.get('http://localhost:3000/api/lost-objects');
        let objectsData = objectsResponse.data;
  
        // Atualizar o estado dos objetos com os dados buscados
        setLostObjects(objectsData);
  
        // Atualizar os pontos filtrados no mapa para objetos perdidos
        let temp = getPreSelectedLocations(objectsData);
        console.log(temp);
        setFilteredLostObjects(temp);
  
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch lost objects data:', error);
        // Lidar com erros conforme necessário
      }
    };
  
    fetchLostObjects();
  }, []); // Dependências vazias para executar apenas uma vez ao montar o componente
  
const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDPUTFHLcj71rpOYKfPwigaRF8uiOKDvWo',
    libraries,
  });
const options = [
  { id: "yesOpt", value: "yes", text: "Yes", defaultSelection: true },
  { id: "noOpt", value: "no", text: "No", defaultSelection: false },
  
];
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
    setLoading(false);
    fetchData();
  }, []);
  function getPreSelectedLocations(data) {
    return data
        .filter(item => item.coordinates) // Filtra itens sem coordenadas
        .map(item => {
            const coordinates = item.coordinates.split(', ').reduce((acc, coord) => {
                const [key, value] = coord.split(': ');
                acc[key] = parseFloat(value);
                return acc;
            }, {});

            return {
                lat: coordinates.lat,
                lng: coordinates.lng,
                address: item.location,
                name: item.title
            };
        });
}

  if (loadError) return <div className="contain">Error loading maps</div>;
  if (!isLoaded) return <div className="contain"><Loader/></div>;
   
if (loading) {
  return <Loader/>; // Ou qualquer indicador de carregamento que você preferir
}
  return (
    <>
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
        <BarChart data={stats.foundObjectsByCategory} />          
        
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

    <Container>
    <Title style={{ alignSelf: 'center' }}>Map with found objects</Title>
    <InputBox>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={mapCenter}
    >
      {filteredFoundObjects.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          title={location.address}
        />
      ))}
    </GoogleMap>
    
        </InputBox>

    </Container>
    <Container>
    <Title style={{ alignSelf: 'center' }}>Map with lost objects</Title>
    <InputBox>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={mapCenter}
    >
      {filteredLostObjects.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          title={location.address}
        />
      ))}
    </GoogleMap>
    
        </InputBox>

    </Container>
    </>
  );
};

export default Estatistics;
