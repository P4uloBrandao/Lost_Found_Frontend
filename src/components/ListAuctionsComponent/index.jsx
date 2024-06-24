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

export default function AuctionsListComponent() {
   const[auctions, setAuctions] = useState([]);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAuctions = async () => {
          try {
            // Buscar os dados dos objetos encontrados
            const objectsResponse = await axios.get(process.env.REACT_APP_API_URL+'/api/auction');
            let objectsData = objectsResponse.data;
      
            // Atualizar o estado dos objetos com os dados buscados
            setAuctions(objectsData);
      
            
      
            setLoading(false);
          } catch (error) {
            console.error('Failed to fetch auctions data:', error);
            // Lidar com erros conforme necessário
          }
        };
      
        fetchAuctions();
      }, []); // Dependências vazias para executar apenas uma vez ao montar o componente
      

    return (
     <>
             <Container>
    <Title style={{ alignSelf: 'center' }}>List of Auctions</Title>
    <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Found Object Title</th>
                        <th style={thStyle}>Found Object ID</th>
                        <th style={thStyle}>Start Date</th>
                        <th style={thStyle}>End Date</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Highest Bid</th>
                    </tr>
                </thead>
                <tbody>
                    {auctions.map(item => (
                        <tr key={item.object_id}>
                            <td style={tdStyle}>{item._id}</td>
                            <td style={tdStyle}>{item.foundObjectTitle}</td>
                            <td style={tdStyle}>{item.foundObject}</td>
                            <td style={tdStyle}>{item.startDate}</td>
                            <td style={tdStyle}>{item.endDate}</td>
                            <td style={tdStyle}>{item.status}</td>
                            <td style={tdStyle}>{item.highestBid}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

    </Container>
      </>
    );
}
