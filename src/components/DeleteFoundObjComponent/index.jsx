import React, { useState, useEffect } from 'react';
import InputF from '../inputFieldComponent/InputField';
import styled from 'styled-components';
import "../../assets/colors/colors.css"
import { InputSubmit, Container, InputBox, Title, CategoryTitle } from '../../assets/StylePopularComponent/style';
import MailIcon from '@mui/icons-material/MailOutlineRounded';
import axios from "axios";

const CategoryButton = styled.button`
  width: 174px;
  height: 66px;
  padding: 16px 24px;
  border-radius: 33px;
  border: 1px solid #3CB684;
  background-color: ${props => props.isSelected ? '#3CB684' : 'white'};
  color: ${props => props.isSelected ? 'white' : 'black'};
  cursor: pointer;
  &:hover {
    background-color: #3CB684;
    color: white;
  }
  font-size: 1rem;
  opacity: 1;
`;

const Message = styled.div`
  text-align: right;
  margin-bottom: 10px;
  color: ${props => props.error ? 'red' : 'green'};
`;

export default function DeleteFoundObjComponent() {
    const [objId, setObjId] = useState('');
    // Feedback messages
    const [deleteStatusMessage, setDeleteStatusMessage] = useState("");
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
 

    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/api/found-objects/${objId}`);
            setDeleteStatusMessage("Found Object deleted successfully.");
            setDeleteErrorMessage("");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                setDeleteErrorMessage("Id invalid or not found.");
            } else {
                setDeleteErrorMessage("An unexpected error occurred. Please try again.");
            }
            setDeleteStatusMessage("");
        }
    };

    return (
        <>
           

            <Container>
                <Title>Delete Found Object</Title>
                {deleteStatusMessage && <Message>{deleteStatusMessage}</Message>}
                {deleteErrorMessage && <Message error>{deleteErrorMessage}</Message>}
                <CategoryTitle>Insert Id of found object to delete</CategoryTitle>
                <InputBox>
                    <InputF
                        type={'text'}
                        placeholder={'Insert Auction Id'}
                        id="foundObjId"
                        required
                        onChange={(e) => setObjId(e.target.value)}
                        value={objId}
                        errorMessage={'Id invalid or not found.'}
                        name="Found Object Id"
                    />
                </InputBox>
                <InputSubmit type="submit" onClick={handleDeleteSubmit}>Delete</InputSubmit>
            </Container>
        </>
    );
}
