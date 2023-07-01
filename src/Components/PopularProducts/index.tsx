import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { fetchPopularProducts, PopularProduct } from "../../api";
import eye from "../../assets/icons8-eye-30.png";
import star from "../../assets/glowing-star.png";
import "./PopularProducts.scss";

const PopularProductList: React.FC = () => {
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    // Fetch popular products from API
    const fetchPopularProductsFromApi = async () => {
      try {
        const response = await fetchPopularProducts();
        setPopularProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularProductsFromApi();
  }, []);

  useEffect(() => {
    // Handle scroll event to trigger animation
    const onScroll = () => {
      const scrollThreshold = window.innerHeight * 0.9;
      const productWrapper = document.querySelector(".product-wrapper");

      if (productWrapper) {
        const topOffset = productWrapper.getBoundingClientRect().top;

        if (topOffset < scrollThreshold) {
          controls.start("show");
        }
      }
    };

    const controlsPromise = controls.start("hidden"); // Start with hidden state
    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      controlsPromise.then(controls.stop); // Stop animation on unmount
    };
  }, [controls]);

  return (
    <motion.div
      className="product-wrapper"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.2, ease: "easeIn" }}
    >
      <h1>Popular Products</h1>
      <ul>
        {popularProducts.map((product) => (
          <li key={product.title}>
            <div className="product-container">
              <div className="image-wrapper">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <p>{product.title}</p>
                <p>$ {product.price}</p>
              </div>
            </div>
            <div className="rating-info">
              <img src={star} alt={star} />
              {product.rating.rate}
            </div>
            <button className="button-overlay">
              <img src={eye} alt={eye} /> Quick view
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PopularProductList;
