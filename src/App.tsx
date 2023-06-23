import "./App.css";
import Navbar from "./Components/Navbar";
import Slider from "./Components/Slider";
import sliderImage1 from "./assets/slider (1).jpg";
import sliderImage2 from "./assets/slider (2).jpg";

const App = () => {
  // Slider images
  const slides = [
    {
      img: sliderImage1,
      buttonText: "SHOP NOW",
      buttonColors: {
        default: "#F08080",
        hover: "#FFC1C1",
      },
    },
    {
      img: sliderImage2,
      buttonText: "SHOP NOW",
      buttonColors: {
        default: "#CF8FCC",
        hover: "#E7C3E5",
      },
    },
  ];

  return (
    <>
      <Navbar />
      <Slider slides={slides} />
    </>
  );
};

export default App;
