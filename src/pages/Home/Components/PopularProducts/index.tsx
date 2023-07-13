import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { fetchPopularProducts, PopularProduct } from "../../../../api";
import { Link } from "react-router-dom";
import eye from "../../../../assets/icons8-eye-30.png";
import star from "../../../../assets/glowing-star.png";
import comingSoon from "../../../../assets/coming soon.gif";
import loading from "../../../../assets/loading.gif";
import notFound from "../../../../assets/notfound.gif";
import "./index.scss";

const PopularProductList: React.FC = () => {
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const controls = useAnimation();

  useEffect(() => {
    const fetchPopularProductsFromApi = async () => {
      try {
        const response = await fetchPopularProducts();
        setPopularProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error occurred while fetching popular products.");
      }
    };

    fetchPopularProductsFromApi();
  }, []);

  useEffect(() => {
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

    const onScrollWithControls = () => {
      onScroll();
    };

    const controlsPromise = controls.start("hidden");

    window.addEventListener("scroll", onScrollWithControls);

    return () => {
      window.removeEventListener("scroll", onScrollWithControls);
      controlsPromise.then(() => controls.stop());
    };
  }, [controls]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <img src={loading} alt={loading} />
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
          <img src={notFound} alt={notFound} />
        </div>
      ) : (
        <>
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
            <h1>
              <mark>POPULAR PRODUCTS</mark>
            </h1>
            <ul>
              {popularProducts.map((product) => (
                <li key={product.title}>
                  <Link
                    to={`/products/${encodeURIComponent(product.title)}`}
                    className="product-link"
                  >
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
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
      <div>
        <img src={comingSoon} alt={comingSoon} className="coming-soon" />
      </div>
    </>
  );
};

export default PopularProductList;
