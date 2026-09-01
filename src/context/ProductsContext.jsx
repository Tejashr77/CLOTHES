import React, { createContext, useContext } from 'react';

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

const ALL_PRODUCTS = [
  { id: '1', name: 'Midnight Velvet Gown', price: 45000, category: 'Statement', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800', scarcity: 'Only 2 left in size M', description: 'A floor-length velvet gown in deep midnight blue. Perfect for galas and formal events. Features a sweetheart neckline and a subtle train.', sizes: ['XS', 'S', 'M', 'L'] },
  { id: '2', name: 'Ivory Silk Suit', price: 32000, category: 'Premium', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800', isPreorder: true, description: 'A tailored two-piece silk suit in ivory. Includes a structured blazer and high-waisted trousers. Available for pre-order.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: '3', name: 'Emerald Embellished Dress', price: 55000, category: 'Statement', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800', description: 'Hand-embellished emerald green cocktail dress with intricate beadwork. A true statement piece for special occasions.', sizes: ['XS', 'S', 'M'] },
  { id: '4', name: 'Ruby Red Chiffon Gown', price: 62000, category: 'Statement', image: 'https://images.unsplash.com/photo-1566150908104-58686d06be36?auto=format&fit=crop&q=80&w=800', scarcity: 'Selling Fast!', description: 'A flowing chiffon gown in rich ruby red. Draped bodice with a dramatic thigh-high slit. Ideal for red carpet moments.', sizes: ['XS', 'S', 'M', 'L'] },
  { id: '5', name: 'Vibrant Fuchsia Maxi', price: 28000, category: 'Accessible', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800', description: 'A bold fuchsia maxi dress with a relaxed silhouette. Lightweight and perfect for summer events and garden parties.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: '6', name: 'Gold Pleated Midi', price: 22000, category: 'Accessible', image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?auto=format&fit=crop&q=80&w=800', description: 'A shimmering gold pleated midi skirt. Versatile enough for day-to-night styling. Pair with a blouse or crop top.', sizes: ['XS', 'S', 'M', 'L'] },
  { id: '7', name: 'Royal Blue Corset', price: 34000, category: 'Premium', image: 'https://images.unsplash.com/photo-1582533561751-0c58a6cb9378?auto=format&fit=crop&q=80&w=800', isPreorder: true, description: 'A structured royal blue corset with boning and lace-up back. Available for pre-order. Pair with the matching skirt or high-waisted denim.', sizes: ['XS', 'S', 'M', 'L'] },
  { id: '8', name: 'Coral Sunset Dress', price: 19500, category: 'Accessible', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', description: 'A breezy coral-toned dress with a flattering wrap silhouette. Perfect for brunch dates and sunset soirées.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: '9', name: 'Lavender Tulle Skirt', price: 21000, category: 'Accessible', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', scarcity: 'Only 1 left!', description: 'A dreamy lavender tulle midi skirt. Layers of soft tulle create a romantic, ethereal silhouette.', sizes: ['XS', 'S', 'M'] },
];

export const ProductsProvider = ({ children }) => {
  const getProductById = (id) => ALL_PRODUCTS.find(p => p.id === id);
  const getProductsByCategory = (category) =>
    category === 'All' ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.category === category);

  return (
    <ProductsContext.Provider value={{ products: ALL_PRODUCTS, getProductById, getProductsByCategory }}>
      {children}
    </ProductsContext.Provider>
  );
};
