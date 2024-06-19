import React, { useState, useEffect } from 'react';
import InputF from '../inputFieldComponent/InputField';
import styled from 'styled-components';
import "../../assets/colors/colors.css";
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

export default function AdminAuctionComponent() {
  const [auctionId, setAuctionId] = useState('');
  const [auctionIdB, setAuctionBId] = useState('');
  const [auctionIdE, setAuctionEId] = useState('');
  const [foundObjId, setfoundObjId] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [loading, setLoading] = useState(true);

  // Feedback messages
  const [createStatusMessage, setCreateStatusMessage] = useState("");
  const [createErrorMessage, setCreateErrorMessage] = useState("");
  const [beginStatusMessage, setBeginStatusMessage] = useState("");
  const [beginErrorMessage, setBeginErrorMessage] = useState("");
  const [endStatusMessage, setEndStatusMessage] = useState("");
  const [endErrorMessage, setEndErrorMessage] = useState("");
  const [deleteStatusMessage, setDeleteStatusMessage] = useState("");
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/auction/`, {
        "foundObject": foundObjId,
        "endDate": dateEnd,
        "startDate": dateStart,
        "status": "Open",
      });
      setCreateStatusMessage("Auction created successfully.");
      setCreateErrorMessage("");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setCreateErrorMessage(error.response.data.message || "An unexpected error occurred. Please try again.");
      } else {
        setCreateErrorMessage("An unexpected error occurred. Please try again.");
      }
      setCreateStatusMessage("");
    }
  };

  const handleBeginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/auction/${auctionIdB}/begin`);
      setBeginStatusMessage("Auction started successfully.");
      setBeginErrorMessage("");
    } catch (error) {
      if (error.response && error.response.data) {
        setBeginErrorMessage(error.response.data.error || "An unexpected error occurred. Please try again.");
      } else {
        setBeginErrorMessage("An unexpected error occurred. Please try again.");
      }
      setBeginStatusMessage("");
    }
  };

  const handleEndSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/auction/${auctionIdE}/end`);
      setEndStatusMessage("Auction ended successfully.");
      setEndErrorMessage("");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setEndErrorMessage(error.response.data.error || "An unexpected error occurred. Please try again.");
      } else {
        setEndErrorMessage("An unexpected error occurred. Please try again.");
      }
      setEndStatusMessage("");
    }
  };

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:3000/api/auction/${auctionId}`);
      setDeleteStatusMessage("Auction deleted successfully.");
      setDeleteErrorMessage("");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setDeleteErrorMessage(error.response.data.error || "An unexpected error occurred. Please try again.");
      } else {
        setDeleteErrorMessage("An unexpected error occurred. Please try again.");
      }
      setDeleteStatusMessage("");
    }
  };

  return (
    <>
      <Container>
        <Title>Create Auction</Title>
        {createStatusMessage && <Message>{createStatusMessage}</Message>}
        {createErrorMessage && <Message error>{createErrorMessage}</Message>}
        <CategoryTitle>Create auction for Found Object</CategoryTitle>
        <InputBox>
          <InputF
            type={'text'}
            placeholder={'Insert found Object Id'}
            id="foundObjId"
            required
            onChange={(e) => setfoundObjId(e.target.value)}
            value={foundObjId}
            errorMessage={'invalid'}
            name="Found Object Id"
          />
        </InputBox>
        <CategoryTitle></CategoryTitle>
        <CategoryTitle>Insert start and end Dates</CategoryTitle>
        <InputBox>
          <InputF
            icon={<MailIcon />}
            type={'date'}
            placeholder={'Enter Start Date'}
            id="dateStart"
            required
            onChange={(e) => setDateStart(e.target.value)}
            value={dateStart}
            errorValidation={false}
            errorMessage={'Data inválida'}
            name="Start Date"
          />
        </InputBox>
        <CategoryTitle></CategoryTitle>
        <InputBox>
          <InputF
            icon={<MailIcon />}
            type={'date'}
            placeholder={'Enter End Date'}
            id="dateEnd"
            required
            onChange={(e) => setDateEnd(e.target.value)}
            value={dateEnd}
            errorValidation={false}
            errorMessage={'Data inválida'}
            name="End Date"
          />
        </InputBox>
        <InputSubmit type="submit" onClick={handleCreateSubmit}>Create</InputSubmit>
      </Container>

      <Container>
        <Title>Begin Auction</Title>
        {beginStatusMessage && <Message>{beginStatusMessage}</Message>}
        {beginErrorMessage && <Message error>{beginErrorMessage}</Message>}
        <CategoryTitle>Insert Id of auction to begin</CategoryTitle>
        <InputBox>
          <InputF
            type={'text'}
            placeholder={'Insert Auction Id'}
            id="auctionId"
            required
            onChange={(e) => setAuctionBId(e.target.value)}
            value={auctionIdB}
            errorMessage={'invalid'}
            name="Auction Id"
          />
        </InputBox>
        <InputSubmit type="submit" onClick={handleBeginSubmit}>Begin</InputSubmit>
      </Container>

      <Container>
        <Title>End Auction</Title>
        {endStatusMessage && <Message>{endStatusMessage}</Message>}
        {endErrorMessage && <Message error>{endErrorMessage}</Message>}
        <CategoryTitle>Insert Id of auction to end</CategoryTitle>
        <InputBox>
          <InputF
            type={'text'}
            placeholder={'Insert Auction Id'}
            id="auctionIdE"
            required
            onChange={(e) => setAuctionEId(e.target.value)}
            value={auctionIdE}
            errorMessage={'invalid'}
            name="Auction Id"
          />
        </InputBox>
        <InputSubmit type="submit" onClick={handleEndSubmit}>End</InputSubmit>
      </Container>

      <Container>
        <Title>Delete Auction</Title>
        {deleteStatusMessage && <Message>{deleteStatusMessage}</Message>}
        {deleteErrorMessage && <Message error>{deleteErrorMessage}</Message>}
        <CategoryTitle>Insert Id of auction to delete</CategoryTitle>
        <InputBox>
          <InputF
            type={'text'}
            placeholder={'Insert Auction Id'}
            id="auctionId"
            required
            onChange={(e) => setAuctionId(e.target.value)}
            value={auctionId}
            errorMessage={'invalid'}
            name="Auction Id"
          />
        </InputBox>
        <InputSubmit type="submit" onClick={handleDeleteSubmit}>Delete</InputSubmit>
      </Container>
    </>
  );
}
