import { useEffect, useState } from "react";
import { fetchWomenCategory, WomenCategoryData } from "../../api";
import loading from "../../assets/loading.gif";
import notFound from "../../assets/notfound.gif";

const WomenCategory = () => {
  const [womenCategory, setWomenCategory] = useState<WomenCategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchWomenCategoryFromApi = async () => {
      try {
        const response = await fetchWomenCategory();
        setWomenCategory(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error occurred while fetching Women Category products.");
      }
    };
    fetchWomenCategoryFromApi();
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
          {womenCategory.map((product) => (
            <li key={product.title}>
              <img src={product.image} alt={product.image} />
              <p>{product.price}</p>
              <p>{product.title}</p>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WomenCategory;
