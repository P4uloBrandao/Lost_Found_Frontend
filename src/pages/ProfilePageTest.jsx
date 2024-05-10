import React from 'react'
import photo from '../assets/background/bg-photo.jpg'
import styled, { keyframes } from 'styled-components';
import DeleteProfile from '../components/deleteProfile/index'
import Layout from '../components/Layout/Layout';
import ChangePassword from '../components/changePassword';
import ProfileSettings from '../components/profileSettings/index';
const PrimaryContainer = styled.div`
  margin: 9em 7em ;
  text-align: -webkit-center;
  place-content: center;
`;
const Container = styled.div`
  width: 190vh;
 
  margin: 5em 0;
  
  border-radius: 20px 20px 20px 20px; 
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  justify-content: flex-start; 
  box-sizing: border-box;
  border: 1px solid #D3D3D3; 
  background-color: white; 
  padding: 40px; 
`;

const CategoryTitle = styled.h2`

color: #3CB684;
display :flex;
font-family: 'Roboto', sans-serif;
font-size: 24px;
font-weight: 400;
line-height: 27px;
text-align: left !important;

margin-top: 0px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: var(--black-color); 
  opacity: 1;
  text-align: left;
  margin-bottom: 40px; 
`;
export default function ProfilePage() {
  return ( <PrimaryContainer>
    <Title>Personal Information</Title>
    <CategoryTitle>You can edit your personal info in the fields that are not locked anytime!
Remember to save all changes in the end.</CategoryTitle>
    <Container>
    <ProfileSettings/>
        
    </Container>
    <Title>Change Password</Title>
    <CategoryTitle>Please enter your old and new password and press “Save Changes” to make sure nothing is lost!</CategoryTitle>
    <Container>
    <ChangePassword/>
        
    </Container>
    <Title>Delete Account</Title>
    <CategoryTitle>Deleting your account will remove all your data from our databases. This cannot be undone.
</CategoryTitle>
    
    <Container>
    <DeleteProfile/>
        
    </Container>
  </PrimaryContainer>
  )
}

