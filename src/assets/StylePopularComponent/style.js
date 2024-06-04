import styled from 'styled-components';
import '../colors/colors.css'
export const Form = styled.form`
  display: grid;
  gap: 20px;
`;
export const SubCategoryTitle = styled.h2`
color: #3CB684;
display :flex;
font-family: 'Roboto', sans-serif;
font-size: 16px;
font-weight: 350;
line-height: 27px;
text-align: left;

margin-top: 0px;
`;
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: max-content;  
`;
export  const InputSubmit = styled.button`

position: relative;
width: 12.93306rem;
align-self: end;
margin-top: 33pt;
margin-right: 11pt;    height: 3.25rem;
    background: var(--primary-green-color);
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.11);
    transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
    text-align: center;
    font-family: Roboto;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 135.5%;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    color: var(--white-color);
    transition: 0.3s;
  &:hover {
    background: var(--white-color);
    border: solid 2px var(--primary-green-color);
    color:var(--primary-green-color);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.30), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }
`;
export const Container = styled.div`
  width: auto;
 
  margin-bottom: 5em ;
  
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
export const CategoryTitle = styled.h2`
color: #3CB684;
display :flex;
font-family: 'Roboto', sans-serif;
font-size: 24px;
font-weight: 400;
line-height: 27px;
text-align: left;

margin-top: 0px;
`;
export const Title = styled.h2`
font-size: 1.5rem;
color: var(--black-color); 
opacity: 1;
margin-bottom: 40px; 
`;

export const CategorySection = styled.div`
display: grid;
grid-template-columns: repeat(6, 1fr); 
grid-gap: 10px; 
justify-content: center; 
margin-bottom: 20px;
`;
export const InputBox = styled.div`
position: relative;
display: flex;
flex-direction: column;

width: -webkit-fill-available;
`;