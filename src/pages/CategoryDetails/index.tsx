import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loading from "../../assets/loading.gif";
import notFound from "../../assets/notfound.gif";
import { fetchProductDetails, ProductDetails } from "../../api";
import "../PopularProductsDetails/index.scss";

const CategoryDetails: React.FC = () => {
  const { productTitle } = useParams<{ productTitle: string }>();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [productAmount, setProductAmount] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetails]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetchProductDetails(productTitle);
        setProductDetails(response.data);
        setIsLoading(false);
        setError("");

        if (response.data && response.data.description) {
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
    setProductAmount(productAmount + 1);
  };

  const remove = () => {
    if (productAmount > 0) {
      setProductAmount(productAmount - 1);
    }
  };

  return (
    <>
      <>
        {isLoading ? (
          <div className="loading">
            <img src={loading} alt={loading} />
          </div>
        ) : error || !productDetails ? (
          <div className="error">
            <p>{error || "Product details not found."}</p>
            <img src={notFound} alt={notFound} />
          </div>
        ) : (
          <>
            <div className="container">
              <img src={productDetails.image} alt={productDetails.title} />

              <div className="product-info">
                <h1> {productDetails.title}</h1>
                <p> {productDetails.description}</p>
                <h1> $ {productDetails.price}</h1>

                <div className="button-container">
                  <button onClick={remove}>-</button>
                  <p>{productAmount}</p>
                  <button onClick={add}>+</button>
                </div>
                <button className="addToCart">
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
    </>
  );
};

export default CategoryDetails;
