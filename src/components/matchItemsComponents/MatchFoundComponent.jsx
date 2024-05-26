import { Margin } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

const MatchFoundContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  margin-top:30px;
  display: flex;
  align-items: center;
`;

const MatchImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const MatchDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MatchTitle = styled.h3`
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
`;

const MatchInfo = styled.div`
  margin: 10px 0;
  color: #555;
`;

const MatchActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 0.9em;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff0000;
  cursor: pointer;
  font-size: 0.9em;
  text-decoration: underline;
`;

const MatchFoundComponent = ({ matches }) => {
  return (
    <div>
      <h2 style={{marginTop:'40px'}}>Matches Found</h2>
      {matches.map((match, index) => (
        <MatchFoundContainer key={index}>
          <MatchImage src={match.image} alt={match.title} />
          <MatchDetails>
            <MatchTitle>{match.title}</MatchTitle>
            <MatchInfo>Lost on: {match.date}</MatchInfo>
            <MatchInfo>Location: {match.location}</MatchInfo>
            <MatchActions>
              <ActionLink href={match.descriptionLink}>View Description</ActionLink>
              <ActionLink href={match.matchesLink}>View Matches</ActionLink>
              <RemoveButton onClick={() => match.onRemove(match.id)}>Remove Lost Object</RemoveButton>
            </MatchActions>
          </MatchDetails>
        </MatchFoundContainer>
      ))}
    </div>
  );
};

export default MatchFoundComponent;
