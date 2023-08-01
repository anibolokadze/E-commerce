import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPopularProducts, CategoryData } from "../../api";
import SimilarProducts from "./SimilarProducts";
import loading from "../../assets/loading.gif";
import notFound from "../../assets/notfound.gif";
import errorHandlingStyles from "../Home/PopularProducts/popularProducts.module.scss";
import styles from "./popularProducts.module.scss";

const ProductDetailsPage: React.FC = () => {
  const { productTitle } = useParams<{ productTitle: string }>();
  const [product, setProduct] = useState<CategoryData>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [productAmount, setProductAmount] = useState<number>(0);

  const add = () => {
    setProductAmount(productAmount + 1);
  };

  const remove = () => {
    if (productAmount > 0) {
      setProductAmount(productAmount - 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetchPopularProducts();
        const products = response.data;
        const selectedProduct = products.find(
          (product) => product.title === productTitle
        );
        if (selectedProduct) {
          const maxDescriptionWords = selectedProduct.description
            .split(" ")
            .slice(0, 30)
            .join(" ");
          selectedProduct.description = maxDescriptionWords;
          setProduct(selectedProduct);
          setProductAmount(0);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error occurred while fetching popular products.");
      }
    };

    fetchProductDetails();
  }, [productTitle]);

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
        <div className={styles.container}>
          <img src={product.image} alt={product.title} />

          <div className={styles.productInfo}>
            <h1> {product.title}</h1>
            <p> {product.description}</p>
            <h1> $ {product.price}</h1>

            <div className={styles.buttonContainer}>
              <button onClick={remove}>-</button>
              <p>{productAmount}</p>
              <button onClick={add}>+</button>
            </div>
            <button className={styles.addToCart}>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMy41IDIxYy0uMjc2IDAtLjUtLjIyNC0uNS0uNXMuMjI0LS41LjUtLjUuNS4yMjQuNS41LS4yMjQuNS0uNS41bTAtMmMtLjgyOCAwLTEuNS42NzItMS41IDEuNXMuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjUtLjY3Mi0xLjUtMS41LTEuNW0tNiAyYy0uMjc2IDAtLjUtLjIyNC0uNS0uNXMuMjI0LS41LjUtLjUuNS4yMjQuNS41LS4yMjQuNS0uNS41bTAtMmMtLjgyOCAwLTEuNS42NzItMS41IDEuNXMuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjUtLjY3Mi0xLjUtMS41LTEuNW0xNi41LTE2aC0yLjk2NGwtMy42NDIgMTVoLTEzLjMyMWwtNC4wNzMtMTMuMDAzaDE5LjUyMmwuNzI4LTIuOTk3aDMuNzV2MXptLTIyLjU4MSAyLjk5N2wzLjM5MyAxMS4wMDNoMTEuNzk0bDIuNjc0LTExLjAwM2gtMTcuODYxeiIvPjwvc3ZnPg=="
                alt="shopping-cart"
              />
              Add to cart
            </button>
          </div>
        </div>
      )}
      <SimilarProducts excludeProductTitle={product?.title} />
    </>
  );
};

export default ProductDetailsPage;
