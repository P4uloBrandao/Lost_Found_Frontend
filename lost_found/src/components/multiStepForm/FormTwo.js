import React, {useContext} from 'react';
import AppContext from './Context';
import './styles.css'

const FormTwo = () => {
    const { userDetails } = useContext(AppContext);

    const next = () => {
         userDetails.setStep(userDetails.currentPage + 1)
    };
    const back = () => {
        userDetails.setStep(userDetails.currentPage - 1)
   };
    return (
        <div className="container">
            <p>Dados do Objeto Encontrado </p>

            <div className="formContain">
                <form className="form">
                    <select className="formInput" onChange={e => userDetails.setCategory(e.target.value)} required>
                        <option value="">Selecione a categoria</option>
                        <option value="Eletrônico">Eletrônico</option>
                        <option value="Roupa">Roupa</option>
                        <option value="Acessório">Acessório</option>
                        <option value="Outros">Outros</option>
                    </select>
                    <textarea className="formInput" placeholder="Descrição do objeto perdido" onChange={e => userDetails.setDescription(e.target.value)} required />
                    <button className="formSubmit" type="button" onClick={back}>Anterior</button>
                    <button className="formSubmit" type="button" onClick={next}>Proximo</button>
                </form>
            </div>
        </div>
    );
};

export default FormTwo;