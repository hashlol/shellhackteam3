import React from 'react';
import  { useState } from 'react';
//import './Overlay.css'; // You can define the styles for the overlay in a separate CSS file


const Overlay = ({ isVisible }) => {
  const overlayStyle = {
    display: isVisible ? 'block' : 'none',
  };

  return <div className="overlay" style={overlayStyle}>
  </div>;
};

export default Overlay;
