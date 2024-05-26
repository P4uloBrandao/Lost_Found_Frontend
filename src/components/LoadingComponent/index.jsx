import React from 'react';
import '../../assets/icons/loader.gif' ;
import styled from 'styled-components';
const ImgContainer = styled.div`
width: 100p%
height: 100%;
display: flex;
justify-content: center;
align-items: center;


`
const Img = styled.img`
width: 60pt;



`
const LoadingComponent = () => {
    return (
        <ImgContainer>
            <Img src={require('../../assets/icons/loader.gif')} alt="loading" />
        </ImgContainer>
    );
};

export default LoadingComponent;