import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputF  from '../inputFieldComponent/InputField';
import axios from "axios";
import '../../assets/colors/colors.css'
import CustomInputFiles from "../ImageInputComponent/FileInput";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import RadioButton from '../RadioButtonComponent';
import ProfileCreationComponent from '../ProfileCreationComponent/index'
import DropdownInput from "../dropdownInputComponent/index";
import Grid from '@mui/material/Grid';
import { InputSubmit, Container,InputBox ,Title,Form, Wrapper,SubCategoryTitle,CategoryTitle , CategorySection } from '../../assets/StylePopularComponent/style';
import Loader from '../LoadingComponent/index';
import  SearchInput  from '../../components/SearchInputFieldComponent/index';
import { useAuth } from '../AuthContext';
import { create } from '@mui/material/styles/createTransitions';
import AddCategory from '../CategoriesComponents/AddCategoriesObjectComponent/index.jsx';
import  AddIcon  from '../../assets/icons/add50.png';
import PopupAlert from '../PopUpAlertComponent/index.jsx';
import './App.css';
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

const ErrorMessage= styled.p `
  color: #ad0000;
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  padding-right: 15px;
  margin-top: 5px;
  text-align: end;
  width: 100%;
  `

    

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
const AddBtn = styled.img`
transform: scale(0.7);

    transition: transform 0.2s;
    &:hover {
      transform: scale(0.9);
    }
`;
const AddCategoryContainer = styled.div`
 width: 100%;
`;
export default function AddFoundObject  ()  {
  const [objectImage, setObjImage] = React.useState([]);
  
  //VARIVEIS DE TESTE
  const [userWhoFound, setUserWhoFound] = React.useState(null);
  const [policeOfficerThatReceived, setPolice] = React.useState('');

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
  const [selectedValue,setSelectedValue ] = useState("yes");
  const [subCategories, setSubCategories] = React.useState('');
  const [subCategory, setSelectedSubCategory] = React.useState('');
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullDataCategories, setFullDataCategories] = useState([]);
const [policeId, setPoliceId] = useState('');

  const [objectCreated, setObjectCreated] = useState(false);
  const [objectCategories, setObjectCategories] = useState({});
  //DATAS
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const nextMonthDate = (new Date(today.setMonth(today.getMonth() + 1))).toISOString().split('T')[0];

  const [displayedCategories, setDisplayedCategories] = useState([]);
  const {  authUser } = useAuth();
  const [components, setComponents] = useState([]);
  const [user, setUser] = useState("");
  const [popupMessage, setPopupMessage] = useState('');
  const [objCord, setObjCord] = useState({ lat: null, lng: null });

  let counter = 0; // Mantido no escopo do componente pai

  const [formStepsNum, setFormStepsNum] = useState(0);
  const formSteps = [
      { title: "1" },
      { title: "2" },
      { title: "3" },
      { title: "4" },
      { title: "5" }
  ];

  // Validations
  const [titleError, setTitleError ] = useState(false);
  const [categoryError, setCategoryError ] = useState(false);
  const [priceError, setPriceError ] = useState(false);
  const [locationError, setLocationError ] = useState(false);
  const [descriptionError, setDescriptionError ] = useState(false);
  const [imageError, setImageError ] = useState(false);
  const validationSetter= [setTitleError, setCategoryError, setPriceError, setLocationError, setDescriptionError, setImageError];


  const validateForm = () => {
    let isValid = true;
    if (title === '') {
      setTitleError(true);
        isValid = false;
    }

    if (category === null) {
        setCategoryError(true);
        isValid = false;
    }

    if (price === 0) {
        setPriceError(true);
        isValid = false;
    }

    if (location === '') {
        setLocationError(true);
        isValid = false;
    }

    if (description === '') {
        setDescriptionError(true);
        isValid = false;
    }

    if (objectImage.length === 0) {
        setImageError(true);
        isValid = false;
    }

    return isValid;
  }



  const clearErrors = () => {
    for (let i = 0; i < validationSetter.length; i++) {
      validationSetter[i](false);
    }
  }

  const addComponent = () => {
    setComponents([...components, <AddCategory key={components.length} />]);
  };
  const removeCategory = (indexToRemove) => {
    setComponents(components.filter((_, index) => index !== indexToRemove));
  };
  useEffect(() => {
    const fetchCategories = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/category');
        setCategories(response.data);
        setDisplayedCategories(Object.entries(response.data))
        setLoading(false)
        console.error(response.data);
    } catch (error) {
        console.error('Failed to fetch categories', error);
        // Lide com erros conforme necessário
    }
    };
  if(displayedCategories.length === 0){
    fetchCategories();
      }
setLoading(false)
}, []);

 
 const onImageUpload = (event) => {
   let filesArray= []

   for (let i = 0; i < event.length; i++) {
     filesArray.push(event[i])
   }

   setObjImage(filesArray);
 }
//CREATE FOUND OBJECT
  const handleSubmit = async (event) => {
    const getPoliceUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/police/police-officers/users/${authUser._id}`);
        setPoliceId(response.data._id);
        console.log(response.data._id)
       
        setLoading(false); // Definir o estado de carregamento como falso quando o fetch estiver concluído
      } catch (error) {
        console.error('Failed to fetch categories', error);
        // Lide com erros conforme necessário
      }
    }
    getPoliceUser()
    event.preventDefault();
    try {

        clearErrors();

        if (location === '') {
            setLocationError(true);
            return;
        }

      const formData = new FormData();

      objectImage.forEach((image) => {
        formData.append("objectImage[]", image);
      });
      formData.append("userWhoFound", userWhoFound);
        formData.append("title", title);
        formData.append("category", getCategoryNameFromId(category));
        formData.append("endDate", nextMonthDate);
        formData.append("foundDate", formattedDate);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("price", price);
        formData.append("status", status);
        formData.append("policeOfficerThatReceived", policeId);
        formData.append("subCategory", JSON.stringify(items));
        formData.append("coordinates", `lat: ${objCord.lat}, lng: ${objCord.lng}`);
        const response = await axios.post("http://localhost:3000/api/found-objects",
        formData);
        setObjectCreated(true)
        
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
        setUserWhoFound(response.data._id)
        setUser("true")
      nextStep()
        setTimeout(() => {
          setUser("");
      }, 3000);
      
        
      } catch (error) {
        console.error("User Validation failed:", error);
        setUser("false")
        setTimeout(() => {
          setUser("");
      }, 3000);
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
      setObjCord({ lat, lng });
      const geocodingApiKey = "AIzaSyDPUTFHLcj71rpOYKfPwigaRF8uiOKDvWo"
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${geocodingApiKey}`);
        const address = response.data.results[0].formatted_address;
        setObjLoc(address);

        // Faça o que você precisa com o endereço, como definir o estado
        // ou exibir em algum lugar na sua aplicação
      } catch (error) {
        console.error('Failed to fetch address:', error);
        // Lide com erros conforme necessário
      }
    };

 
  const options = [
    { id: "yesOpt", value: "yes", text: "Yes", defaultSelection: true },
    { id: "noOpt", value: "no", text: "No", defaultSelection: false },
    
  ];
  
 function test(value){
  setSelectedValue(value)

 }

function getCategoryNameFromId(categoryName) {
  const category = categories.find(category => category.name === categoryName);
  return category ? category.name : null;
 }

const handleCategoryChange = (index, category) => {
  setSelectedCategory(category);
  };
 

  const [items, setItems] = useState({});
  
  const addItem = (item) => {
  

    setItems(prevItems => {
      const existingKey = Object.keys(prevItems).find(key => prevItems[key].name === item.name);

      if (existingKey !== undefined) {
        setPopupMessage(`Item with name "${item.name}" was already selected. This operation will replace it.`);
        setTimeout(() => {
          setPopupMessage('');
      }, 5000);
        return { ...prevItems, [existingKey]: item }; // Replace the existing item
      }

      const newIndex = Object.keys(prevItems).length;
      return { ...prevItems, [newIndex]: item };
    });
  };

  const validateStepTwo = () => {
    let isValid = true;
    if (!title) {
        setTitleError("Title is required");
        isValid = false;
    }

    if (!price) {
        setPriceError("Price is required");
        isValid = false;
    }
    return isValid;
  }

  const validateStepThree = () => {
        let isValid = true;

      if (category === null) {
          setCategoryError(true);
          isValid = false;
      }

      return isValid;
  }

  const validateStepFour = () => {
        let isValid = true;

      if (objectImage.length === 0) {
          setImageError(true);
          isValid = false;
      }

      if (description === '') {
          setDescriptionError(true);
          isValid = false;
      }

        return isValid;
  }
  const nextStep =  () => {

      if (formStepsNum === 1) {
        if (!validateStepTwo()) {
          return;
        }
      }

      if (formStepsNum === 2) {
            if (!validateStepThree()) {
                return;
            }
        }

        if (formStepsNum === 3) {
            if (!validateStepFour()) {
                return;
            }
        }
    setFormStepsNum(prevStep => prevStep + 1);
 };

const prevStep = () => {
    setFormStepsNum(prevStep => prevStep - 1);

};
useEffect(() => {
  console.log(items)
}, [items,user]);


if (loadError) return <div className="contain">Error loading maps</div>;
if (!isLoaded) return <div className="contain"><Loader/></div>;
  
if (objectCreated) return <PopupAlert message={"Object registered"} />

 
if (loading) {
  return <Loader/>; // Ou qualquer indicador de carregamento que você preferir
}
  const newLocal = <RadioBtn>
    <RadioButton
      options={options}
      onChange={(selectedValue) => test(selectedValue)}
      value="option1" />
  </RadioBtn>;

return (
  <>
    {popupMessage && <PopupAlert message={popupMessage} />}
    {user === "true" && <PopupAlert message="Valid User" />}
    {user === "false" && <PopupAlert message="Invalid User" />}
    
    <div className="progress-bar">
      <div className="progress" style={{ width: `${(formStepsNum + 1) * 20}%` }}></div>
      {formSteps.map((step, index) => (
        <div key={index} className={`progress-step ${index === formStepsNum ? 'active' : ''}`}></div>
      ))}
    </div>

    {formSteps.map((step, index) => (
      <div key={index} className={`form-step ${index === formStepsNum ? 'active' : ''}`}>
        {step.title === "1" && (
          <Container>
            <Title>Finder’s Information</Title>
            <CategoryTitle>Does the finder have an BIDFIND.er account?</CategoryTitle>
            {newLocal}
            {selectedValue !== "no" && (
              <>
                <InputBox style={{ marginTop: '15px' }}>
                  <InputF
                    type="number"
                    placeholder="Insert your NIC"
                    id="nic"
                    required
                    onChange={(e) => setNic(e.target.value)}
                    value={nic}
                    name="NIC"
                  />
                </InputBox>
                <InputBox>
                  <InputF
                    type="text"
                    placeholder="Insert your Email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="Email"
                  />
                </InputBox>
                <InputSubmit type="button" onClick={handleUserValidation}>
                  User validation
                </InputSubmit>
              </>
            )}
            {selectedValue !== "yes" && <ProfileCreationComponent setUserWhoFound={setUserWhoFound} />}
          </Container>
        )}
        {step.title === "2" && userWhoFound && (
          <Container>
            <Title>Found Object Identification</Title>
            <InputBox>
              <InputF
                type="text"
                placeholder="Insert title of lost object"
                id="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                errorValidation={titleError}
                errorMessage={'Title is required'}
                name="Title"
              />
            </InputBox>
            <Title>Write the price of the lost object.</Title>
            <InputBox>
              <InputF
                type="number"
                placeholder="Insert the price of lost object"
                id="price"
                required
                onChange={(e) => setObjPrice(parseInt(e.target.value))}
                value={price}
                errorValidation={priceError}
                errorMessage={'Price is required'}
                name="Price"
              />
            </InputBox>
          </Container>
        )}
        {step.title === "3" && (
          <Container>
            <Title>In what category does it fit in?</Title>
            <AddCategoryContainer>
              <AddCategory
                index={0}
                addItem={addItem}
                removeCategory={removeCategory}
                onCategoryChange={handleCategoryChange}
                existCategory={false}
                objectCategories={objectCategories}
                setObjectCategories={setObjectCategories}
              />
              {components.map((_, index) => (
                <AddCategory
                  key={index}
                  addItem={addItem}
                  index={index + 1}
                  mainCategory={category}
                  removeCategory={removeCategory}
                  onCategoryChange={handleCategoryChange}
                  existCategory={category ? true : false}
                  objectCategories={objectCategories}
                  setObjectCategories={setObjectCategories}
                />
              ))}
              {Object.keys(items).length > 0 && (
                <AddBtn src={AddIcon} className="addBtn" onClick={addComponent} alt="add category" />
              )}
              {categoryError && <ErrorMessage>Category is required</ErrorMessage>}
            </AddCategoryContainer>
          </Container>
        )}
        {step.title === "4" && (
          <Container>
            <Title>How does it look?</Title>
            <CategoryTitle>Upload pictures of the lost object. If you don’t have any, just select the “I don’t have pictures” option.</CategoryTitle>
            <InputBox>
              <CustomInputFiles singleImage max={10} onChange={onImageUpload}></CustomInputFiles>
            </InputBox>
            {imageError && <ErrorMessage>Image is required</ErrorMessage>}
            <Title>How does it look?</Title>
            <CategoryTitle>Upload pictures of the lost object. If you don’t have any, just select the “I don’t have pictures” option.</CategoryTitle>
            <InputBox>
              <StyledTextArea
                type="text"
                placeholder="Describe your object.."
                id="objDesc"
                required
                onChange={(e) => setObjDesc(e.target.value)}
                value={description}
                name="Description"
                height={80}
              />
            </InputBox>
            {descriptionError && <ErrorMessage>Description is required</ErrorMessage>}
          </Container>
        )}
        {step.title === "5" && (
          <Container>
            <Title>Where did you lose it?</Title>
            <CategoryTitle>Insert the location. If you don’t know, please choose the “I have no clue” option.</CategoryTitle>
            <InputBox>
              <InputF
                type="text"
                placeholder="Insert location"
                id="location"
                required
                onChange={(e) => setObjLoc(e.target.value)}
                value={location}
                errorValidation={locationError}
                errorMessage={'Location is required'}
                name="Location"
              />
            </InputBox>
            <InputBox>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={mapCenter}
                onClick={handleMapClick}
              >
                {location && <Marker position={mapCenter} />}
              </GoogleMap>
            </InputBox>
            <div className="btnSubmitSection">
      <InputSubmit onClick={handleSubmit} className="input-submit" value="Register Object">Register Object</InputSubmit>
    <ResetButton onClick={() => window.location.reload()}>Reset form</ResetButton>
    </div>
          </Container>
        )}
       {/* Botões de navegação */}
       {index !== 0 && (
                <button type="button" className="btn btn-prev" onClick={prevStep}>Previous</button>
            )}
            {index !== formSteps.length - 1  && userWhoFound &&  (
                <button type="button" className="btn btn-next" onClick={nextStep}>Next</button>
            )}
            
        </div>
    ))}

    
  </>
);
};

