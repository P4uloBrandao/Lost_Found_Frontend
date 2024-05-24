import React, { useState } from 'react';
import './LostItemPicture.css';
import imageSrc from './Image.svg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'




const LostItemPicture = ({ images,nome }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState([0]); 
  const [selectedname, setSelectedname] = useState(nome); 

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite); // Toggle favorite state
   
  };

  const placeholderImages = Array(3).fill(imageSrc);
  const carouselImages = images.length >= 3 ? images : [...images, ...placeholderImages.slice(0, 3 - images.length)];
  return (
    <div className="lostitem-picture-container">
      <span className="lostItem-name">{selectedname}</span>
      <div className='lostItem-icon'>
        <button type="button" onClick={handleFavoriteClick}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button>
      </div>
      <div className="lostitem-picture-selected" >
        
        <img src={selectedImage} alt={selectedImage} />
      </div>

      <div className="lostitem-picture-carousel">
        {carouselImages.map((image) => (
          <div
            key={image}
            className={`lostitem-picture-item ${
              image === selectedImage ? 'selected' : ''
            }`}
            onClick={() => handleImageClick(image)}
          >
            <img src={carouselImages[0]} alt={image} />
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default LostItemPicture;



