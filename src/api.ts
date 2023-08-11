import axios, { AxiosResponse } from 'axios';

export interface CategoryData {
  rating: {
    rate: number;
  };
  id: any;
  description: string;
  category: string;
  title: string;
  price: number | string;
  image: string;
}

export interface ProductDetails {
  find(arg0: (item: any) => boolean): unknown;
  rating: {
    rate: number;
  };
  id: any;
  description: string;
  category: string;
  title: string;
  price: number | string;
  image: string;
}

export const fetchPopularProducts = async (): Promise<AxiosResponse<CategoryData[]>> => {
  try {
    const response = await axios.get<CategoryData[]>('https://fakestoreapi.com/products');
    const filteredProducts = response.data
      .filter((product) => product.category !== 'electronics')
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 6);
      
    return { ...response, data: filteredProducts };
  } catch (error) {
    throw error;
  }
};

export const fetchMenCategory = async (): Promise<AxiosResponse<CategoryData[]>> => {
  try {
    const response = await axios.get<CategoryData[]>('https://fakestoreapi.com/products/category/men\'s clothing');
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchWomenCategory = async (): Promise<AxiosResponse<CategoryData[]>> => {
  try {
    const response = await axios.get<CategoryData[]>('https://fakestoreapi.com/products/category/women\'s clothing');
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchJeweleryCategory = async (): Promise<AxiosResponse<CategoryData[]>> => {
  try {
    const response = await axios.get<CategoryData[]>('https://fakestoreapi.com/products/category/jewelery');
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchProductDetails = async (productTitle: string): Promise<AxiosResponse<ProductDetails>> => {
  try {
    const response = await axios.get<ProductDetails[]>(`https://fakestoreapi.com/products`);
    const product = response.data.find((item) => item.title === productTitle);
    if (product) {
      return { ...response, data: product };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    throw error;
  }
};

