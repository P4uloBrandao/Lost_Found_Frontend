import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';


// TODO ESTE CSS FOI PARA TESTAR, DEPOIS HÁ DE SER ALTERADO OU REAPROVEITADO
const colors = css`
  --primary-color: #c6c3c3;
  --second-color: #ffffff;
  --black-color: #000000;
`;

const Label = styled.label`
  position: absolute;
  top: -28px;
  left: 20px;
  transition: 0.2s;
`;

const InputBox = styled.div`
  ${colors};
  position: ${props => props.position ? props.position : 'relative'};
  align-self: center;
  display: inline-block;
  background-color: var(--primary-color);
  border-radius: 10px;
  overflow: hidden;
`;

const DefaultBox = styled.div`
  ${colors};
  width: 200px;
  height: 200px;
  background: var(--secondary-grey-color);
  position: relative;
  border-radius: 10px;
`;



const FileInputField = styled.input.attrs({
  type: 'file',
  accept:"image/*"
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 20pt;

  height: 20pt;
  opacity: 0;
  cursor: pointer;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  max-width: 520px;
  overflow-x: auto;



`;

const ImageContainer = styled.div`
  position: relative;

  width: 150px;
  max-width: 150px;
  max-height: 150px;
  img {
    width: 150px;
    max-width: 150px;
    max-height: 150px;
    min-width: 150px;
    object-fit: cover;
    object-position: center;

  }

  img:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`


const AddIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--second-color);
  font-size: 48px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
  drop-shadow: 0 0 5  px var(--black-color);

  ${InputBox}:hover & {
    opacity: 1;
  }
`;

const RemoveIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--second-color);
  font-size: 48px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
  drop-shadow: 0 0 5  px var(--black-color);

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

function removeImage(index, setPreviews) {
  setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
}


// Funcional

const CustomInputFiles = ({id, onChange, max = 1}) => {
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);
  const handleImageChange = (e) => {
    const files = e.target.files;
    const filePreviews = [];

    if (files.length > max) {
      alert(`Você pode selecionar no máximo ${max} arquivos`);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        filePreviews.push(event.target.result);
        if(max === 1) {
          setPreviews(filePreviews);
          onChange(files[0]);
        }else if (filePreviews.length === files.length) {
          setPreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);
          // Chama a função de retorno de chamada onChange e passa os arquivos selecionados
          onChange(files);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  return (
      <InputBox>
        <FileInputField id={id} onChange={handleImageChange} multiple={!(max===1)} ref={fileInputRef}  />

        {previews.length>0 ? (
            <ImagePreviewContainer>
              {previews.map((preview, index) => (
                  <ImageContainer onClick={() => removeImage(index, setPreviews)}>
                    <img key={index} src={preview} alt="preview" />
                    <RemoveIconWrapper>

                      <DeleteIcon />
                    </RemoveIconWrapper>
                  </ImageContainer>
              ))}
            </ImagePreviewContainer>
        ) : (
            <DefaultBox>
              <AddIconWrapper onClick={() => { fileInputRef.current.click();}}>
                &#x2B;
              </AddIconWrapper>
            </DefaultBox>
        )}

      </InputBox>

  );
};

export default CustomInputFiles;