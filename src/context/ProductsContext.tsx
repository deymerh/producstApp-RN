import React, { createContext, useEffect, useState } from 'react';

import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';

interface ProductsContexProps {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (category: string, productName: string) => Promise<void>;
  updateProduct: (category: string, productName: string, idProduct: string) => Promise<void>;
  loadProductById: (idProduct: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; //TODO: change type any
}

interface ProductsContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const ProductsContext = createContext({} as ProductsContexProps);

export const ProductsContextProvider = ({ children }: ProductsContextProviderProps) => {
  const [products, setProducts] = useState<Producto[]>([]);
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
    setProducts([...resp.data.productos]);
  }
  const addProduct = async (category: string, productName: string) => { }
  const updateProduct = async (category: string, productName: string, idProduct: string) => { }
  const loadProductById = async (idProduct: string) => {
    throw new Error('Not implement');
  }
  const uploadImage = async (data: any, id: string) => { } //TODO: change type any
  return (
    <ProductsContext.Provider value={{
      products,
      loadProducts,
      addProduct,
      updateProduct,
      loadProductById,
      uploadImage
    }}>
      {children}
    </ProductsContext.Provider>
  )
}