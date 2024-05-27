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
import { InputSubmit, Container,InputBox ,Title,Form, Wrapper,SubCategoryTitle,CategoryTitle , CategorySection } from '../../assets/StylePopularComponent/style';
import Loader from '../LoadingComponent/index';
import  SearchInput  from '../../components/SearchInputFieldComponent/index';
import { useAuth } from '../AuthContext';
import { create } from '@mui/material/styles/createTransitions';

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
    width: max-content;
    padding: 4px 9px;
    border-radius: 33px;
    border: 1px solid var(--primary-green-color);
    background-color: var(--white-color);
    color: var(--black-color);
    cursor: pointer;
    font-size: 1rem;
    opacity: 1;
    background-color: ${props => props.isSelected ? 'var(--primary-green-color)' : 'var(--white-color)'};
    color: ${props => props.isSelected ? 'var(--white-color)' : 'var(--black-color)'};
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
  const [userWhoFound, setUserWhoFound] = React.useState('');
  const [policeOfficerThatReceived, setPolice] = React.useState('');
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
  const [fullDataCategories, setFullDataCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  const [objectCategories, setObjectCategories] = useState({});
  //DATAS
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const nextMonthDate = (new Date(today.setMonth(today.getMonth() + 1))).toISOString().split('T')[0];

  const {  authUser } = useAuth();
  
//GET SUBCATEGORIES AND SUBSUBCATEGORIES
  const fetchSubCategories = async (data) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/category/subCat/${getCategoryNameFromId(data)}`);
      setFullDataCategories(response.data);
     console.log(response.data)
      setSubCategories(extractSubcategories (response.data));
      setLoading(false); // Definir o estado de carregamento como falso quando o fetch estiver concluído
    } catch (error) {
      console.error('Failed to fetch categories', error);
      // Lide com erros conforme necessário
    }
  }
  // Função para buscar subcategorias do json que vem da api
  function extractSubcategories(categories) {
    return categories.map(category => ({
        _id: category.subcategory._id,
        name: category.subcategory.name
    }));
  }
  //GET CATEGORIES
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
//CREATE FOUND OBJECT
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {
      
        const response = await axios.post("http://localhost:3000/api/found-objects",
        {"userWhoFound": userWhoFound,
          "title": title,
          "category": getCategoryNameFromId(category),
          "endDate": nextMonthDate,
          "foundDate": formattedDate,
          "description": description,
          "location":location,
          " price": price,
          "status": status,
          "objectImage": objectImage,
          "policeOfficerThatReceived":"6650cb6c82b8e44086723f1e",
          "subCategory": objectCategories
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
  //VALIDAÇÃO DO FOUNDER
  const handleUserValidation = async (event) => {
   event.preventDefault();
    try {
         const response = await axios.post("http://localhost:3000/api/users/getUser/",
        {email,
          nic,});
        console.log(response.data._id)
        setUserWhoFound(response.data._id)
        
      } catch (error) {
        console.error("User Validation failed:", error);
                
        if (error.response && error.response.data) {
          setMessage(error.response.data.error); // Set the error message if present in the error response
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      } 
  };
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

 
  const handleDropdownChangeCategory = (category) => {
    console.log(category)
    setSelectedCategory(category);
    setLoading(true);
    fetchSubCategories(category)

  };

  function createObjectSubCategories(subCategory){
    console.log(subCategory)
    console.log(fullDataCategories)
    const subCategories = fullDataCategories.find(category => category.subcategory._id === subCategory);
    console.log(subCategories) 
    console.log(getSubSubCategories(getCategoryNameFromId(category),subCategory) )

  }
  function getSubSubCategories(categoryName, subcategoryId) {
      console.log('subCategories:', fullDataCategories);
      for (const item of fullDataCategories) {
        console.log('item:', item);
       
        if (item.category.name === categoryName && item.subcategory._id === subcategoryId) {

          setSubSubCategories(Object.entries(item.subSubCategories));
          setLoading(false);
              return item.subSubCategories;
          }
      }
      setLoading(false);

      return [];
  }
  function getSubSubCategoryNameFromId(categoryName) {
    const flattenedSubSubCategories = subSubCategories.flat();
    const category = flattenedSubSubCategories.find(category => category._id === categoryName);
    return category ? category.name : null;
  }
  function getSubCategoryNameFromId(categoryName) {
    const category = subCategories.find(category => category._id === categoryName);
    return category ? category.name : null;
   }
  function handleSubSubCategoryClick(subSubCategory) {
    console.log(subSubCategory)
    const subSubCategoryObject = {
      "name": getSubCategoryNameFromId(subCategory),
      "subSubCategory": getSubSubCategoryNameFromId(subSubCategory),
    }
    // Determine the new key (next index)
    const newKey = Object.keys(objectCategories).length;

    // Update the state immutably
    setObjectCategories(prevState => ({
      ...prevState,
      [newKey]: subSubCategoryObject
    }));
    console.log(objectCategories)
  }
  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    createObjectSubCategories(subCategory)
      
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
  handleSubCategoryClick(selectedOptionName)
  // Faça o que for necessário com o nome da opção selecionada
}; 
function getCategoryNameFromId(categoryName) {
  const category = categories.find(category => category._id === categoryName);
  return category ? category.name : null;
 }
if (loadError) return <div className="contain">Error loading maps</div>;
if (!isLoaded) return <div className="contain"><Loader/></div>;
  
if (loading) {
  return <Loader/>; // Ou qualquer indicador de carregamento que você preferir
}
  const newLocal = <RadioBtn>
    <RadioButton
      options={options}
      onChange={(selectedValue) => test(selectedValue)}
      value="option1" />
  </RadioBtn>;
  return ( <>
  <Container>
  <Title>Finder’s Information</Title>
      <CategoryTitle>Does the finder have an BIDFIND.er account? 
      </CategoryTitle>
      {newLocal}
      {selectedValue !== "no" && (<>
      <InputBox style={{marginTop:'15px'}}>
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
              <SearchInput 
                
                placeholder={'Categories'}  
                id="category"
                required
                onClick = {(e) => handleDropdownChangeCategory(e.target.value)}
                value={category}
                onChange={handleDropdownChangeCategory}
                name="Categories"
                options={categories}
                
              />
            </InputBox>   
      
      </Grid>
      
      <Grid item xs={12} sm={4}>
        
  {category !== null && ( <>
        <SubCategoryTitle>Choose the subcategory of the found object.</SubCategoryTitle>
        <InputBox>
          <SearchInput 
            
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
       {subCategory !== null && ( <>
     <CategorySection>
      {subSubCategories.map(([key, value], index) => (
        <CategoryButton
          key={index}
          isSelected={category === value._id}
          onClick={() => handleSubSubCategoryClick(value._id)}
          active={activeButton === value._id}
        >
          {value.name}
        </CategoryButton>
      ))}
       
      </CategorySection> </>
      )}
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

