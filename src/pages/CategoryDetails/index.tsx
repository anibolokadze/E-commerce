import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import loading from "../../assets/loading.gif";
import notFound from "../../assets/notfound.gif";
import { fetchProductDetails, ProductDetails } from "../../api";
import styles from "../PopularProductsDetails/popularProducts.module.scss";
import errorHandlingStyles from "../Home/PopularProducts/popularProducts.module.scss";
import { useCart } from "../../context/CartContext";

const CategoryDetails: React.FC = () => {
  const { productTitle } = useParams<{ productTitle: string }>();
  const { addToCart } = useCart(); // Access the cart items and addToCart function from the context
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [productAmount, setProductAmount] = useState<number>(1);

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
        setProductAmount(1);
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
    // Decrease the product amount when the "-" button is clicked (minimum 1)
    if (productAmount > 1) {
      setProductAmount(productAmount - 1);
    }
  };

  const addToCartWithQuantity = () => {
    // Add the product to the cart with the specified quantity
    addToCart({
      id: productDetails.id,
      title: productDetails.title,
      quantity: productAmount,
    });

    // Show a success message when the item is added to the cart
    setMessage("Added to shopping cart");
    setTimeout(() => {
      setMessage("");
    }, 1000);
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
          {message && (
            <div className={styles.shoppingCartMessage}>{message}</div>
          )}
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
              <button
                onClick={addToCartWithQuantity}
                className={styles.addToCart}
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMy41IDIxYy0uMjc2IDAtLjUtLjIyNC0uNS0uNXMuMjI0LS41LjUtLjUuNS4yMjQuNS41LS4yMjQuNS0uNS41bTAtMmMtLjgyOCAwLTEuNS42NzItMS41IDEuNXMuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjUtLjY3Mi0xLjUtMS41LTEuNW0tNiAyYy0uMjc2IDAtLjUtLjIyNC0uNS0uNXMuMjI0LS41LjUtLjUuNS4yMjQuNS41LS4yMjQuNS0uNS41bTAtMmMtLjgyOCAwLTEuNS42NzItMS41IDEuNXMuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjUtLjY3Mi0xLjUtMS41LTEuNW0xNi41LTE2aC0yLjk2NGwtMy42NDIgMTVoLTEzLjMyMWwtNC4wNzMtMTMuMDAzaDE5LjUyMmwuNzI4LTIuOTk3aDMuNzV2MXptLTIyLjU4MSAyLjk5N2wzLjM5MyAxMS4wMDNoMTEuNzk0bDIuNjc0LTExLjAwM2gtMTcuODYxeiIvPjwvc3ZnPg=="
                  alt="shopping-cart"
                />
                Add to cart
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CategoryDetails;
