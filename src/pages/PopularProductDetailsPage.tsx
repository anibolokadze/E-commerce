import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPopularProducts, PopularProduct } from "../api";

const ProductDetailsPage: React.FC = () => {
  const { productTitle } = useParams<{ productTitle: string }>();
  const [product, setProduct] = useState<PopularProduct | null>(null);

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
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [productTitle]);

  return (
    <div>
      <h1>Product Details</h1>
      {product ? (
        <>
          <p>Product Title: {product.title}</p>
          <img src={product.image} alt={product.title} />
          <p>Price: $ {product.price}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
