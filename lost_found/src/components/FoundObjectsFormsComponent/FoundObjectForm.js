import React, { useState } from 'react';
import axios from 'axios';
import * as Styled from './Styles'; // Importação dos estilos do arquivo styles.js
import InputF from '../inputFieldComponent/InputField';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
      const response = await axios.post('http://localhost:3000/api/foundObjects', {
        category,
        description,
        location,
        price,
        userWhoFound: isUserRegistered ? null : {
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
    <Styled.Wrapper>
      <Styled.FormBox>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <Styled.InputBox>
                <input
                  type="checkbox"
                  id="isUserRegistered"
                  checked={isUserRegistered}
                  onChange={(e) => setIsUserRegistered(e.target.checked)}
                />
                <label htmlFor="isUserRegistered">User Already Registered</label>
              </Styled.InputBox>
              {!isUserRegistered && (
                <>
                  <Styled.InputBox>
                    <InputF
                      placeholder="NIC"
                      id="nic"
                      required
                      onChange={(e) => setNic(e.target.value)}
                      value={nic}
                      name="nic"
                    />
                  </Styled.InputBox>
                  <Styled.InputBox>
                    <InputF
                      placeholder="First Name"
                      id="firstName"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      name="firstName"
                    />
                  </Styled.InputBox>
                  <Styled.InputBox>
                    <InputF
                      placeholder="Last Name"
                      id="lastName"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      name="lastName"
                    />
                  </Styled.InputBox>
                  <Styled.InputBox>
                    <InputF
                      placeholder="Email"
                      id="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      name="email"
                    />
                  </Styled.InputBox>
                  <Styled.InputBox>
                    <InputF
                      placeholder="Address"
                      id="address"
                      required
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      name="address"
                    />
                  </Styled.InputBox>
                  <Styled.InputBox>
                    <InputF
                      placeholder="Phone"
                      id="phone"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      name="phone"
                    />
                  </Styled.InputBox>
                  <Styled.InputBox>
                    <InputF
                      type="date"
                      placeholder="Birth"
                      id="birth"
                      required
                      onChange={(e) => setBirth(e.target.value)}
                      value={birth}
                      name="birth"
                    />
                  </Styled.InputBox>
                </>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <Styled.InputBox>
                <InputF
                  type="text"
                  placeholder="Category"
                  id="category"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  name="category"
                />
              </Styled.InputBox>
              <Styled.InputBox>
                <InputF
                  placeholder="Description"
                  id="description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  name="description"
                />
              </Styled.InputBox>
            </>
          )}
          {step === 3 && (
            <>
              {/* Adicione aqui a integração com o componente de localização */}
              <Styled.InputBox>
                <InputF
                  placeholder="Location"
                  id="location"
                  required
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  name="location"
                />
              </Styled.InputBox>

            </>
          )}
          {step > 1 && (
            <Styled.Button2 onClick={handlePreviousStep}><ArrowBackIcon/></Styled.Button2>
          )}
          {step ==2 && (
            <Styled.Button2 onClick={handlePreviousStep}><ArrowBackIcon/></Styled.Button2> &&
            <Styled.Button onClick={handleNextStep}><ArrowForwardIcon/></Styled.Button>
          )}
          {step < 3 ? (
            <Styled.Button onClick={handleNextStep}><ArrowForwardIcon/></Styled.Button>
          ) : (
            <Styled.InputSubmit type="submit" value="Submit" label="Submit">
              Submit
            </Styled.InputSubmit>
          )}
        </form>
      </Styled.FormBox>
    </Styled.Wrapper>
  );
};

export default FoundObjectForm;
