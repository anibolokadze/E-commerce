import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPopularProducts, PopularProduct } from "../api";
import loading from "../assets/loading.gif";
import notFound from "../assets/notfound.gif";

const ProductDetailsPage: React.FC = () => {
  const { productTitle } = useParams<{ productTitle: string }>();
  const [product, setProduct] = useState<PopularProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetchPopularProducts();
        const products = response.data;
        const selectedProduct = products.find(
          (product) => product.title === productTitle
        );
        if (selectedProduct) {
          setProduct(selectedProduct);
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
      <h1>Product Details</h1>
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
          <p>Product Title: {product.title}</p>
          <img src={product.image} alt={product.title} />
          <p>Price: $ {product.price}</p>
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
