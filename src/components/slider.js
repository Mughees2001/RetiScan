import React from 'react';
import TestimonialCarousel from './TestimonialCarousel'; // Adjust the path as necessary

function Slider() {
  return (
    <div className="slider_section" style={{ 
        backgroundImage: "url('./images/hero-bg.png')",
        backgroundSize: 'cover', // Ensure it covers the whole area
        backgroundRepeat: 'no-repeat', // Do not repeat the image
        backgroundPosition: 'center center', // Center the image
      }}>
      <TestimonialCarousel />
    </div>
  );
}

export default Slider;

