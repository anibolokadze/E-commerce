import "./App.css";
import Navbar from "./Components/Navbar";
import CoverPhoto from "./Components/CoverPhoto";
import PopularProducts from "./Components/PopularProducts";
import Footer from "./Components/Footer";
import Popup from "./Components/Popup";
import { useState, useEffect } from "react";

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
      <Navbar />
      <CoverPhoto />
      <PopularProducts />
      {showPopup && <div className="blur-overlay" />}
      {showPopup && <Popup onClose={handleClosePopup} />}
      <Footer />
    </>
  );
};

export default App;
