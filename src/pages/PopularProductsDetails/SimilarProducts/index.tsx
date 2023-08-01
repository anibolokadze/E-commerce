import { useState, useEffect, useRef } from "react";
import { PopularProduct, fetchPopularProducts } from "../../../api";
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
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
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
        <div className={errorHandlingStyles.loading}>
          <img src={loading} alt={loading} />
        </div>
      ) : error ? (
        <div className={errorHandlingStyles.error}>
          <p>{error}</p>
          <img src={notFound} alt={notFound} />
        </div>
      ) : (
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
