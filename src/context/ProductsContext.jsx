import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts()
      .then(data => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const refreshProducts = async () => {
    const data = await api.getProducts();
    setProducts(data.products || []);
  };

  const getProductById = (id) => products.find(p => p._id === id || p.id === id);

  const getProductsByCategory = (category) =>
    category === 'All' ? products : products.filter(p => p.category === category);

  return (
    <ProductsContext.Provider value={{ products, loading, refreshProducts, getProductById, getProductsByCategory }}>
      {children}
    </ProductsContext.Provider>
  );
};
