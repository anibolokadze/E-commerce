import "./App.css";
import Navbar from "./Components/Navbar";
import Slider from "./Components/Slider";
import sliderImage1 from "./assets/slider1 (1).jpg";
import sliderImage2 from "./assets/slider1 (2).jpg";
const App = () => {
  const images = [sliderImage1, sliderImage2];
  return (
    <>
      <Navbar />
      <Slider images={images} />
    </>
  );
};

export default App;
