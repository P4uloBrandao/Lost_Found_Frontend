import React, {useContext} from 'react';
import AppContext from './Context';
import axios from "axios";
import './styles.css';

const FormFinish = () => {

    const myContext = useContext(AppContext);
    const updateContext = myContext.userDetails;
    const token = localStorage.getItem("token");

    const name = updateContext.userName;


    const handleFinish = async () => {
        try {
            let userData = {};
    
            if (updateContext.isUserRegistered) {
                userData = {
                    nic: updateContext.nic,
                    email: updateContext.email,
                    isUserRegistered: updateContext.isUserRegistered
                };
            } else {
                userData = {
                    firstName: updateContext.firstName,
                    lastName: updateContext.lastName,
                    email: updateContext.email,
                    address: updateContext.address,
                    phone: updateContext.phone,
                    birth: updateContext.birth,
                    nic: updateContext.nic,
                    nif: updateContext.nif,
                    gender: updateContext.gender,
                    isUserRegistered: updateContext.isUserRegistered
                };
            }
    
            let foundObjectData = {
                category: updateContext.category,
                description: updateContext.description,
                location: `${updateContext.location.lat},${updateContext.location.lng}`,
                price: 0,
                token: token
            };
    
            let info = { userData: userData, foundObjectData: foundObjectData };
            console.log(info)
            const response = await axios.post('http://localhost:3000/api/police/found-objects-by-police/', info);
    
            console.log('Objeto encontrado registrado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao registrar objeto encontrado:', error);
        }
    };
    
    return (
        <div className="container">
            <p>Successfully Submitted</p>
            <p>Thanks for {name} your details</p>
            <img className="done" src="https://www.svgrepo.com/show/13650/success.svg" alt="successful" />
            <button className="doneSubmit" onClick={handleFinish}>Done</button>
        </div>
    );
}    

export default FormFinish;
