import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import loading from "../../assets/loading.gif";
import notFound from "../../assets/notfound.gif";
import { fetchProductDetails, ProductDetails } from "../../api";
import styles from "../PopularProductsDetails/popularProducts.module.scss";
import errorHandlingStyles from "../Home/PopularProducts/popularProducts.module.scss";

const CategoryDetails: React.FC = () => {
  const { productTitle } = useParams<{ productTitle: string }>();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [productAmount, setProductAmount] = useState<number>(0);

  // Scroll to the top of the page when productDetails state changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetails]);

  useEffect(() => {
    // Fetch product details from API when component mounts or productTitle changes
    const fetchDataFromApi = async () => {
      try {
        const response = await fetchProductDetails(productTitle);
        setProductDetails(response.data);
        setIsLoading(false);
        setError("");

        if (response.data && response.data.description) {
          // Limit the description to the first 30 words
          const maxDescriptionWords = response.data.description
            .split(" ")
            .slice(0, 30)
            .join(" ");
          response.data.description = maxDescriptionWords;
        }

        setProductDetails(response.data);
        setProductAmount(0);
      } catch (error) {
        setIsLoading(false);
        setError("Product details not found.");
      }
    };
    fetchDataFromApi();
  }, [productTitle]);

  const add = () => {
    // Increase the product amount when the "+" button is clicked
    setProductAmount(productAmount + 1);
  };

  const remove = () => {
    // Decrease the product amount when the "-" button is clicked (minimum 0)
    if (productAmount > 0) {
      setProductAmount(productAmount - 1);
    }
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "white",
          padding: "10px",
          margin: "0 50px",
          display: "flex",
          alignItems: "center",
          columnGap: "5px",
        }}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAoklEQVR4nO2UMQrCQBBFXymYQltPkEsEjyJCcgYtvZCkTxpbPYG2uYCF6ScsjLBYqGT9TfDBVDv8BzPDwp9EDupwU4ebOtzU4RZVD1yBGtgCy18L7KXuwB6YpUqezIEcKIEmer8AKwRLLnxkoadLkbxjAZy87zx2XJ8Iy765ZIeIdbT4Udf1Da1LNoioXHBUCXIXhMuSkLnggRBT/sDTEEyQAQmtQeNuMnblAAAAAElFTkSuQmCC" />
        Go Back
      </button>

      {isLoading ? (
        // Show loading spinner while data is being fetched
        <div className={errorHandlingStyles.loading}>
          <img src={loading} alt={loading} />
        </div>
      ) : error || !productDetails ? (
        // Show error message if there's an error or no product details found
        <div className={errorHandlingStyles.error}>
          <p>{error || "Product details not found."}</p>
          <img src={notFound} alt={notFound} />
        </div>
      ) : (
        // Display product details when data is available
        <>
          <div className={styles.container}>
            <img src={productDetails.image} alt={productDetails.title} />

            <div className={styles.productInfo}>
              <h1> {productDetails.title}</h1>
              <p> {productDetails.description}</p>
              <h1> $ {productDetails.price}</h1>

              <div className={styles.buttonContainer}>
                <button onClick={remove}>-</button>
                <p>{productAmount}</p>
                <button onClick={add}>+</button>
              </div>
              <Link to="/shopping-cart">
                <button className={styles.addToCart}>
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMy41IDIxYy0uMjc2IDAtLjUtLjIyNC0uNS0uNXMuMjI0LS41LjUtLjUuNS4yMjQuNS41LS4yMjQuNS0uNS41bTAtMmMtLjgyOCAwLTEuNS42NzItMS41IDEuNXMuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjUtLjY3Mi0xLjUtMS41LTEuNW0tNiAyYy0uMjc2IDAtLjUtLjIyNC0uNS0uNXMuMjI0LS41LjUtLjUuNS4yMjQuNS41LS4yMjQuNS0uNS41bTAtMmMtLjgyOCAwLTEuNS42NzItMS41IDEuNXMuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjUtLjY3Mi0xLjUtMS41LTEuNW0xNi41LTE2aC0yLjk2NGwtMy42NDIgMTVoLTEzLjMyMWwtNC4wNzMtMTMuMDAzaDE5LjUyMmwuNzI4LTIuOTk3aDMuNzV2MXptLTIyLjU4MSAyLjk5N2wzLjM5MyAxMS4wMDNoMTEuNzk0bDIuNjc0LTExLjAwM2gtMTcuODYxeiIvPjwvc3ZnPg=="
                    alt="shopping-cart"
                  />
                  Add to cart
                </button>
              </Link>
              <button className={styles.addToWishList}>
                <svg
                  fill="#000000"
                  height="200px"
                  width="200px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 471.701 471.701"
                  xmlSpace="preserve"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CategoryDetails;
