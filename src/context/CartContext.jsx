import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/client';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('zaqueen-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSynced, setIsSynced] = useState(false);

  // Sync with localStorage for guest users
  useEffect(() => {
    if (!isSynced) {
      localStorage.setItem('zaqueen-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isSynced]);

  const loadServerCart = useCallback(async () => {
    try {
      const cart = await api.getCart();
      setCartItems(cart.items.map(i => ({
        ...i.product,
        quantity: i.quantity,
        selectedSize: i.selectedSize,
      })));
      setIsSynced(true);
    } catch { /* guest user */ }
  }, []);

  const addToCart = useCallback(async (product, quantity = 1, selectedSize = null) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize
      );
      let updated;
      if (existingIndex >= 0) {
        updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + quantity };
      } else {
        updated = [...prev, { ...product, quantity, selectedSize }];
      }
      return updated;
    });

    try {
      await api.addToCart({ productId: product.id, quantity, selectedSize });
    } catch { /* guest — localStorage is enough */ }
  }, []);

  const removeFromCart = useCallback(async (productId, selectedSize = null) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.selectedSize === selectedSize)));
    try { await api.removeFromCart(productId, selectedSize); } catch {}
  }, []);

  const updateQuantity = useCallback(async (productId, selectedSize, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.selectedSize === selectedSize ? { ...item, quantity } : item
      )
    );
    try { await api.updateCartItem(productId, selectedSize, quantity); } catch {}
  }, [removeFromCart]);

  const clearCart = useCallback(async () => {
    setCartItems([]);
    try { await api.clearCart(); } catch {}
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      cartCount, cartTotal, loadServerCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
