// styles.js
import styled, { css } from 'styled-components';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import LockIcon from '@mui/icons-material/Lock';
import LockIconOpen from '@mui/icons-material/LockOpenRounded';


export const colors = css`
  --primary-color: #c6c3c3;
  --second-color: #ffffff;
  --black-color: #000000;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const FormBox = styled.div`
  ${colors};
  text-align: -webkit-center;
  position: relative;
  height: auto;
  width: 330px;
  backdrop-filter: blur(25px);
  border: 2px solid var(--primary-color);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 3em 2.5em 2em 2.5em;
  color: var(--second-color);
`;

export const Header = styled.div`
  ${colors};
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  width: 140px;
  height: 70px;
  border-radius: 0 0 20px 20px;
`;

export const HeaderText = styled.span`
  ${colors};
  font-size: 30px;
  color: var(--black-color);
`;

export const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

export const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 14px;
`;

export const InputSubmit = styled.button`
  ${colors};
  width: 50%;
  height: 40px;
  background: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--second-color);
  }
`;

export const GoogleButton = styled.button`
  ${colors};
  width: 100%;
  height: 40px;
  background: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--second-color);
  }
`;

export const Register = styled.div`
  text-align: center;
`;

export const RegisterLink = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: var(--second-color);
  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  ${colors};
  width: 40px; /* Tamanho do botão */
  height: 40px; /* Tamanho do botão */
  position: absolute;
  top: 10px; /* Distância do topo */
  right: 10px; /* Distância da direita */
  background: #ffffff;
  border: none;
  border-radius: 50%; /* Botão redondo */
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--second-color);
  }
`;

export const Button2 = styled.button`
  ${colors};
  width: 40px; /* Tamanho do botão */
  height: 40px; /* Tamanho do botão */
  position: absolute;
  top: 10px; /* Distância do topo */
  left: 10px; /* Distância da direita */
  background: #ffffff;
  border: none;
  border-radius: 50%; /* Botão redondo */
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--second-color);
  }
`;
