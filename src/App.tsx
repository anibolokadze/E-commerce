import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PopularProductDetailsPage from "./pages/PopularProductsDetails";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MenCategory from "./pages/MenCategory";
import WomenCategory from "./pages/WomenCategory";
import JeweleryCategory from "./pages/JeweleryCategory";
import CategoryDetails from "./pages/CategoryDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/popular-products/:productTitle"
          element={<PopularProductDetailsPage />}
        />
        <Route path="/men" element={<MenCategory />} />
        <Route path="/women" element={<WomenCategory />} />
        <Route path="/jewelery" element={<JeweleryCategory />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
