import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputF  from '../inputFieldComponent/InputField';
import axios from "axios";
import '../../assets/colors/colors.css'
import CustomInputFiles from "../ImageInputComponent/FileInput";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import RadioButton from '../RadioButtonComponent';
import ProfileSettings from '../profileSettings/index'
import DropdownInput from "../dropdownInputComponent/index";
import Grid from '@mui/material/Grid';
import { InputSubmit, Container,InputBox ,Title,Form, Wrapper,SubCategoryTitle,CategoryTitle } from '../../assets/StylePopularComponent/style';

const StyledTextArea = styled.textarea`
    height: ${props => props.height}px;
    font-size: 16px;
    background: var(--white-color);
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


const RadioBtn = styled.span`
  position: relative;
  display:flex; 
`;



const CategoryButton = styled.button`
  width: 174px;
  height: 66px;
  padding: 16px 24px;
  border-radius: 33px;
  border: 1px solid var(--primary-green-color);
  background-color: ${props => props.isSelected ? 'var(--primary-green-color)' : 'var(--white-color)'};
  color: ${props => props.isSelected ? 'var(--white-color)' : 'var(--black-color)'};
  cursor: pointer;
  &:hover {
    background-color: var(--primary-green-color);
    color: var(--white-color);
  }
  font-size: 1rem;
  opacity: 1;
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
export default function AddFoundObject  ()  {
  const [objectImage, setObjImage] = React.useState("");
  
  //VARIVEIS DE TESTE
  const [userWhoFound, setUserWhoFound] = React.useState(null);
  const [policeOfficerThatReceived, setPolice] = React.useState('65fb1e5829c52b172fe02f44');
  const [endDate, setEndDate]= React.useState('01/01/2001');
  //VARIVEIS DE TESTE
  const [title, setTitle] = React.useState('');  //FALTA BD
  const [category, setSelectedCategory] = React.useState(null);
  const [location, setObjLoc] = React.useState('');
  const [description, setObjDesc] = React.useState('');
  const [price, setObjPrice] = React.useState(0);
  // const [objectImage, setObjPhotos] = React.useState([]); //FALTA BD
  const status = "Found"
  const [message, setMessage] = useState("");
  const [categories, setCategories] = React.useState('');
  const [email, setEmail] = React.useState('');  //FALTA BD
  const [nic, setNic] = React.useState('');  //FALTA BD

  const [mapCenter, setMapCenter] = useState({ lat: 38.72, lng: -9.14 }); // Initial center (Lisbon)
  const libraries = ['places']; // Include places library for location search
  const [activeButton, setActiveButton] = useState(null);
  const [selectedValue,setSelectedValue ] = useState("no");
  const [subCategories, setSubCategories] = React.useState('');
  const [subCategory, setSelectedSubCategory] = React.useState('');
  const [loading, setLoading] = useState(true);

  function fetchSubCategories() {
        try {
       
          const response =  axios.get(`http://localhost:3000/api/category/subCat/${category}`);
          setSubCategories(response.data);
          console.error(response.data);
          setLoading(false)
        } catch (error) {
          console.error('Failed to fetch categories', error);
          // Lide com erros conforme necessário
        }
        
      };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/category');
        setCategories(response.data);
        setLoading(false)

        console.error(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
        // Lide com erros conforme necessário
      }
    };
    
     fetchCategories();
    setLoading(false)
  }, []);

 
 const onImageUpload = (event) => {
    setObjImage("https://www.totalprotex.pt/media/catalog/product/cache/default/image/500x500/9df78eab33525d08d6e5fb8d27136e95/s/t/steelite-taskforce-boot-s3-hro-0_3.jpg")
}
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {
      
        const response = await axios.post("http://localhost:3000/api/found-objects",
        {userWhoFound,
          title,
          category,
          endDate,
          description,
          location,
          price,
          status,
          objectImage,
          policeOfficerThatReceived,
          //FALTA OBJ_NAME OU TITLE & PHOTOS
        });
        
        
      } catch (error) {
        console.error("Object Registration failed:", error);
         
         
        if (error.response && error.response.data) {
          setMessage(error.response.data.error); // Set the error message if present in the error response
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      } 
  };
  
  const handleUserValidation = async (event) => {
   event.preventDefault();
    try {
         const response = await axios.post("http://localhost:3000/api/users/getUser/",
        {email,
          nic,});
        setUserWhoFound(response._id)
        
      } catch (error) {
        console.error("User Validation failed:", error);
                
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
    googleMapsApiKey: 'AIzaSyDPUTFHLcj71rpOYKfPwigaRF8uiOKDvWo',
    libraries,
  });

    const handleMapClick = async (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setObjLoc({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      const geocodingApiKey = "AIzaSyDPUTFHLcj71rpOYKfPwigaRF8uiOKDvWo"
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${geocodingApiKey}`);
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
    fetchSubCategories(category)
  };
  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };
  const options = [
    { id: "yesOpt", value: "yes", text: "Yes", defaultSelection: true },
    { id: "noOpt", value: "no", text: "No", defaultSelection: false },
    
  ];
  
 function test(value){
  setSelectedValue(value)
  console.log(selectedValue)

 }
 const handleDropdownChange = (selectedOptionName) => {
  setSelectedCategory(selectedOptionName)
  // Faça o que for necessário com o nome da opção selecionada
};
const handleDropdownChangeSubCategory = (selectedOptionName) => {
  setSelectedSubCategory(selectedOptionName)
  // Faça o que for necessário com o nome da opção selecionada
};
if (loading) {
  return <div>Carregando...</div>; // Ou qualquer indicador de carregamento que você preferir
}
  return ( <>
  <Container>
  <Title>Finder’s Information</Title>
      <CategoryTitle>Does the finder have an <span>BIDFIND.er</span> account? 
      <RadioBtn >
       <RadioButton
  options={options}
  onChange={(selectedValue) => test(selectedValue)}
  value="option1"
/>
        </RadioBtn>
      </CategoryTitle>
      {selectedValue !== "no" && (<>
      <InputBox>
        <InputF 
        type={'number'} 
        placeholder={'Insert your NIC'}  
        id="nic"
        required
        onChange={(e) => setNic(e.target.value)}
        value={nic}
        
        errorMessage={'invalid'}
        name="NIC"/>

 
        </InputBox>
        <InputBox>
        <InputF 
        type={'text'} 
        placeholder={'Insert your Email'}  
        id="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        
        errorMessage={'invalid'}
        name="Email"/>

 
        </InputBox>
        <InputSubmit type="submit" onClick={handleUserValidation}>
            User validation
          </InputSubmit></>
        )}
      {selectedValue !== "yes" && (<>
      <ProfileSettings /></>)}
  </Container>
  
  {userWhoFound !== null && (
        
        <>
       
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
         <Grid container spacing={2}>
       <Grid item xs={12} sm={12}> 
      <Title>In what category does it fit in?</Title>
      </Grid>
      <Grid item xs={12} sm={4}> 
      <SubCategoryTitle>Choose the category of the found object.</SubCategoryTitle>
      
     
       <InputBox>
              <DropdownInput 
                
                placeholder={'Categories'}  
                id="category"
                required
                onClick = {(e) => handleCategoryClick(e.target.value)}
                value={category}
                onChange={handleDropdownChange}
                name="Categories"
                options={categories}
                
              />
            </InputBox>   
      
      </Grid>
      
      <Grid item xs={12} sm={4}>
        
  {category !== null && ( <>
        <SubCategoryTitle>Choose the subcategory of the found object.</SubCategoryTitle>
        <InputBox>
          <DropdownInput 
            
            placeholder={'Subcategories'}  
            id="subcategory"
            required
            onClick = {(e) => handleSubCategoryClick(e.target.value)}
            value={subCategory}
            onChange={handleDropdownChangeSubCategory}
            name="Sub categories"
            options={subCategories}
            
          />
        </InputBox> </>
  )}
      </Grid>
      <Grid item xs={12} sm={4}> 
      {/* {subCategory !== null && ( <>
      <SubCategoryTitle>Write something to describe.</SubCategoryTitle>
      
      
       <InputBox>
              <InputF
                
                placeholder={'Categories'}  
                id="category"
                required
                onClick = {(e) => handleCategoryClick(e.target.value)}
                value={category}
                onChange={handleDropdownChange}
                name="Categories"
               
                
              />
            </InputBox> </>
      )} */}
      </Grid> 
      </Grid>
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
      
    
        </InputBox>
        </Container>
        <div className=' btnSubmitSection'>
       
            <ResetButton> Reset form</ResetButton>
          <InputSubmit onClick={handleSubmit} className="input-submit" value="Login" label="Login">Register Object </InputSubmit>
        </div>
       
       </>
       
      )}
       </>
  );
};

