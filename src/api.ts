import axios, { AxiosResponse } from 'axios';

export interface PopularProduct {
  description: string;
  category: string;
  title: string;
  price: number | string;
  rating: {
    rate: number;
  };
  image: string;
}

export interface MenCategoryData{
  rating: {
    rate: number;
  };
  description: string;
  category: string;
  title: string;
  price: number | string;
  image: string;
}

export interface WomenCategoryData{
  rating: {
    rate: number;
  };
  description: string;
  category: string;
  title: string;
  price: number | string;
  image: string;
}

export interface JeweleryCategoryData{
  rating: {
    rate: number;
  };
  description: string;
  category: string;
  title: string;
  price: number | string;
  image: string;
}

export const fetchPopularProducts = async (): Promise<AxiosResponse<PopularProduct[]>> => {
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

export const fetchMenCategory = async (): Promise<AxiosResponse<MenCategoryData[]>> => {
  try{
    const response = await axios.get<MenCategoryData[]>('https://fakestoreapi.com/products/category/men\'s clothing');
    return response;
  } catch (error){
    throw new Error(error);
  }
}

export const fetchWomenCategory = async (): Promise<AxiosResponse<WomenCategoryData[]>> => {
  try{
    const response = await axios.get<WomenCategoryData[]>('https://fakestoreapi.com/products/category/women\'s clothing');
    return response;
  } catch (error){
    throw new Error(error);
  }
}

export const fetchJeweleryCategory = async (): Promise<AxiosResponse<JeweleryCategoryData[]>> => {
  try{
    const response = await axios.get<JeweleryCategoryData[]>('https://fakestoreapi.com/products/category/jewelery');
    return response;
  } catch (error){
    throw new Error(error);
  }
}
