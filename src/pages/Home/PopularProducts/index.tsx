import { useEffect, useState } from "react";
import { fetchPopularProducts, CategoryData } from "../../../api";
import { Link } from "react-router-dom";
import eye from "../../../assets/icons8-eye-30.png";
import star from "../../../assets/glowing-star.png";
import comingSoon from "../../../assets/coming soon.gif";
import loading from "../../../assets/loading.gif";
import notFound from "../../../assets/notfound.gif";
import styles from "./popularProducts.module.scss";

const PopularProductList: React.FC = () => {
  const [popularProducts, setPopularProducts] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

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

  return (
    <>
      {isLoading ? (
        <div className={styles.loading}>
          <img src={loading} alt={loading} />
        </div>
      ) : error ? (
        <div className={styles.error}>
          <p>{error}</p>
          <img src={notFound} alt={notFound} />
        </div>
      ) : (
        <>
          <div className={styles.productWrapper}>
            <h1>
              <mark>POPULAR PRODUCTS</mark>
            </h1>
            <ul>
              {popularProducts.map((product) => (
                <li key={product.title}>
                  <Link
                    to={`/popular-products/${encodeURIComponent(
                      product.title
                    )}`}
                    className={styles.productLink}
                  >
                    <div className={styles.productContainer}>
                      <div className={styles.imageWrapper}>
                        <img src={product.image} alt={product.title} />
                      </div>
                      <div className={styles.productInfo}>
                        <p>{product.title}</p>
                        <p>$ {product.price}</p>
                      </div>
                    </div>
                    <div className={styles.ratingInfo}>
                      <img src={star} alt={star} />
                      {product.rating.rate}
                    </div>
                    <button className={styles.buttonOverlay}>
                      <img src={eye} alt={eye} /> Quick view
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div>
        <img src={comingSoon} alt={comingSoon} className={styles.comingSoon} />
      </div>
    </>
  );
};

export default PopularProductList;
