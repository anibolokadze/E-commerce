import { useState, useEffect } from "react";
import arrowLeft from "../../assets/arrow-left.png";
import arrowRight from "../../assets/arrow-right.png";
import "./Slider.scss";

interface Slide {
  img: string;
  buttonText: string;
  buttonColors: {
    default: string;
    hover: string;
  };
}

interface SliderProps {
  slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Automatically change slide every 5 seconds
    const interval = setInterval(goToNextSlide, 5000);

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, []);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const currentSlide = slides[currentIndex];
  // Add hover color
  const buttonColor = isHovered
    ? currentSlide.buttonColors.hover
    : currentSlide.buttonColors.default;

  return (
    <div className="image-slider">
      {/* Previous slide button */}
      <button onClick={goToPrevSlide} className="arrowLeft">
        <img src={arrowLeft} alt={arrowLeft} />
      </button>

      <div className="wrapper">
        {/* Current slide image */}
        <img src={currentSlide.img} alt="Slider" />

        {/* Button with text */}
        <button
          style={{ backgroundColor: buttonColor }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {currentSlide.buttonText}
        </button>
      </div>

      {/* Next slide button */}
      <button onClick={goToNextSlide} className="arrowRight">
        <img src={arrowRight} alt={arrowRight} />
      </button>
    </div>
  );
};

export default Slider;
