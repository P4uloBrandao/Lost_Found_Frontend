import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputF  from '../inputFieldComponent/InputField';
import axios from "axios";
import '../../assets/colors/colors.css'
import CustomInputFiles from "../ImageInputComponent/FileInput";
import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import { InputSubmit, Container,InputBox ,Title,Form,CategoryTitle,CategorySection, Wrapper } from '../../assets/StylePopularComponent/style';
import AddCategory from '../CategoriesComponents/AddCategoriesObjectComponent/index.jsx';
import  AddIcon  from '../../assets/icons/add50.png';
import PopupAlert from '../PopUpAlertComponent/index.jsx';
import Grid from '@mui/material/Grid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const AddCategoryContainer = styled.div`
 width: 100%;
`;
export default function LostObjectForm  ( isFoundObjectPage= false)  {
  const [objectImage, setObjImage] = React.useState([]);

  const [owner, setOwner] = React.useState(localStorage.getItem("token"));
  const [title, setTitle] = React.useState('');  //FALTA BD
  const [category, setSelectedCategory] = React.useState('');
  const [location, setObjLoc] = React.useState('');
  const [objCord, setObjCord] = useState({ lat: null, lng: null });

  const [description, setObjDesc] = React.useState('');
  const [price, setObjPrice] = React.useState(0);
  // const [objectImage, setObjPhotos] = React.useState([]); //FALTA BD
  const status = "Lost"
  const [message, setMessage] = useState("");
  const [categories, setCategories] = React.useState('');

  const [mapCenter, setMapCenter] = useState({ lat: 38.72, lng: -9.14 }); // Initial center (Lisbon)
  const libraries = ['places']; // Include places library for location search
  const [activeButton, setActiveButton] = useState(null);

  const [items, setItems] = useState({});
  const [objectCreated, setObjectCreated] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [components, setComponents] = useState([]);
  const [objectCategories, setObjectCategories] = useState({});
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const [lostDate, setLostDate] = useState('');


  // Validations
  const [titleError, setTitleError ] = useState(false);
  const [categoryError, setCategoryError ] = useState(false);
  const [priceError, setPriceError ] = useState(false);
  const [locationError, setLocationError ] = useState(false);
  const [descriptionError, setDescriptionError ] = useState(false);
  const [imageError, setImageError ] = useState(false);
  const [lostdateError, setLostDateError ] = useState(false);
  const validationSetter= [setTitleError, setCategoryError, setPriceError, setLocationError, setDescriptionError, setImageError];
  const [formStepsNum, setFormStepsNum] = useState(0);
  const formSteps = [
      { title: "1" },
      { title: "2" },
      { title: "3" }
  ];
  const clearErrors = () => {
    for (let i = 0; i < validationSetter.length; i++) {
      validationSetter[i](false);
    }
  }
  const nextStep =  () => {
    clearErrors();
    if (formStepsNum === 0) {
        if (!validateStepOne()) {
            return;
        }
    }
    if (formStepsNum === 1) {
        if (!validateStepTwo()) {
            return;
        }
    }
    setFormStepsNum(prevStep => prevStep + 1);
 };

const prevStep = () => {
    setFormStepsNum(prevStep => prevStep - 1);

};

const validateStepOne= () => {
  let isValid = true;
  if (title === '') {
    setTitleError(true);
    isValid = false;
  }

  if (category === '') {
    setCategoryError(true);
    isValid = false;
  }
  if (price === 0) {
    setPriceError(true);
    isValid = false;
  }
  if (lostDate === '' || lostDate > new Date().toISOString().split('T')[0]) {
    setLostDateError(true);
    isValid = false;
  }

    return isValid;
}

const validateStepTwo = () => {
  let isValid = true;

  if (isFoundObjectPage.isFoundObjectPage && isFoundObjectPage!=={} && objectImage.length === 0) {
    setImageError(true);
    isValid = false;
  }

  if (description === '') {
    setDescriptionError(true);
    isValid = false;
  }
  return isValid;
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
        const response = await axios.get(process.env.REACT_APP_API_URL+'/api/category');
        setCategories(response.data);

      } catch (error) {
        console.error('Failed to fetch categories', error);
        // Lide com erros conforme necessário
      }
    };

    fetchCategories();
  }, []);
  function getCategoryNameFromId(id) {
    const category = categories.find(category => category.name === id);
    return category ? category.name : null;
   }
   useEffect(() => {
    console.log(items)
  }, [items,category]);

 const onImageUpload = (event) => {
    let filesArray= []

   for (let i = 0; i < event.length; i++) {
        filesArray.push(event[i])
   }

    setObjImage(filesArray);
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      clearErrors();

      if (location === '') {
        setLocationError(true);
        return;
      }
        const formData = new FormData();
        formData.append("owner", owner);
        formData.append("title", title);
        formData.append("subCategory", JSON.stringify(items));
        formData.append("category", getCategoryNameFromId(category));
        formData.append("description", description);
        formData.append("location", location);
        formData.append("price", price);
        formData.append("status", status);
        formData.append("lostDate", formattedDate);
        formData.append("registeredDate", formattedDate);
        formData.append("coordinates", `lat: ${objCord.lat}, lng: ${objCord.lng}`);       
         objectImage.forEach((image) => {
            formData.append("objectImage[]", image);
        });

        const response = await axios.post(process.env.REACT_APP_API_URL+"/api/lost-objects",
          formData,);
        if (response.status===201) {
          toast.success("Object registered successfully", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Object Registration failed:", error);
         
         toast.error("Object registration failed", {
            position: "top-center",
            autoClose: 3000,
            });

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
  const [circle, setCircle] = useState(null);
  const geocodingApiKey = "AIzaSyDPUTFHLcj71rpOYKfPwigaRF8uiOKDvWo"

    const handleMapClick = async (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setObjLoc({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      setObjCord({ lat, lng });

      setCircle({
        center:  { lat:lat, lng :lng},
        radius: 500 // Define o raio do círculo em metros
      });
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

    const addItem = (item) => {
      console.log(item)
  

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

  const handleCategoryChange = (index, category) => {
    setSelectedCategory(category);
    };
  
  if (loadError) return <div className="contain">Error loading maps</div>;
  if (!isLoaded) return <div className="contain">Loading maps</div>;
  if (objectCreated) return <PopupAlert message={"Object registered"} />

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>

      <ToastContainer />
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(formStepsNum + 1) * 33}%` }}></div>
        {formSteps.map((step, index) => (
          <div key={index} className={`progress-step ${index === formStepsNum ? 'active' : ''}`}></div>
        ))}
      </div>
      {formSteps.map((step, index) => (
        <div key={index} className={`form-step ${index === formStepsNum ? 'active' : ''}`}>
          {step.title === "1" && (
            <Container>
              <Title>Lost Object Identification</Title>
              <Title>What did you lose?</Title>
              <InputBox>
                <InputF
                  type={'text'}
                  placeholder={'Insert title of lost object'}
                  id="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  errorValidation={titleError}
                  errorMessage={'Title is required'}
                  name="Title"
                />
              </InputBox>
              <Grid item xs={12} sm={12}>
                <Title>In what category does it fit in?</Title>
              </Grid>
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
                    key={index + 1}
                    addItem={addItem}
                    index={index + 1}
                    mainCategory={category}
                    removeCategory={removeCategory}
                    onCategoryChange={handleCategoryChange}
                    existCategory={!!category}
                    objectCategories={objectCategories}
                    setObjectCategories={setObjectCategories}
                  />
                ))}
                {Object.keys(items).length > 0 && (
                  <AddBtn src={AddIcon} className='addBtn' onClick={addComponent} alt="add category" />
                )}
                {categoryError && <ErrorMessage>Category is required</ErrorMessage>}
              </AddCategoryContainer>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Title>Write the price of the lost object.</Title>
                  <InputBox>
                    <InputF
                      icon={<EuroSymbolIcon />}
                      type={'number'}
                      placeholder={'Insert the price of lost object'}
                      id="price"
                      required
                      onChange={(e) => setObjPrice(parseInt(e.target.value))}
                      value={price}
                      errorMessage={'Price is required'}
                      errorValidation={priceError}
                      name="Price"
                    />
                  </InputBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Title>Write the lost date.</Title>
                  <InputBox>
                    <InputF
                      type={'date'}
                      placeholder={'Enter lost date'}
                      id="lostDate"
                      required
                      onChange={(e) => setLostDate(e.target.value)}
                      value={lostDate}
                        errorValidation={lostdateError}
                      errorMessage={'Data inválida'}
                      name="Lost Date"
                    />
                  </InputBox>
                </Grid>
              </Grid>
            </Container>
          )}
          {step.title === "2" && (
            <Container>
              <Title>How does it look?</Title>
              <CategoryTitle>Upload pictures of the lost object. If you don’t have any, just select the “I don’t have pictures” option.</CategoryTitle>
              <InputBox>
                <CustomInputFiles singleImage max={10} onChange={onImageUpload} />
              </InputBox>
              {imageError && <ErrorMessage>Image is required</ErrorMessage>}
              <Title>Can you describe it?</Title>
              <CategoryTitle>Please write a description of your lost object.</CategoryTitle>
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
                  height={80}
                />
              </InputBox>
              {descriptionError && <ErrorMessage>Description is required</ErrorMessage>}
            </Container>
          )}
          {step.title === "3" && (
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
                  errorMessage={'Location is required'}
                  errorValidation={locationError}
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
                  {location && <Marker position={location} />}
                  {circle && <Circle center={circle.center} radius={circle.radius} options={{ fillColor: 'rgba(255,0,0,0.2)', strokeColor: 'rgba(255,0,0,1)' }} />}
                </GoogleMap>
              </InputBox>
              <div className='btnSubmitSection'>
              <InputSubmit onClick={handleSubmit} className="input-submit" value="Register Object">Register Object</InputSubmit>
              <ResetButton onClick={() => window.location.reload()}>Reset form</ResetButton>

              </div>
            </Container>
          )}
          {/* Navigation buttons */}
          {index !== 0 && (
            <button type="button" className="btn btn-prev" onClick={prevStep}>Previous</button>
          )}
          {index !== formSteps.length - 1  && (
            <button type="button" className="btn btn-next" onClick={nextStep}>Next</button>
          )}
        </div>
      ))}
    </>
  );
};
