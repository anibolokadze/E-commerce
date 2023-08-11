import "../../App.css";
import { useState, useEffect } from "react";
import CoverPhoto from "./CoverPhoto";
import PopularProducts from "./PopularProducts";
import Footer from "../../Components/Footer";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <CoverPhoto />
      <PopularProducts />
      {showPopup && <div className="blur-overlay" />}
      <Footer />
    </>
  );
};

export default App;
