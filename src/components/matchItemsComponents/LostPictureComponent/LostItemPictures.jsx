import React, { useState } from 'react';
import './LostItemPicture.css';
import imageSrc from './Image.svg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'




const LostItemPicture = ({ images,nome }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState('https://res.cloudinary.com/dkyu0tmfx/image/upload/v1/objectImages/'+images[0]); 
  const [selectedname, setSelectedname] = useState(nome); 

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite); // Toggle favorite state
   
  };
  // Prefix for Cloudinary images
  const imagePrefix = 'https://res.cloudinary.com/dkyu0tmfx/image/upload/v1/objectImages/';
  
  // Add prefix to each image ID
  const prefixedImages = images.map(image => imagePrefix + image);

  const placeholderImages = Array(3).fill(imagePrefix + images[0]);
  const carouselImages = prefixedImages.length == 3 
    ? prefixedImages 
    : [...prefixedImages, ...placeholderImages.slice(0, 3 - prefixedImages.length)];
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
              image === selectedImage ? 'select' : ''
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



