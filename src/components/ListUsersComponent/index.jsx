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
    textAlign: 'center',
    borderCollapse: 'collapse',
    
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

export default function ListUsersComponent() {
   const[users, setUsers] = useState([]);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            // Buscar os dados dos objetos encontrados
            const objectsResponse = await axios.get('http://localhost:3000/api/users/list/');
            let objectsData = objectsResponse.data;
      
            // Atualizar o estado dos objetos com os dados buscados
            setUsers(objectsData);
      
            
      
            setLoading(false);
          } catch (error) {
            console.error('Failed to fetch found objects data:', error);
            // Lidar com erros conforme necessário
          }
        };
      
        fetchUsers();
      }, []); // Dependências vazias para executar apenas uma vez ao montar o componente
      

    return (
     <>
             <Container>
    <Title style={{ alignSelf: 'center' }}>List of users</Title>
    <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Phone</th>
                        <th style={thStyle}>NIC</th>
                        <th style={thStyle}>NIF</th>
                        <th style={thStyle}>Role</th>
                        <th style={thStyle}>Status</th>
                    </tr>
                </thead>
              
                <tbody>
                    {users.map(item => (
                        <tr key={item.object_id}>
                            <td style={tdStyle}>{item._id}</td>
                            <td style={tdStyle}>{item.first_name + " "+ item.last_name}</td>
                            <td style={tdStyle}>{item.email}</td>
                            <td style={tdStyle}>{item.phone}</td>
                            <td style={tdStyle}>{item.nic}</td>
                            <td style={tdStyle}>{item.nif}</td>
                            <td style={tdStyle}>{item.role}</td>
                            <td style={tdStyle}>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

    </Container>
      </>
    );
}
