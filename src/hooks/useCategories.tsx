import { useEffect, useRef, useState } from 'react';
import cafeApi from '../api/cafeApi';
import { CategoriesResponse, Categoria } from '../interfaces/appInterfaces';

export const useCategories = () => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  useEffect(() => {
    if (!isMounted.current) return;
    getCategories();
  }, []);
  const getCategories = async () => {
    const resp = await cafeApi.get<CategoriesResponse>('/categorias');
    setCategories(resp.data.categorias);
    setIsLoading(false);
  }
  return {
    isLoading,
    categories
  };
};
