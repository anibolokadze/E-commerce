import "./App.css";
import Navbar from "./Components/Navbar";
import Slider from "./Components/Slider";
import sliderImage1 from "./assets/slider (1).jpg";
import sliderImage2 from "./assets/slider (2).jpg";

const App = () => {
  // Slider images
  const images = [
    {
      img: sliderImage1,
      buttonText: "Btn 1",
      pText: "New Collection",
    },
    {
      img: sliderImage2,
      buttonText: "Btn 2",
      pText: "Old Collection",
    },
  ];
  return (
    <>
      <Navbar />
      <Slider images={images} />
    </>
  );
};

export default App;
