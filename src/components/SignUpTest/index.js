import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swiper from 'swiper';
import 'swiper/css';

import InputF  from '../inputFieldComponent/InputField';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import './style.css'
import styled, { keyframes, css} from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';
import LoginImage from '../../assets/background/loginImage.svg'; 
import GoogleButton from '../GoogleButtonComponent/index';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import CalendarIcon from '@mui/icons-material/CalendarMonthRounded';
import MailIcon from '@mui/icons-material/MailOutlineRounded';
import PhoneIcon from '@mui/icons-material/PhoneAndroidRounded';
import AddressIcon from '@mui/icons-material/HomeRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import {PasswordStrength} from '../controllers/index'
import {validateBirthDate, validateEmail, validatePasswordCorrespondence} from "../../utils/inputValidations";
import FileInput from "../ImageInputComponent/FileInput";
import CustomInputFiles from "../ImageInputComponent/FileInput";
// import {DropdownInput} from "../dropdownInputComponent";
import DropdownInput from "../dropdownInputComponent";

import {ArrowDropDownIcon} from "@mui/x-date-pickers";
import '../../assets/colors/colors.css'

const Card = styled.div `

  display: flex;
  flex-direction: column;
  
  border-radius: 10px;
  

`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  min-height: 100vh;
  
   img {
    position: absolute;
    z-index: 100;
    right: 0px;
    bottom: 0px;
    transform: scale(1);
}
  
`;

const LoginBox = styled.div`

  text-align: -webkit-center;
  position: relative;
  height:  100vh;
  width: 100%; 

  background-color: var(--white-color);
  
  backdrop-filter: blur(25px);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  padding: 7.5em 5em;
`;
const LoginHeader = styled.div`

  top: -3rem;
  position: relative;
  display:block;
`;

const LoginHeaderText = styled.span`

  color: var(--black-color);
  text-align: center;
  font-family: Roboto;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;



const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;


// const Label = styled.label`
//   position: absolute;
//   top: -28px;
//   left: 20px;
//   transition: 0.2s;
// `;

// const Icon = styled.i`
//   position: absolute;
//   top: 18px;
//   right: 25px;
//   font-size: 20px;
// `;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 14px;
  
  
`;
const RememberBox = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  label {
    font-size: 16px;
    color: #333;
    margin-left: 8px;
    cursor: pointer;
  }

  input {
    opacity: 0;
    visibility: hidden;
    position: absolute;

    &:checked + .check {
      background-color:  var( --primary-green-color);
    }
  }

   .check {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #ccc;
    border-radius: 9px;
    background-color: var(--white-color);
    cursor: pointer;
    transition: background-color 0.3s ease;
}
`;
const InputSubmit = styled.button`

width: 9.93306rem;
height: 3.25rem;
  background:var( --primary-green-color);
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.11);
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  text-align: center;
  font-family: Roboto;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 135.5%;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  color:var(--white-color);
  transition: 0.3s;

  &:hover {
    background: var(--white-color);
    border: solid 2px var(--primary-green-color);
    color:var(--primary-green-color);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.30), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }
`;
const Form = styled.form`
  display: grid;
  margin-bottom: 1rem;
`;
const Register = styled.div`
  text-align: center;
`;
const LoginBody = styled.div`
  position:relative;
  top:-2rem;
`;

const RegisterLink = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: var(--primary-green-color);
  cursor:pointer;
  margin-right: 11px;
  &:hover {
    text-decoration: underline;
`;

const HrDivison = styled.div`
display: flex;
align-items: center;
  color: #000000;
  margin: 20px 0;

  hr {
    flex: 1;
    border: none;
    height: 1.33pt;
    background-color: var(--primary-green-color);
    margin: 0 10px;
}

  p {
    margin: 0;
  }
 
`;
const MediaQueryWrapper = styled.div`
  @media only screen and (max-width: 564px) {
    padding: 20px;
  }
`;
const MediaQueryLoginBox = styled.div`
  @media only screen and (max-width: 564px) {
    padding: 7.5em 1.5em 4em 1.5em;
  }
`;


export default function SignUp() {
  const [profileImage, setProfileImage] = React.useState(null);
  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [adddress, setAdddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [checkPassword, setCheckPassword] = React.useState('');
  const [birth, setBirth] = React.useState('');
  const [nic, setNic] = React.useState('');
  const [nif, setNif] = React.useState('');
  const [message, setMessage] = useState("");
  const [phone, setPhone] = React.useState('');
  const [showPassword, setShowPassword] = useState(null); // New state for handling error messages
  const [showPassword2, setShowPassword2] = useState(null); // New state for handling error messages
  // Validations
  const [firstNameError, setFirstNameError ] = useState(null);
  const [lastNameError, setLastNameError ] = useState(null);
  const [emailError, setEmailError ] = useState(null);
  const [genderError, setGenderError ] = useState(null);
  const [adddressError, setAdddressError ] = useState(null);
  const [passwordError, setPasswordError ] = useState(null);
  const [checkPasswordError, setCheckPasswordError ] = useState(null);
  const [birthError, setBirthError ] = useState(null);
  const [nicError, setNicError ] = useState(null);
  const [nifError, setNifError ] = useState(null);
  const [phoneError, setPhoneError ] = useState(null);
  

  const genderOptions= [
      {
          
          name: "Male"
      },
      {
          name: "Female",
      },
      {
          name: "Other",
      }
  ]


  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => {
      const newShowPassword = !prevShowPassword;
      return newShowPassword;
    });
  };
  const toggleShowPassword2 = () => {
    setShowPassword2((prevShowPassword) => {
      const newShowPassword = !prevShowPassword;
      return newShowPassword;
    });
  };

  
  
  const [formStepsNum, setFormStepsNum] = useState(0);
  const formSteps = [
      { title: "1" },
      { title: "2" },
      { title: "3" },
      { title: "4" }
  ];

  const nextStep = () => {
      setFormStepsNum(prevStep => prevStep + 1);
      console.log(formStepsNum)
  };

  const prevStep = () => {
      setFormStepsNum(prevStep => prevStep - 1);
      console.log(formStepsNum)

  };




  const handleSubmit = async (event) => {


      event.preventDefault();


      //  Validations
      setFirstNameError(first_name.length === 0 )
      setLastNameError(last_name.length === 0)
      setEmailError(email.length === 0 && !validateEmail(email))
      setGenderError(gender.length === 0)
      setAdddressError(adddress.length === 0)
      setPasswordError(password.length === 0)
      setCheckPasswordError(checkPassword.length === 0 && !validatePasswordCorrespondence(password, checkPassword))
      setBirthError(!validateBirthDate(birth))
      setNicError(nic.length === 0)
      setNifError(nif.length === 0)
      setPhoneError(phone.length === 0)

      if (firstNameError || lastNameError || emailError || genderError || adddressError || passwordError || checkPasswordError || birthError || nicError || nifError || phoneError) {
          return;
      }
      if (profileImage === null){
        setProfileImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
      }
      const data1 = new FormData();
      data1.append('first_name', first_name);
      data1.append('last_name', last_name);
      data1.append('email', email);
      data1.append('adddress', adddress);
      data1.append('password', checkPassword);
      data1.append('birth', birth);
      data1.append('gender', gender);
      data1.append('nic', nic);
      data1.append('nif', nif);
      data1.append('phone', phone);
      data1.append('profileImage', profileImage);


      try {
          const response = await axios.post("http://localhost:3000/api/users/signup",
          data1);

        } catch (error) {
          console.error("Registration failed:", error);


          if (error.response && error.response.data) {
            setMessage(error.response.data.error); // Set the error message if present in the error response
          } else {
            setMessage("An unexpected error occurred. Please try again.");
          }
        }
  };

    return (
        <Wrapper>
           
                
        <LoginBox>
      <LoginHeader >
        <LoginHeaderText>Sign up</LoginHeaderText>
        
      </LoginHeader>
      <LoginBody>
        
      <GoogleButton formStepsNum={formStepsNum}
        placeholder={'Continue with Google'}  
        id="googleButtonLogin"
        
        // onClick={(e) => setLoginGoogle(e.target.value)}
        
        name="googleButtonLogin"/>
        <HrDivison ><hr /> <p> OR</p> <hr /></HrDivison>
            
        <Card className="card" >
        <Form  onSubmit={handleSubmit} >
        <div className="progress-bar">
                <div className="progress" style={{ width: `${(formStepsNum + 1) * 25}%` }}></div>
                {formSteps.map((step, index) => (
                    <div key={index} className={`progress-step ${index === formStepsNum ? 'active' : ''}`} ></div>
                ))}
            </div>

            {formSteps.map((step, index) => (
                <div key={index} className={`form-step ${index === formStepsNum ? 'active' : ''}`}>
                   
                    {/* Campos do formulário para cada etapa */}
                    {step.title === "1" && (
                        <>
                            <InputBox >
        <InputF 
        icon={<PersonOutlineRoundedIcon />} 
        type={'text'} 
        placeholder={'Enter your first name'}  
        id="first_name"
        required
        onChange={(e) => setFirstName(e.target.value)}
        name="First Name"
        value={first_name}
        errorMessage={'Nome inválido'}
        errorValidation={firstNameError}
        />
        </InputBox>
        <InputBox>
        <InputF 
        icon={<PersonOutlineRoundedIcon />} 
        type={'text'} 
        placeholder={'Enter your last name'}  
        id="last_name"
        required
        onChange={(e) => setLastName(e.target.value)}
        name="Last Name"
        value={last_name}

        errorMessage={'Último inválido'}
        errorValidation={lastNameError}
        />
        </InputBox>
        <InputBox>
        <InputF 
        icon={<MailIcon />} 
        type={'text'} 
        placeholder={'Enter your Email'}  
        id="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}

        errorMessage={'Email inválido'}
        errorValidation={emailError}
        name="Email"/>
        </InputBox>
                </>
            )}

            {step.title === "2" && (
                <>
                    <InputBox>
                <InputF
                    icon={showPassword ? <LockIconOpen /> : <LockIcon />}

                    placeholder={'Password'}
                    id="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    name="Password"
                    setShowPassword={toggleShowPassword}
                    errorMessage={'Senha inválida'}
                    errorValidation={passwordError}
                />
            </InputBox>
           <PasswordStrength text={password} />

           <InputBox>
        <InputF 
        icon={showPassword2 ? <LockIconOpen /> : <LockIcon />}
        
        placeholder={'Repeat your Password'}  
        id="CheckPassword"
        required
        onChange={(e) => setCheckPassword(e.target.value)}
        type={showPassword2 ? 'text' : 'password'}
        value={checkPassword}
        name="CheckPassword"
        setShowPassword={toggleShowPassword2}
        errorMessage={'Senhas não correspondem'}
        errorValidation={checkPasswordError}
        />
        </InputBox>
        
                </>
            )}

            {step.title === "3" && (
                <>
                <InputBox>
        <InputF 
        icon={<MailIcon />} 
        type={'date'} 
        placeholder={'Enter birthday'}  
        id="birthday"
        required
        onChange={(e) => setBirth(e.target.value)}
        value={birth}
        errorValidation={birthError}
        errorMessage={'Data inválida'}
        name="Birthday"/>

 
        </InputBox>
      
            <InputBox>
                <DropdownInput
                    icon={<ArrowDropDownIcon />}
                    placeholder={'Gender'}
                    id="gender"
                    required
                    onChange={(e) => setGender(e.target.value)}
                    onClick={(e) => setGender(e.target.value)}
                    value={gender}
                    errorValidation={adddressError}
                    errorMessage={'Gênero inválido'}
                    options={genderOptions}
                ></DropdownInput>
            </InputBox>
          <InputBox>
              <InputF 
              icon={<AddressIcon />} 
              type={'text'} 
              placeholder={'Enter your Address'}  
              id="address"
              required
              onChange={(e) => setAdddress(e.target.value)}
              value={adddress}
              errorValidation={adddressError}
              errorMessage={'Endereço inválido'}
              name="Address"/>
                
                
              
         </InputBox>
                </>
            )}

            {step.title === "4" && (
                <>
                <InputBox>
        <InputF 
        icon={<PhoneIcon />} 
        type={'number'} 
        placeholder={'Enter your phone number'}  
        id="phone"
        required
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        errorValidation={phoneError}
        errorMessage={'Telefone inválido'}
        name="Phone"/>
          
        </InputBox>
        <InputBox>
        <InputF 
        type={'number'} 
        placeholder={'Enter your NIF'}  
        id="nif"
        required
        onChange={(e) => setNif(e.target.value)}
        value={nif}
        errorValidation={nifError}
        errorMessage={'Nif inválido'}
        name="Nif"/>
          
          
        
        </InputBox>
        
        
        <InputBox>
        <InputF 
        type={'number'} 
        placeholder={'Enter your NIC'}  
        id="nic"
        required
        onChange={(e) => setNic(e.target.value)}
        value={nic}
        errorValidation={nicError}
        errorMessage={'Nic inválido'}
        name="Nic"/>
          
        
        </InputBox>
                </>
            )}

            {/* Botões de navegação */}
            {index !== 0 && (
                <button type="button" className="btn btn-prev" onClick={prevStep}>Previous</button>
            )}
            {index !== formSteps.length - 1 && (
                <button type="button" className="btn btn-next" onClick={nextStep}>Next</button>
            )}
            {index === formSteps.length - 1 && (
                <input type="submit" value="Complete" className="btn btn-complete"/>
            )}
        </div>
            ))}
      </Form>
      <Register>
          <span>
            I already have an account.
            <RegisterLink href="./login"> Login</RegisterLink>
          </span>
        </Register>
        </Card>
      
      </LoginBody>
    </LoginBox>
    </Wrapper>
             
            
    );
}