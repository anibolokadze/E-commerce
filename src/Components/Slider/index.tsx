import React, { useState } from "react";

interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-slider">
      <button onClick={goToPrevSlide}>Prev</button>
      <img src={images[currentIndex]} alt="Slider" style={{ width: "100%" }} />
      <button onClick={goToNextSlide}>Next</button>
    </div>
  );
};

export default Slider;
