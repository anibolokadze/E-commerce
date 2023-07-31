import "../../App.css";
import { useState, useEffect } from "react";
import CoverPhoto from "./Components/CoverPhoto";
import PopularProducts from "./Components/PopularProducts";
import Popup from "./Components/Popup";
import Footer from "../../Components/Footer";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <CoverPhoto />
      <PopularProducts />
      {showPopup && <div className="blur-overlay" />}
      {showPopup && <Popup onClose={handleClosePopup} />}
      <Footer />
    </>
  );
};

export default App;
