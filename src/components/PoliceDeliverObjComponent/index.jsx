import React, { useState, useEffect } from 'react';
import axios from "axios";
import InputF from '../inputFieldComponent/InputField';
import styled from 'styled-components';
import "../../assets/colors/colors.css";
import { InputSubmit, Container, InputBox, Title, CategoryTitle } from '../../assets/StylePopularComponent/style';

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

const UserName = styled.div`
  text-align: right;
  color: #3CB684;
  margin-bottom: 10px;
  font-size: 24px;
`;

export default function PoliceDeliverObjComponent() {
    const [errorMessage, setErrorMessage] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [statusMessage2, setStatusMessage2] = useState("");
    const [userId, setUserId] = useState('');
    const [userId2, setUserId2] = useState('');
    const [userName, setUserName] = useState('');
    const [userName2, setUserName2] = useState('');

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3000/api/users/userData/${userId}`)
                .then(response => {
                    setUserName(response.data.currentUser.first_name + " "+response.data.currentUser.last_name );
                })
                .catch(error => {
                    setUserName('');
                    console.error("There was an error fetching the user details!", error);
                });
        }
    }, [userId]);

    useEffect(() => {
        if (userId2) {
            axios.get(`http://localhost:3000/api/users/userData/${userId2}`)
                .then(response => {
                    setUserName2(response.data.currentUser.first_name + " "+response.data.currentUser.last_name );
                })
                .catch(error => {
                    setUserName2('');
                    console.error("There was an error fetching the user details!", error);
                });
        }
    }, [userId2]);

    const handleDeactivateSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/users/deactivate/${userId}`);
            console.log(response.data); // Log the response from the server
            setStatusMessage("User account deactivated successfully.");
            setErrorMessage("");
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error);
                setStatusMessage("");
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
                setStatusMessage("");
            }
        }
    }

    const handleActivateSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/users/activate/${userId2}`);
            console.log(response.data); // Log the response from the server
            setStatusMessage2("User account activated successfully.");
            setErrorMessage2("");
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage2(error.response.data.error);
                setStatusMessage2("");
            } else {
                setErrorMessage2('An unexpected error occurred. Please try again.');
                setStatusMessage2("");
            }
        }
    }

    return (
        <>
            <Title>Object Delivery</Title>
            <Container>
                {statusMessage && <Message>{statusMessage}</Message>}
                {errorMessage && <Message error>{errorMessage}</Message>}
                <Title>Found Object Delivery</Title>
                <CategoryTitle>Ask for the validation email with the lost and found object's ID's and the user's NIF.</CategoryTitle>
                {userName && <UserName>Username: {userName}</UserName>}
                <CategoryTitle></CategoryTitle>
                <InputBox>
                    <InputF
                        type={'text'}
                        placeholder={'Insert Found Object Id'}
                        id="foundObjId"
                        required
                        onChange={(e) => setUserId(e.target.value)}
                        value={userId}
                        errorMessage={'invalid'}
                        name="Found Object Id"
                    />
                </InputBox>
                <CategoryTitle></CategoryTitle>
                <InputBox>
                    <InputF
                        type={'text'}
                        placeholder={'Insert Lost Object Id'}
                        id="lostObjId"
                        required
                        onChange={(e) => setUserId(e.target.value)}
                        value={userId}
                        errorMessage={'invalid'}
                        name="Lost Object Id"
                    />
                </InputBox>
                <CategoryTitle></CategoryTitle>
                <InputBox>
                    <InputF
                        type={'text'}
                        placeholder={'Insert user NIF'}
                        id="userNif"
                        required
                        onChange={(e) => setUserId(e.target.value)}
                        value={userId}
                        errorMessage={'invalid'}
                        name="User NIF"
                    />
                </InputBox>
                <InputSubmit type="submit" onClick={handleDeactivateSubmit}>Register Delivery</InputSubmit>
            </Container>

            <Container>
                {statusMessage2 && <Message>{statusMessage2}</Message>}
                {errorMessage2 && <Message error>{errorMessage2}</Message>}
                <Title>Activate User Account</Title>
                <CategoryTitle>Activate account based on user's Id</CategoryTitle>
                {userName2 && <UserName>User Name: {userName2}</UserName>}
                <InputBox>
                    <InputF
                        type={'text'}
                        placeholder={'Insert user Id'}
                        id="userId2"
                        required
                        onChange={(e) => setUserId2(e.target.value)}
                        value={userId2}
                        errorMessage={'invalid'}
                        name="User Id"
                    />
                </InputBox>
                <InputSubmit type="submit" onClick={handleActivateSubmit}>Activate</InputSubmit>
            </Container>
        </>
    );
}
