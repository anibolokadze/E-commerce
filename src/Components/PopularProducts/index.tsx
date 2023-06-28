import React, { useEffect, useState } from "react";
import { fetchPopularProducts, PopularProduct } from "../../api";

const ProductList: React.FC = () => {
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);

  useEffect(() => {
    const fetchPopularProductsFromApi = async () => {
      try {
        const response = await fetchPopularProducts();
        console.log(response);
        setPopularProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularProductsFromApi();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {popularProducts.map((product) => (
          <li key={product.title}>
            <div>Category: {product.category}</div>
            <div>Title: {product.title}</div>
            <div>Price: {product.price}</div>
            <div>Rating: {product.rating.rate}</div>
            <img src={product.image} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
