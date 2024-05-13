// ProfilePage.jsx
import React, { useState } from 'react';
import ProfileMenu from '../components/profileMenu/index';
import ChangePassword from '../components/ChangePasswordComponent';
import ProfileSettings from '../components/profileSettings/index';
import DeleteProfile from '../components/deleteProfile/index';
import styled from 'styled-components';

const PrimaryContainer = styled.div`
  margin: 9em 7em;
  text-align: -webkit-center;
  place-content: center;
`;

const ChangeContainer = styled.div`
  width: 190vh;
  margin: 5em 0;
  opacity: 1;
  background-color: white;
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: var(--black-color);
  opacity: 1;
  text-align: left;
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  color: #3cb684;
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 27px;
  text-align: left !important;
  margin-top: 0px;
`;

const ProfilePage = () => {
  const [selectedOption, setSelectedOption] = useState('ProfileSettings');

  // Definir as opções de menu
  const menuOptions = ['Profile Settings', 'My Auctions', 'My Lost Objects','Payments Details', 'Privacy Settings'];

  const renderComponent = () => {
    switch (selectedOption) {
      case 'Profile Settings':
        return <ProfileSettings />;
      case 'My Auctions':
        return <ChangePassword />;
      case 'My Lost Objects':
        return <DeleteProfile />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <PrimaryContainer>
      {/* Renderizar o componente Menu com as opções */}
      <ProfileMenu options={menuOptions} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <ChangeContainer>
        {selectedOption === 'Profile Settings' && (
          <>
            <Title>Personal Information</Title>
            <CategoryTitle>
              You can edit your personal info in the fields that are not locked anytime! Remember to save all changes
              in the end.
            </CategoryTitle>
          
          <Title>Change Password</Title>
          <CategoryTitle>
            Please enter your old and new password and press “Save Changes” to make sure nothing is lost!
          </CategoryTitle>
       
        <Title>Delete Account</Title>
        <CategoryTitle>
          Deleting your account will remove all your data from our databases. This cannot be undone.
        </CategoryTitle>
        </>
        )}
        {selectedOption === 'My Auctions' && (
          <>
            <Title>Change Password</Title>
            <CategoryTitle>
              Please enter your old and new password and press “Save Changes” to make sure nothing is lost!
            </CategoryTitle>
          </>
        )}
        {selectedOption === 'My Lost Objects' && (
          <>
            <Title>Delete Account</Title>
            <CategoryTitle>
              Deleting your account will remove all your data from our databases. This cannot be undone.
            </CategoryTitle>
          </>
        )}
        {renderComponent()}
      </ChangeContainer>
    </PrimaryContainer>
  );
};

export default ProfilePage;
