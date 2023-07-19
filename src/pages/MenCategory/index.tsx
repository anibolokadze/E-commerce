import { useEffect, useState } from "react";
import { fetchMenCategory, MenCategoryData } from "../../api";
import loading from "../../assets/loading.gif";
import notFound from "../../assets/notfound.gif";
import eye from "../../assets/icons8-eye-30.png";
import "../Home/Components/PopularProducts/index.scss";
import { Link } from "react-router-dom";

const MenCategory = () => {
  const [menCategory, setMenCategory] = useState<MenCategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMenCategoryFromApi = async () => {
      try {
        const response = await fetchMenCategory();
        setMenCategory(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error occurred while fetching Men Category products.");
      }
    };
    fetchMenCategoryFromApi();
  }, []);

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
        <ul>
          {menCategory.map((product) => (
            <li key={product.title}>
              <Link
                to={`/popular-products/${encodeURIComponent(product.title)}`}
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
                <button className="button-overlay">
                  <img src={eye} alt={eye} /> Quick view
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MenCategory;
