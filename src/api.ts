import axios, { AxiosResponse } from 'axios';

export interface PopularProduct {
  category: string;
  title: string;
  price: number | string;
  rating: {
    rate: number;
  };
  image: string
}

export const fetchPopularProducts = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get<PopularProduct[]>('https://fakestoreapi.com/products');
    const filteredProducts = response.data
      .filter((product) => product.category !== 'electronics')
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 6);
    return { ...response, data: filteredProducts };
  } catch (error) {
    throw new Error(error);
  }
};




// import axios, { AxiosResponse } from 'axios';

// interface Product {
//   id: number;
//   title: string;
//   // Add other properties of the product if available in the API response
// }

// export const fetchProducts = async (): Promise<AxiosResponse<Product[]>> => {
//   try {
//     const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
//     const filteredProducts = response.data.filter((product) => product.category !== 'electronics');
//     return { ...response, data: filteredProducts };
//   } catch (error) {
//     throw new Error(error);
//   }
// };

