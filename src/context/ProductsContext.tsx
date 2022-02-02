import React, { createContext, useEffect, useState } from 'react';

import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';

interface ProductsContexProps {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (category: string, productName: string) => Promise<Producto>;
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
  const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
    console.log('addProduct: ', { categoryId, productName });
    const resp = await cafeApi.post<Producto>('/productos', { categoria: categoryId, nombre: productName });
    setProducts([...products, resp.data]);
    return resp.data
  }
  const updateProduct = async (categoryId: string, productName: string, idProduct: string) => {
    console.log('updateProduct: ', { categoryId, productName, idProduct });
    const resp = await cafeApi.put<Producto>(`/productos/${idProduct}`, { categoria: categoryId, nombre: productName });
    setProducts(products.map(product => (product._id === idProduct) ? resp.data : product));
  }

  const loadProductById = async (idProduct: string): Promise<Producto> => {
    const resp = await cafeApi.get<Producto>(`/productos/${idProduct}`);
    return resp.data;
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