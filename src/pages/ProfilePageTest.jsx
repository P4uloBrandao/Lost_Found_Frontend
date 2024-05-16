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
  opacity: 1;
  background-color: var(--white-color);  
  margin: 4em ;
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

  // Definir as opções de menu
  const menuOptions = ['Profile Settings', 'My Auctions', 'My Lost Objects','Payments Details', 'Privacy Settings'];

  const [selectedOption, setSelectedOption] = useState(menuOptions[0]);
  
  const renderComponent = () => {
    switch (selectedOption) {
      case 'Profile Settings':
        return [
          <ProfileSettings/>,
          <ChangePassword  />,
          <DeleteProfile />
        ];
      case 'My Auctions':
        return <ChangePassword />;
      case 'My Lost Objects':
        return <DeleteProfile />;
      case 'Payments Details':
          return <DeleteProfile />;
      case 'Privacy Settings':
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
        {renderComponent()}
      </ChangeContainer>
    </PrimaryContainer>
  );
};

export default ProfilePage;
