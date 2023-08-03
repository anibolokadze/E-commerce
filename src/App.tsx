import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PopularProductDetailsPage from "./pages/PopularProductsDetails";
import Navbar from "./Components/Navbar";
import MenCategory from "./pages/Men";
import WomenCategory from "./pages/Women";
import JeweleryCategory from "./pages/Jewelery";
import CategoryDetails from "./pages/CategoryDetails";
import ShoppingCart from "./pages/ShoppingCart";
import { CartProvider } from "./context/CartContext";

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route
            path="/popular-products/:productTitle"
            element={<PopularProductDetailsPage />}
          />
          <Route path="/men" element={<MenCategory />} />
          <Route
            path="/category-details/:productTitle"
            element={<CategoryDetails />}
          />
          <Route path="/women" element={<WomenCategory />} />
          <Route path="/jewelery" element={<JeweleryCategory />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
