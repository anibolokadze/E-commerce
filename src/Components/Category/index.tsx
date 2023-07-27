import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import Filter from "../../Components/Filter";
import loading from "../../assets/loading.gif";
import notFound from "../../assets/notfound.gif";
import eye from "../../assets/icons8-eye-30.png";
import star from "../../assets/glowing-star.png";
import { Link } from "react-router-dom";
import "./index.scss";

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

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetchData();
        setCategoryData(response.data);
        setFilteredData(response.data);
        setIsLoading(false);

        // Calculate the min and max prices from the fetched data
        const prices = response.data.map((product) =>
          parseFloat(product.price)
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
        parseFloat(product.price) >= min && parseFloat(product.price) <= max
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
          <Filter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onSort={handleSortByRating}
            onFilter={handleFilterByPrice}
          />

          {message ? (
            <div className="error">
              <p>{message}</p>
              <img src={notFound} alt={notFound} />
            </div>
          ) : (
            <ul>
              {filteredData.map((product) => (
                <li key={product.title}>
                  <Link
                    to={`/product-details/${encodeURIComponent(product.title)}`}
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
          )}
        </>
      )}
    </>
  );
};

export default CategoryPage;