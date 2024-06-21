import React, { useState, useEffect } from 'react';
import './LostItemPicture.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LostItemPicture = ({ images, nome }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedName, setSelectedName] = useState(nome);
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const imagePrefix = 'https://res.cloudinary.com/dkyu0tmfx/image/upload/v1/objectImages/';
    const prefixedImages = images.map(image => imagePrefix + image);
    const placeholderImage = Array(3 - prefixedImages.length).fill(prefixedImages[0]);
    const completeCarouselImages = prefixedImages.length >= 3 ? prefixedImages : [...prefixedImages, ...placeholderImage];
    
    setSelectedImage(completeCarouselImages[0]);
    setCarouselImages(completeCarouselImages);
  }, [images]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite); // Toggle favorite state
  };

  return (
    <div className="lostitem-picture-container">
      <span className="lostItem-name">{selectedName}</span>
      <div className='lostItem-icon'>
        <button type="button" onClick={handleFavoriteClick}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
      </div>
      <div className="lostitem-picture-selected">
        <img src={selectedImage} alt="Image not found" />
      </div>
      <div className="lostitem-picture-carousel">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`lostitem-picture-item ${image === selectedImage ? 'select' : ''}`}
            onClick={() => handleImageClick(image)}
          >
            <img src={image} alt="Image not found" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostItemPicture;
