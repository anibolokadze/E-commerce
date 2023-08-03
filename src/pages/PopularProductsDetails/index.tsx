import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPopularProducts, CategoryData } from "../../api";
import SimilarProducts from "./SimilarProducts";
import loading from "../../assets/loading.gif";
import notFound from "../../assets/notfound.gif";
import errorHandlingStyles from "../Home/PopularProducts/popularProducts.module.scss";
import styles from "./popularProducts.module.scss";
import { useCart } from "../../context/CartContext";

const ProductDetailsPage: React.FC = () => {
  const { productTitle } = useParams<{ productTitle: string }>();
  const { addToCart } = useCart(); // Access the cart items and addToCart function from the context

  const [product, setProduct] = useState<CategoryData>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [productAmount, setProductAmount] = useState<number>(1);

  useEffect(() => {
    // Scroll to the top of the page when product details change
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    // Fetch product details from API when component mounts or productTitle changes
    const fetchProductDetails = async () => {
      try {
        const response = await fetchPopularProducts();
        const products = response.data;
        const selectedProduct = products.find(
          (product) => product.title === productTitle
        );
        if (selectedProduct) {
          // Limit the description to the first 30 words
          const maxDescriptionWords = selectedProduct.description
            .split(" ")
            .slice(0, 30)
            .join(" ");
          selectedProduct.description = maxDescriptionWords;
          setProduct(selectedProduct);
          setProductAmount(1);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error occurred while fetching popular products.");
      }
    };

    fetchProductDetails();
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
      id: product.id,
      title: product.title,
      quantity: productAmount,
    });

    // Show a success message when the item is added to the cart
    setMessage("Shopping cart has been updated");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <>
      {isLoading ? (
        // Show loading spinner while data is being fetched
        <div className={errorHandlingStyles.loading}>
          <img src={loading} alt={loading} />
        </div>
      ) : error ? (
        // Show error message if there's an error
        <div className={errorHandlingStyles.error}>
          <p>{error}</p>
          <img src={notFound} alt={notFound} />
        </div>
      ) : (
        // Display product details when data is available
        <>
          {message && <div>{message}</div>}

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
      {/* Render the SimilarProducts component passing the excluded product title */}
      <SimilarProducts excludeProductTitle={product?.title} />
    </>
  );
};

export default ProductDetailsPage;
