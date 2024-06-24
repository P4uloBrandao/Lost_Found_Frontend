// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import ProfileMenu from '../components/profileMenu/index';
import ChangePassword from '../components/ChangePasswordComponent';
import ProfileSettings from '../components/profileSettings/index';
import DeleteProfile from '../components/deleteProfile/index';
import MyAuctions from "../components/AuctionsCatalog/index.jsx";
import MyLost from '../components/LostObjectsCatalog/index.jsx';
import PaymentsDetails from '../components/PaymentDetailsComponent/index.jsx';
import WelcomeHeaderComponent from '../components/headerWithNameComponent/welcomeHeader.jsx';
import MyFoundObjComponent from '../components/MyFoundObjComponent/index.jsx';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem("token");

const PrimaryContainer = styled.div`
  margin: 0.1em 7em;
  text-align: -webkit-center;
  place-content: center;

  @media (max-width: 1200px) {
    margin: 0.1em 3em; // Margens para telas médias
  }
`;

const ChangeContainer = styled.div`
  opacity: 1;
  background-color: var(--white-color);  
  margin-top: 2em ;
  padding: 2em ;
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

const ProfilePage = ({ componentToRender }) => {
  const [user, setUser] = useState('');
  const [selectedOption, setSelectedOption] = useState('Profile');
  const location = useLocation();

  const menuOptions = ['Profile', 'My Auctions', 'My Lost Objects', 'My Found Objects', 'Payments Details', 'Account Settings'];
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Example function to remove query parameters



  useEffect(() => {


    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+`/api/users/profile/${token}`);
        const userProfileData = response.data.currentUser; // Supondo que o endpoint forneça os detalhes do perfil do usuário
        setUser(userProfileData.first_name);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const path = location.pathname.split('/profile/')[1];
    switch (path) {
      case 'profile':
        setSelectedOption('Profile');
        break;
      case 'myAuctions':
        setSelectedOption('My Auctions');
        break;
      case 'myLostObjects':
        setSelectedOption('My Lost Objects');
        break;
      case 'mySelectedLostObject':
        setSelectedOption('mySelectedLostObject');
        break;
      case 'paymentsDetails':
        setSelectedOption('Payments Details');
        break;
      case 'accountSettings':
        setSelectedOption('Account Settings');
        break;
      case "myFoundObjects":
        setSelectedOption('My Found Objects');
        break;
      default:
        setSelectedOption('Profile');
        break;
    }
  }, [location]);

  useEffect(() => {
    const setPayment = async () => {
      const successParameter = searchParams.get('success');
      const auctionId =  searchParams.get('auctionId');
      if (!!successParameter && successParameter === 'false') {
        toast.error('Payment failed. Please try again.', {
            position: 'top-center',
            autoClose: 3000 // Fecha após 3 segundos
        });

      }

      if (!!successParameter && successParameter === 'true' && !!auctionId) {
        const response = await axios.post(process.env.REACT_APP_API_URL+`/api/payment/createPaymentInfo`,
            {
              auctionId: auctionId,
            });

        if (!!response.data) {
          if (searchParams.has("success")) {
            const token = searchParams.get("success");
            if (token) {
              searchParams.delete("success");
              setSearchParams(searchParams);
            }
          }
          if (searchParams.has("auctionId")) {
            const token = searchParams.get("auctionId");
            if (token) {
              searchParams.delete("auctionId");
              setSearchParams(searchParams);
            }
          }
          toast.success('Payment success!', {
            position: 'top-center',
            autoClose: 3000 // Fecha após 3 segundos
          });
        }
      }
    };
      setPayment();

  }, []);

  const renderComponent = () => {
    if (componentToRender) {
      return React.createElement(componentToRender);
    }

    switch (selectedOption) {
      case 'Profile':
        return <ProfileSettings />;
      case 'My Auctions':
        return <MyAuctions />;
      case 'My Lost Objects':
          return <MyLost />;
        //return < LostObjectCatalogPage/>;
      case 'Payments Details':
        return <PaymentsDetails />;
      case 'My Found Objects':
        return <MyFoundObjComponent />;
      case 'Account Settings':
        return (
          <>
            <ChangePassword />
            <DeleteProfile />
          </>
        );
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <PrimaryContainer>

      <ToastContainer />
      <WelcomeHeaderComponent name={user} description={'Did you know that over 30 million wallets are lost every year?'} />
      <ProfileMenu options={menuOptions} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <ChangeContainer>
        {renderComponent()}
      </ChangeContainer>
    </PrimaryContainer>
  );
};

export default ProfilePage;
