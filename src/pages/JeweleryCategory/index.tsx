import { useEffect, useState } from "react";
import { fetchJeweleryCategory, JeweleryCategoryData } from "../../api";
import loading from "../../assets/loading.gif";
import notFound from "../../assets/notfound.gif";

const JeweleryCategory = () => {
  const [jeweleryCategory, setJeweleryCategory] = useState<
    JeweleryCategoryData[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchJeweleryCategoryFromApi = async () => {
      try {
        const response = await fetchJeweleryCategory();
        setJeweleryCategory(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error occurred while fetching Jewelery Category products.");
      }
    };
    fetchJeweleryCategoryFromApi();
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
          {jeweleryCategory.map((product) => (
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

export default JeweleryCategory;
