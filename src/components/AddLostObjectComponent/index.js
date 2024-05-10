import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputF  from '../inputFieldComponent/InputField';
import axios from "axios";
import '../../assets/colors/colors.css'
import CustomInputFiles from "../ImageInputComponent/FileInput";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
const StyledTextArea = styled.textarea`
    height: ${props => props.height}px;
    font-size: 16px;
    background: #ECECEC;
    color: var(--black-color);
    padding: 12px 0px;
    padding-inline: 12px; /* Utilize padding-inline para compatibilidade com navegadores mais antigos */
    border: none;
    border-radius: 30px;
    outline: none;
    resize: none; /* Impede o redimensionamento do usuário */
    overflow-y: auto; /* Adiciona uma barra de rolagem vertical quando necessário */
    word-wrap: break-word; /* Quebra de palavra automática */
    overflow-wrap: break-word; /* Quebra de palavra automática para navegadores mais antigos */
`;
const Container = styled.div`
  width: 180vh;
 
  margin: 5em 0;
  
  border-radius: 20px 20px 20px 20px; 
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  justify-content: flex-start; 
  box-sizing: border-box;
  border: 1px solid #D3D3D3; 
  background-color: white; 
  padding: 40px; 
`;

const CategoryTitle = styled.h2`
color: #3CB684;
font-family: 'Roboto', sans-serif;
font-size: 24px;
font-weight: 400;
line-height: 27px;
text-align: left;

margin-top: 0px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: var(--black-color); 
  opacity: 1;
  margin-bottom: 40px; 
`;



const CategorySection = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); 
  grid-gap: 10px; 
  justify-content: center; 
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  width: 174px;
  height: 66px;
  padding: 16px 24px;
  border-radius: 33px;
  border: 1px solid #3CB684;
  background-color: ${props => props.isSelected ? '#3CB684' : 'white'};
  color: ${props => props.isSelected ? 'white' : 'black'};
  cursor: pointer;
  &:hover {
    background-color: #3CB684;
    color: white;
  }
  font-size: 1rem;
  opacity: 1;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: -webkit-fill-available;
`;
const InputSubmit = styled.button`

width: 12.93306rem;
    height: 3.25rem;
    background: var(--primary-green-color);
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.11);
    transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
    text-align: center;
    font-family: Roboto;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 135.5%;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    color: var(--white-color);
    transition: 0.3s;
  &:hover {
    background: var(--white-color);
    border: solid 2px var(--primary-green-color);
    color:var(--primary-green-color);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.30), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }
`;
const ResetButton = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: var(--primary-green-color);
  cursor:pointer;
  margin-right: 11px;
  &:hover {
    text-decoration: underline;
`;
export default function LostObjectForm  ()  {
  const [objectImage, setObjImage] = React.useState("");

  const [owner, setOwner] = React.useState(localStorage.getItem("token"));
  const [title, setTitle] = React.useState('');  //FALTA BD
  const [category, setSelectedCategory] = React.useState('');
  const [location, setObjLoc] = React.useState('');
  const [description, setObjDesc] = React.useState('');
  const [price, setObjPrice] = React.useState(0);
  // const [objectImage, setObjPhotos] = React.useState([]); //FALTA BD
  const status = "Lost"
  const [message, setMessage] = useState("");
  const [categories, setCategories] = React.useState('');

  const [mapCenter, setMapCenter] = useState({ lat: 38.72, lng: -9.14 }); // Initial center (Lisbon)
  const libraries = ['places']; // Include places library for location search
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://35.219.162.80/api/category');
        setCategories(response.data);

      } catch (error) {
        console.error('Failed to fetch categories', error);
        // Lide com erros conforme necessário
      }
    };

    fetchCategories();
  }, []);
 const onImageUpload = (event) => {
    setObjImage("https://www.totalprotex.pt/media/catalog/product/cache/default/image/500x500/9df78eab33525d08d6e5fb8d27136e95/s/t/steelite-taskforce-boot-s3-hro-0_3.jpg")
}
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {
      
        const response = await axios.post("http://35.219.162.80/api/lost-objects",
        {owner,
          title,
          category,
          description,
          location,
          price,
          status,
          objectImage,
          //FALTA OBJ_NAME OU TITLE & PHOTOS
        });
        
        // console.log(response.data)
      } catch (error) {
        console.error("Object Registration failed:", error);
         
         
        if (error.response && error.response.data) {
          setMessage(error.response.data.error); // Set the error message if present in the error response
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      } 
  };
  const categoriesArray = Object.entries(categories);
  const mapContainerStyle = {
    width: '50vw',
    height: '50vh',
      alignSelf: 'center',
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC6QRYQechnlxkaivlAkIyKhMcB3iGaSZM',
    libraries,
  });

    const handleMapClick = async (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setObjLoc({ lat: event.latLng.lat(), lng: event.latLng.lng() });

      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC6QRYQechnlxkaivlAkIyKhMcB3iGaSZM`);
        const address = response.data.results[0].formatted_address;
        console.log('Address:', address);
        setObjLoc(address);

        // Faça o que você precisa com o endereço, como definir o estado
        // ou exibir em algum lugar na sua aplicação
      } catch (error) {
        console.error('Failed to fetch address:', error);
        // Lide com erros conforme necessário
      }
    };

  if (loadError) return <div className="contain">Error loading maps</div>;
  if (!isLoaded) return <div className="contain">Loading maps</div>;
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return ( <>
    <Container>
      <Title>Found Object Identification</Title>
      <InputBox>
        <InputF 
        type={'text'} 
        placeholder={'Insert title of lost object'}  
        id="title"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        
        errorMessage={'invalid'}
        name="Title"/>

 
        </InputBox>
      <Title>What did you lose?</Title>
      <CategoryTitle>Choose the category of the found object.</CategoryTitle>
      <CategorySection>
      {categoriesArray.map(([key, value], index) => (
        <CategoryButton
          key={index}
          isSelected={category === value._id}
          onClick={() => handleCategoryClick(value._id)}
          active={activeButton === value._id}
        >
          {value.name}
        </CategoryButton>
      ))}
       
      </CategorySection>
      <Title>Write the price of the lost object.</Title>
      <InputBox>
        <InputF
         icon = {<EuroSymbolIcon/>}
        type={'number'} 
        placeholder={'Insert the price of lost object'}  
        id="price"
        required
        onChange={(e) => setObjPrice(parseInt(e.target.value))}
        value={price}        
        errorMessage={'invalid'}
        name="Price"/>

 
        </InputBox>
    </Container>
      <Container>
      <Title>How does it look?</Title>
      <CategoryTitle>Upload pictures of the lost object.
        If you don’t have any, just select the “I don’t have pictures” option.</CategoryTitle>
        <InputBox>

        <CustomInputFiles singleImage
        onChange={onImageUpload}></CustomInputFiles>
        </InputBox>
        <Title>How does it look?</Title>
              <CategoryTitle>Upload pictures of the lost object.
        If you don’t have any, just select the “I don’t have pictures” option.</CategoryTitle>
              
        <InputBox>
        <StyledTextArea 
        
         type={'text'} 
        placeholder={'Describe your object..'}  
        id="objDesc"
        required
        onChange={(e) => setObjDesc(e.target.value)}
        value={description}
        errorMessage={'invalid'}
        name="Description"
        height={80} />
       </InputBox> 
      </Container>
        <Container>
        <Title>Where did you lose it?</Title>
        <CategoryTitle>Insert the location. If you don’t know, please choose the “I have no clue” option.</CategoryTitle>
      <InputBox>
        <InputF 
        type={'text'} 
        placeholder={'Insert location'}  
        id="location"
        required
        onChange={(e) => setObjLoc(e.target.value)}
        value={location}
        
        errorMessage={'invalid'}
        name="Location"/>

 
        </InputBox>
        <InputBox>
        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={mapCenter}
        onClick={handleMapClick}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
      {/* Display selected location coordinates (optional) */}
      {location && (
        <p>
          Selected Location: {`lat: ${location.lat}, lng: ${location.lng}`}
        </p>
      )}
    
        </InputBox>
        </Container>
        <div className=' btnSubmitSection'>
       
            <ResetButton> Reset form</ResetButton>
          <InputSubmit onClick={handleSubmit} className="input-submit" value="Login" label="Login">Register Object </InputSubmit>
        </div>
       </>
  );
};

