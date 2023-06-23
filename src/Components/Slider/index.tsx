import { useState } from "react";
import arrowLeft from "../../assets/arrow-left.png";
import arrowRight from "../../assets/arrow-right.png";
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
      <button onClick={goToPrevSlide} className="arrowLeft">
        <img src={arrowLeft} alt={arrowLeft} />
      </button>
      <div className="wrapper">
        <button>{images[currentIndex].buttonText}</button>
        <img src={images[currentIndex].img} alt="Slider" />
        <p>{images[currentIndex].pText}</p>
      </div>

      <button onClick={goToNextSlide} className="arrowRight">
        <img src={arrowRight} alt={arrowRight} />
      </button>
    </div>
  );
};

export default Slider;
