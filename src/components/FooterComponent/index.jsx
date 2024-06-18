import styled from "styled-components";
import InstagramIcon from '@mui/icons-material/Instagram';
import './style.css';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';


const FooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #263238;
    color: #fff;
  padding: 30px 100px;
    `

const Container1 = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
    justify-content: center;
    align-items: flex-start; 
  
  img {
    width: 200px;
    height: auto;
  }
  
  p {
    margin: 0;
    margin-bottom: 10px ;
  }
  
    `
const Container2 = styled.div`
    width: 20%;
  display: flex;
  flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  gap: 10px;
    `
const Container3 = styled.div`
    width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
    `

const SocialMediasContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  gap: 10px;
  :hover {
    scale: 1.2;
    cursor: pointer;
  }
    `

const SocialMedia = styled.div`
  height: 24px;
  border-radius: 50%;
  padding: 8px;
  background: rgba(73, 73, 73, 0.96);
  :hover {
    scale: 1;
  }
`

const EmailInput = styled.div`
  display: flex;
  border-radius: 5px;
  background: rgba(73, 73, 73, 0.96);
  align-items: center;
  gap: 40px;
  padding: 5px 10px;
  
`

const Footer = () => {
    return (
        <FooterContainer className={"footerContainer"}>
            <Container1 className={"Container"}>
                <img src={require('./logo.png')}alt=""/>
                <p>Copyright © 2020 BiD Find.er</p>
                <p>All rights reserved</p>
                <SocialMediasContainer>
                    <SocialMedia>
                        <InstagramIcon/>
                    </SocialMedia>
                    <SocialMedia>
                        <FacebookIcon/>
                    </SocialMedia>
                    <SocialMedia>
                        <XIcon/>
                    </SocialMedia>
                    <SocialMedia>
                        <YouTubeIcon/>
                    </SocialMedia>
                </SocialMediasContainer>
            </Container1>
            <Container2 className={"Container"}>
                <p href={"#"} className={"title"}>Company</p>
                <a href={"#"} className={"link"}>Profile</a>
                <a href={"#"} className={"link"}>Auctions</a>
                <a href={"#"} className={"link"}>Lost an Item</a>
                <a href={"#"} className={"link"}>Pricing</a>
                <a href={"#"} className={"link"}>Testemonials</a>
            </Container2>
            <Container2 className={"Container"}>
                <p href={"#"} className={"title"}>Support</p>
                <a href={"#"} className={"link"}>Terms of service</a>
                <a href={"#"} className={"link"}>Legal</a>
                <a href={"#"} className={"link"}>Privacy policy</a>
                <a href={"#"} className={"link"}>Team</a>
            </Container2>
            <Container3 className={"Container"}>

                <p href={"#"} className={"title"}>Stay up to date</p>
                <EmailInput>
                    <input type={"text"} placeholder={"Your email address"} className={"emailInput"}/>
                    <SendOutlinedIcon className={"sendIcon"}/>
                </EmailInput>
            </Container3>
        </FooterContainer>
    )
}

export default Footer