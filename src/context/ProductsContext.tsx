import React, { createContext, useEffect, useState } from 'react';

import { ImagePickerResponse } from 'react-native-image-picker';

import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';

interface ProductsContexProps {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (category: string, productName: string) => Promise<Producto>;
  updateProduct: (category: string, productName: string, idProduct: string) => Promise<void>;
  // deleteProduct: (idProduct: string) => Promise<void>;
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
    const resp = await cafeApi.post<Producto>('/productos', { categoria: categoryId, nombre: productName });
    setProducts([...products, resp.data]);
    return resp.data
  }
  const updateProduct = async (categoryId: string, productName: string, idProduct: string) => {
    const resp = await cafeApi.put<Producto>(`/productos/${idProduct}`, { categoria: categoryId, nombre: productName });
    setProducts(products.map(product => (product._id === idProduct) ? resp.data : product));
  }

  const loadProductById = async (idProduct: string): Promise<Producto> => {
    const resp = await cafeApi.get<Producto>(`/productos/${idProduct}`);
    return resp.data;
  }
  // const deleteProduct = (idProduct: string)=>{}
  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    console.log('---DATA---', data);
    const fileToUpload = {
      uri: data.assets![0].uri,
      type: data.assets![0].type,
      name: data.assets![0].fileName,
    }
    console.log('---fileToUpload---', fileToUpload);
    const formData = new FormData();
    formData.append('archivo', fileToUpload);
    console.log('---formData---', formData);
    try {
      const resp = await cafeApi.put(`/uploads/productos/${id}`, { formData });
      console.log('RESPUESTA DE LA GRABADA DE LA IMAGEN', resp);
    } catch (error) {
      console.log('_ERROR_ DE LA GRABADA DE LA IMAGEN', { error });
    }
  }
  return (
    <ProductsContext.Provider value={{
      products,
      loadProducts,
      addProduct,
      updateProduct,
      loadProductById,
      uploadImage,
      // deleteProduct
    }}>
      {children}
    </ProductsContext.Provider>
  )
}