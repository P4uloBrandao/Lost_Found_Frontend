import React, { useState } from 'react';
import './styles.css';
import AppContext from './Context';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import FormThree from './FormThree';
import FormFinish from './FormFinish';
import ProgressBar from './ProgressBar';

const StepForm = () => {
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
    const [nif, setNif] = useState('');
    const [gender,setGender] = useState('');
    const [isUserRegistered, setIsUserRegistered] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const userDetails = {
        currentPage: step,
        category,
        description,
        location,
        price,
        firstName,
        lastName,
        email,
        address,
        phone,
        birth,
        nic,
        nif,
        gender,
        isUserRegistered,
        errorMessage,
        setStep,
        setCategory,
        setDescription,
        setLocation,
        setPrice,
        setFirstName,
        setLastName,
        setEmail,
        setAddress,
        setPhone,
        setBirth,
        setNic,
        setNif,
        setGender,
        setIsUserRegistered,
        setErrorMessage,
    };
    
    return (
        <AppContext.Provider value={{ userDetails }}>
            <div className="main">
                <div className="body">
                    <div className="wrapper">
                        <ProgressBar />
                        {step === 1 && <FormOne />}
                        {step === 2 && <FormTwo />}
                        {step === 3 && <FormThree />}
                        {step === 4 && <FormFinish />}
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
};

export default StepForm;