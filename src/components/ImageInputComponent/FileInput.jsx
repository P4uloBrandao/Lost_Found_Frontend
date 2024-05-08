import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';


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
  width: ${props => props.width ? props.width + 'px' : '100px'};
  height: ${props => props.height ? props.height + 'px' : '100px'};
  background-color: var(--primary-color);
  border-radius: 10px;
  overflow: hidden;
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
  display: grid;
  grid-auto-flow: column;
  gap: 5px;
  padding: 10px;
  overflow-x: auto;
`;

const ImagePreviewSlot = styled.div`
  width: 150px; /* Adjust slot width as needed */
  height: 100%;
  position: relative;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TrashIconWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: black;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
  
  ${ImagePreviewSlot}:hover & {
    opacity: 1;
  }
`;

const PlusIconWrapper = styled.div`
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

  ${InputBox}:hover & {
    opacity: 1;
  }
`;

// Funcional

const CustomInputFiles = ({id, onChange, singleImage = false, width = null, heigth = null, position= null}) => {
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);
console.log(position)
  const handleImageChange = (e) => {
    const files = e.target.files;
    const filePreviews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        filePreviews.push(event.target.result);
        if(singleImage) {
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
      <FileInputField id={id} onChange={handleImageChange} multiple={!singleImage} ref={fileInputRef}  />
      {previews.length > 0 && (
        <ImagePreviewContainer>
          {previews.map((preview, index) => (
            <ImagePreviewSlot key={index}>
              <ImagePreview src={preview} alt="Preview" />
              <TrashIconWrapper onClick={() => {setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));}}>
                &#x1F5D1;
              </TrashIconWrapper>
            </ImagePreviewSlot>
          ))}
        </ImagePreviewContainer>
      )}
      <PlusIconWrapper onClick={() => { fileInputRef.current.click();}}>
        &#x2B;
      </PlusIconWrapper>
      <Label className="label">Image upload</Label>
    </InputBox>
    
  );
};

export default CustomInputFiles;
