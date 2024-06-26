import React, { useState, useEffect } from 'react';
import InputF from '../inputFieldComponent/InputField';
import styled from 'styled-components';
import "../../assets/colors/colors.css"
import { InputSubmit, Container, InputBox, Title, CategoryTitle } from '../../assets/StylePopularComponent/style';
import MailIcon from '@mui/icons-material/MailOutlineRounded';
import axios from "axios";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 70pt;
  align-self: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50pt; /* Ajuste o gap conforme necessário */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 30pt; /* Ajuste o gap conforme necessário */
  }
`;
  // Estilo CSS inline para a tabela e suas células
  const tableStyle = {
    border: '1px solid var(--primary-green-color)',
    borderRadius: '20px',
    width: '100%',
    textAlign: 'left',
    borderCollapse: 'collapse',
    marginTop: '20px'
};

const thStyle = {
    backgroundColor: '#3cb6848f',
    padding: '12px',
    borderBottom: '1px solid var(--primary-green-color)'
};

const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd'
};

export default function FoundObjComponent() {
   const[foundObjects, setFoundObjects] = useState([]);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchFoundObjects = async () => {
          try {
            // Buscar os dados dos objetos encontrados
            const objectsResponse = await axios.get(process.env.REACT_APP_API_URL+'/api/found-objects');
            let objectsData = objectsResponse.data;
      
            // Atualizar o estado dos objetos com os dados buscados
            setFoundObjects(objectsData);
      
            
      
            setLoading(false);
          } catch (error) {
            console.error('Failed to fetch found objects data:', error);
            // Lidar com erros conforme necessário
          }
        };
      
        fetchFoundObjects();
      }, []); // Dependências vazias para executar apenas uma vez ao montar o componente
      

    return (
     <>
             <Container>
    <Title style={{ alignSelf: 'center' }}>List of Found Objects</Title>
    <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Title</th>
                        <th style={thStyle}>Description</th>
                        <th style={thStyle}>Location</th>
                        <th style={thStyle}>Price</th>
                        <th style={thStyle}>Lost Date</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {foundObjects.map(item => (
                        <tr key={item.object_id}>
                            <td style={tdStyle}>{item.object_id}</td>
                            <td style={tdStyle}>{item.title}</td>
                            <td style={tdStyle}>{item.description}</td>
                            <td style={tdStyle}>{item.location}</td>
                            <td style={tdStyle}>{item.price}</td>
                            <td style={tdStyle}>{item.lostDate}</td>
                            <td style={tdStyle}>{item.status}</td>
                            <td style={tdStyle}>{item.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

    </Container>
      </>
    );
}
