import * as React from 'react';
import  { useState } from "react";
import axios from "axios";
import Place from '../esquadra/place';
import InputF  from '../inputFieldComponent/InputField';
import Input  from '../ImageInputComponent/FileInput';

import styled, { keyframes, css} from 'styled-components';

//NAO TESTADO!!

function ObjFound() {
  const colors = css`
  --primary-color: #c6c3c3;
  --second-color: #ffffff;
  --black-color: #000000;
`;
const Container = styled.div`
  padding: 50px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  background-image : url("../../assets/background/bg-photo.jpg");
`;

const  Wrapper = styled.div`
${colors};
  position: relative;
  max-width: 450px;
  width: 65%;
    backdrop-filter: blur(25px);
  border: 2px solid var(--primary-color);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 7.5em 3em 3em 2.5em;
  color: var(--second-color);
`;
  // PARA TESTE
  // FALTA FUNCAO BACK QUE DE TODAS AS CATEGORIAS NA BD
  const dadosDeTesteCategorias = [
    { valor: 'valor1', nome: 'Opção 1' },
    { valor: 'valor2', nome: 'Opção 2' },
    { valor: 'valor3', nome: 'Opção 3' },
  ];


  const [owner, setOwner] = React.useState('');
  const [obj_name, setObjName] = React.useState('');  //FALTA BD
  const [category, setObjCat] = React.useState('');
  const [location, setObjLoc] = React.useState('');
  const [description, setObjDesc] = React.useState('');
  const [price, setObjPrice] = React.useState('');
  const [obj_photos, setObjPhotos] = React.useState([]); //FALTA BD
  const [status, setStatus] = React.useState('');
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    
    try {
        const response = await axios.post("http://localhost:3000/api/objects/lost-objects",
        {owner,
          category,
          description,
          location,
          price,
          status
          //FALTA OBJ_NAME OU TITLE & PHOTOS
        });
        
        console.log(response.data)
      } catch (error) {
        console.error("Object Registration failed:", error);
         
         
        if (error.response && error.response.data) {
          setMessage(error.response.data.error); // Set the error message if present in the error response
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      } 
  };


  return (
    <Container>
      <Wrapper>
    <form>
      <div>
          <InputF 
            type={'text'} 
            placeholder={'Enter object name / title'}  
            id="obj_name"
            required
            onChange={(e) => setObjName(e.target.value)}
            name="Object"
            value={obj_name}
            />
      </div>
      <Place
        placeholder={'Lost/Found Location'}  
        id="location"
        name="Lost/Found Location"
        onChange={(e) => setObjLoc(e.target.value)}
      />
      <div>
          <InputF 
            height="350px"
            type={'text'} 
            placeholder={'Enter object description'}  
            id="description"
            required
            onChange={(e) => setObjDesc(e.target.value)}
            name="Description"
            value={description}
            />
      </div>
      <div>
          <InputF 
            type={'text'} 
            placeholder={'Estimated monetary value'}  
            id="price"
            required
            onChange={(e) => setObjPrice(e.target.value)}
            name="Monetary Value"
            value={price}
            />
      </div>
      <div>
          <Input 
           onChange={(e) => setObjPhotos(e.target.value)}
           id = "obj_photos"
           //value={obj_photos}
           //TESTAR SE PASSA O PATH DAS FOTOS
           //FALTA VER SE CLOUDINARY PEDE ALGO AQUI
          />
      </div>
      <select value={category} onChange={(e) => {setObjCat(e.target.value)}}>
        {dadosDeTesteCategorias.map((item, index) => (
          <option key={index} value={item.valor}>{item.nome}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
    </Wrapper>
    </Container>
  );
};

export default ObjFound;

