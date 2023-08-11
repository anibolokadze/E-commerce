import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import Filter from "./Filter";
import loading from "../assets/loading.gif";
import notFound from "../assets/notfound.gif";
import eye from "../assets/icons8-eye-30.png";
import star from "../assets/glowing-star.png";
import { Link } from "react-router-dom";
import errorHandlingStyles from "../pages/Home/PopularProducts/popularProducts.module.scss";
import styles from "./styles/category.module.scss";

// Interfaces for CategoryData and CategoryProps
interface CategoryData {
  rating: {
    rate: number;
  };
  description: string;
  category: string;
  title: string;
  price: number | string;
  image: string;
}

interface CategoryProps {
  fetchData: () => Promise<AxiosResponse<CategoryData[]>>;
  title: string;
  noItemsMessage: string;
}

const CategoryPage: React.FC<CategoryProps> = ({
  fetchData,
  title,
  noItemsMessage,
}) => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [filteredData, setFilteredData] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(12000);
  const [message, setMessage] = useState<string>("");

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetchData();
        setCategoryData(response.data);
        setFilteredData(response.data);
        setIsLoading(false);

        // Calculate the min and max prices from the fetched data
        const prices = response.data.map((product) =>
          parseFloat(product.price.toString())
        );
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
      } catch (error) {
        setIsLoading(false);
        setError(`Error occurred while fetching ${title} Category products.`);
      }
    };
    fetchDataFromApi();
  }, [title, fetchData]);

  const handleSortByRating = (descending: boolean) => {
    setFilteredData((prevData) => {
      // Sort the data by rating
      const sortedData = [...prevData].sort((a, b) => {
        if (descending) {
          return b.rating.rate - a.rating.rate;
        } else {
          return a.rating.rate - b.rating.rate;
        }
      });
      return sortedData;
    });
  };

  const handleFilterByPrice = (min: number, max: number) => {
    // Filter the data by price
    const filteredData = categoryData.filter(
      (product) =>
        parseFloat(product.price.toString()) >= min &&
        parseFloat(product.price.toString()) <= max
    );

    if (filteredData.length === 0) {
      setFilteredData([]);
      setMessage(noItemsMessage);
    } else {
      setFilteredData(filteredData);
      setMessage("");
    }
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
        <>
          <Filter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onSort={handleSortByRating}
            onFilter={handleFilterByPrice}
          />

          {message ? (
            <div className={errorHandlingStyles.error}>
              <p>{message}</p>
              <img src={notFound} alt={notFound} />
            </div>
          ) : (
            <ul>
              {filteredData.map((product) => (
                <li key={product.title}>
                  <Link
                    to={`/category-details/${encodeURIComponent(
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
          )}
        </>
      )}
    </>
  );
};

export default CategoryPage;
