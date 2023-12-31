import { useState, useEffect, useRef } from "react";
import { CategoryData, fetchPopularProducts } from "../../../api";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import loading from "../../../assets/loading.gif";
import notFound from "../../../assets/notfound.gif";
import "./similarProducts.scss";
import errorHandlingStyles from "../../Home/PopularProducts/popularProducts.module.scss";
import "./similarProducts.scss";

interface SimilarProductsProps {
  excludeProductTitle?: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  excludeProductTitle,
}) => {
  const [popularProducts, setPopularProducts] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    // Fetch popular products from API excluding the current product title
    const fetchPopularProductsFromApi = async () => {
      try {
        const response = await fetchPopularProducts();
        const filteredProducts = response.data.filter(
          (product) => product.title !== excludeProductTitle
        );
        setPopularProducts(filteredProducts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error occurred while fetching popular products.");
      }
    };

    fetchPopularProductsFromApi();
  }, [excludeProductTitle]);

  // Configuration options for the carousel
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of products to show at once
    slidesToScroll: 1,
  };

  return (
    <>
      {isLoading ? (
        // Show loading spinner while data is being fetched
        <div className={errorHandlingStyles.loading}>
          <img src={loading} alt={loading} />
        </div>
      ) : error ? (
        // Show error message if there's an error
        <div className={errorHandlingStyles.error}>
          <p>{error}</p>
          <img src={notFound} alt={notFound} />
        </div>
      ) : (
        // Display similar products carousel when data is available
        <div className="slider-container">
          <h2>You might also like</h2>
          <Slider ref={sliderRef} {...settings}>
            {popularProducts.map((product) => (
              <div className="items" key={product.title}>
                <li>
                  <Link
                    to={`/popular-products/${encodeURIComponent(
                      product.title
                    )}`}
                    className="product-link"
                  >
                    <div key={product.title} className="product-container">
                      <img src={product.image} alt={product.title} />
                      <p>$ {product.price}</p>
                    </div>
                  </Link>
                </li>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default SimilarProducts;
