import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PopularProductDetailsPage from "./pages/PopularProductDetailsPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products/:productTitle"
          element={<PopularProductDetailsPage />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
