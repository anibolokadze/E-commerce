import React, { useState } from "react";
import "./Slider.scss";

interface SliderProps {
  images: { img: string; buttonText: string; pText: string }[];
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
      <div className="wrapper">
        <button>{images[currentIndex].buttonText}</button>
        <img src={images[currentIndex].img} alt="Slider" />
        <p>{images[currentIndex].pText}</p>
      </div>

      <button onClick={goToNextSlide}>Next</button>
    </div>
  );
};

export default Slider;
