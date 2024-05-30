import React, { useState, useEffect } from 'react';
import './PopupAlert.css';

function PopupAlert({ message, duration = 100000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);


  return (
    <>
      {isVisible && (
        <div className="popup-container">
          <div className="popup-content">
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupAlert;
