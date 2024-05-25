import React, { useState } from 'react';
import LostItemDetails from './LostItemDetails/LostItemDetails';
import LostItemPicture from './LostPictureComponent/LostItemPictures'; // Assuming renamed to plural
import axios from "axios";
import imageSrc from './LostPictureComponent/Image.svg'; 
import LostItemHeader from './LostItemHeader/LostItemHeader';

const LostItemComponent = ({ itemid }) => { // Pass itemid as a prop
  const [lostObject, setLostObject] = useState( {
    "owner": "12345",
    "category": "2",
    "title": "Chaves perdidas",
    "description": "Chaves pretas com um chaveiro verde",
    "location": "Rua da Alfândega, 123",
    "price": 0,
    "status": "Lost",
    "objectImage": imageSrc 
  });
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true); // Set loading state to true
  //     setError(null); // Clear any previous errors

  //     try {
  //       const response = await axios.get(`http://localhost:3000/api/lost-objects/${itemid}`);
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
    <div className="lost-item-container" style={{display:'flex',flexDirection:'column', width:'100%'}} >
      <LostItemHeader title={lostObject.title}/>
      <div style={{display:'flex', alignItems:'start' , marginTop:'0px'}}>
        <div style={{ flex: '30%' }}>
          <LostItemPicture images={lostObject.objectImage ? [lostObject.objectImage] : []} // Handle single image gracefully
                          nome={lostObject.title} />
        </div>
        <div style={{ flex: '70%',marginTop:'20px'}}>
          <LostItemDetails status={lostObject.status} description={lostObject.description} location={lostObject.location} />
        </div>
      </div>
    </div>
  );
};

export default LostItemComponent;
