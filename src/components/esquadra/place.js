

import TextField from '@mui/material/TextField';
import InputF  from '../inputFieldComponent/InputField';
import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
const placesLibrary = ["places"];

function Place({placeholder, id, name, onChange}) {
  const [searchResult, setSearchResult] = useState("Result: none");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "KEY", //falta aqui a APIKEY para nao dar erro
    libraries: placesLibrary
  });

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      // console.log(place);
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    } else {
      alert("Please enter text");
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="textfield-like">
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
      
        <InputF 
            type={'text'} 
            placeholder={placeholder}  
            id={id}
            required
            name= {name}  
            onChange={onChange}
          />
      
      </Autocomplete>
      
    </div>
  );
  
}

export default Place;

