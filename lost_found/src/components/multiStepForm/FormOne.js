import React, { useContext } from 'react';
import AppContext from './Context';
import './styles.css';

const FormOne = () => {
    const { userDetails } = useContext(AppContext);

    const next = () => {
         userDetails.setStep(userDetails.currentPage + 1)
    };

    return (
        <div className="contain">
            <p>Dados do Utilizador</p>
            <div className="toggle-container">
                <input 
                    type="checkbox" 
                    checked={userDetails.isUserRegistered} 
                    onChange={() => userDetails.setIsUserRegistered(!userDetails.isUserRegistered)} />
                
                <label>Utilizador já possui conta</label>
            </div>
            <form className="form">
                {!userDetails.isUserRegistered ? (
                    <>
                    <input className="formInput" type="text" placeholder="NIC" value={userDetails.nic || ''} onChange={e => userDetails.setNic(e.target.value)}/>
                    <input className="formInput" type="text" placeholder="NIF" value={userDetails.nif || ''} onChange={e => userDetails.setNif(e.target.value)}/>
                    <select className="formSelect" value={userDetails.gender || ''} onChange={e => userDetails.setGender(e.target.value)}>
                        <option value="">Selecione o Gênero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </select>
                    <input className="formInput" type="text" placeholder="Primeiro Nome" value={userDetails.firstName || ''} onChange={e => userDetails.setFirstName(e.target.value)} required/>
                    <input className="formInput" type="text" placeholder="Sobrenome" value={userDetails.lastName || ''} onChange={e => userDetails.setLastName(e.target.value)} required/>
                    <input className="formInput" type="email" placeholder="Email" value={userDetails.email || ''} onChange={e => userDetails.setEmail(e.target.value)} required/>
                    <input className="formInput" type="text" placeholder="Endereço" value={userDetails.address || ''} onChange={e => userDetails.setAddress(e.target.value)} required/>
                    <input className="formInput" type="text" placeholder="Telefone" value={userDetails.phone || ''} onChange={e => userDetails.setPhone(e.target.value)} required/>
                    <input className="formInput" type="date" placeholder="Data de Nascimento" value={userDetails.birth || ''} onChange={e => userDetails.setBirth(e.target.value)} required/>
                </>
                ) : (
                    <>
                        <input className="formInput" type="text" placeholder="NIC" value={userDetails.nic || ''} onChange={e => userDetails.setNic(e.target.value)}/>
                        <input className="formInput" type="email" placeholder="Email" value={userDetails.email || ''} onChange={e => userDetails.setEmail(e.target.value)} required/>
                    </>
                )}
                <button type="button" className="formSubmit" onClick={next}>Próximo</button>
            </form>
        </div>
    );
};

export default FormOne;
