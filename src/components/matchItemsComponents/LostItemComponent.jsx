import React, { useState } from 'react';
import LostItemDetails from './LostItemDetails/LostItemDetails';
import LostItemPicture from './LostPictureComponent/LostItemPictures'; // Assuming renamed to plural
import axios from "axios";
import imageSrc from './LostPictureComponent/Image.svg'; 
import LostItemHeader from './LostItemHeader/LostItemHeader';
import MatchFoundComponent from './MatchFoundComponent';

const LostItemComponent = ({ itemid }) => { // Pass itemid as a prop
  const [lostObject, setLostObject] = useState({
    "owner": "12345",
    "category": "2",
    "title": "Chaves perdidas",
    "description": "Chaves pretas com um chaveiro verde",
    "location": "Rua da Alfândega, 123",
    "price": 0,
    "status": "Lost",
    "objectImage": imageSrc 
  });

  const [matches, setMatches] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/100', // Placeholder image
      title: 'Cartier Wallet',
      date: '05/04/2023',
      location: 'Campo Grande, Lisboa',
      descriptionLink: '#description1',
      matchesLink: '#matches1',
      onRemove: (id) => console.log(`Remove item with id ${id}`),
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100', // Placeholder image
      title: 'Gucci Bag',
      date: '12/03/2023',
      location: 'Avenida da Liberdade, Lisboa',
      descriptionLink: '#description2',
      matchesLink: '#matches2',
      onRemove: (id) => console.log(`Remove item with id ${id}`),
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/100', // Placeholder image
      title: 'Ray-Ban Sunglasses',
      date: '20/02/2023',
      location: 'Rossio Square, Lisboa',
      descriptionLink: '#description3',
      matchesLink: '#matches3',
      onRemove: (id) => console.log(`Remove item with id ${id}`),
    }
  ]);

  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true); // Set loading state to true
  //     setError(null); // Clear any previous errors

  //     try {
  //       const response = await axios.get(`https://10.182.0.39/api/lost-objects/${itemid}`);
  //       const objectData = response.data;
  //       setLostObject(objectData);
  //     } catch (error) {
  //       console.error('Failed to fetch data:', error);
  //       setError(error); // Set error state
  //     } finally {
  //       setIsLoading(false); // Set loading state to false after fetch (success or failure)
  //     }
  //   };

  //   fetchData();
  // }, [itemid]); // Dependency array: fetch data when itemid changes

  if (isLoading) {
    return <div>Carregando... (Loading...)</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados. (Error loading data.)</div>;
  }

  if (!lostObject) {
    return <div>Objeto perdido não encontrado. (Lost object not found.)</div>;
  }

  return (
    <div className="lost-item-container" style={{ display: 'flex', flexDirection: 'column', width: '100%',}}>
      <LostItemHeader title={lostObject.title} />
      <div style={{ display: 'flex', alignItems: 'start', marginTop: '20px', gap: '40px' }}>
        <div style={{ flex: '0 0 40%', padding:'0' }}>
          <LostItemPicture images={lostObject.objectImage ? [lostObject.objectImage] : []} nome={lostObject.title} />
        </div>
        <div style={{ flex: '1 1 55%', marginTop:'1%' }}>
          <LostItemDetails status={lostObject.status} description={lostObject.description} location={lostObject.location} />
        </div>
      </div>
      <MatchFoundComponent matches={matches} />
    </div>
  );
};

export default LostItemComponent;
