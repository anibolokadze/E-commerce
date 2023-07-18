import { useEffect, useState } from "react";
import { fetchMenCategory, MenCategoryData } from "../../api";
import loading from "../../assets/loading.gif";
import notFound from "../../assets/notfound.gif";

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

export default MenCategory;
