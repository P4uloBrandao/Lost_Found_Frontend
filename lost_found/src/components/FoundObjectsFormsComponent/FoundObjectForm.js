import React, { useState } from 'react';
import axios from 'axios';
import * as Styled from './Styles'; // Importação dos estilos do arquivo styles.js
import InputF from '../inputFieldComponent/InputField';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StepForm from '../multiStepForm/StepForm';

const FoundObjectForm = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [nic, setNic] = useState('');
  const [isUserRegistered, setIsUserRegistered] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let url = 'http://localhost:3000/api/foundObjects'; // URL padrão

      if (!isUserRegistered) {
        // Se o usuário não estiver registrado, mude a URL
        url = 'http://localhost:3000/api/otherFoundObjects'; // URL alternativa
      }

      const response = await axios.post(url, {
        category,
        description,
        location,
        price,
        userWhoFound: isUserRegistered ? nic : {
          firstName,
          lastName,
          email,
          address,
          phone,
          birth,
          nic
        }
      });
      console.log('Found object registered:', response.data);
      navigate('/success');
    } catch (error) {
      console.error('Error registering found object:', error);
      setErrorMessage('Error registering found object. Please try again.');
    }
  };

  return (
    <StepForm/>
  );
};

export default FoundObjectForm;
