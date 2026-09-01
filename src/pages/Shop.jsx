import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import './Shop.css';

const Shop = () => {
  const { products } = useProducts();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('featured');

  let filteredProducts = filter === 'All'
    ? [...products]
    : products.filter(p => p.category === filter);

  switch (sort) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'new':
      filteredProducts.reverse();
      break;
    default:
      break;
  }

  return (
    <div className="shop page-container">
      <div className="container">
        <div className="shop-header text-center">
          <h1>Ready-to-Wear Collection</h1>
          <p>Explore our exclusive, in-house designed occasion wear.</p>
        </div>

        <div className="shop-layout">
          <aside className="shop-sidebar">
            <div className="filter-group">
              <h3>Category</h3>
              <ul>
                {['All', 'Statement', 'Premium', 'Accessible'].map(cat => (
                  <li key={cat}>
                    <button
                      className={`filter-btn ${filter === cat ? 'active' : ''}`}
                      onClick={() => setFilter(cat)}
                    >
                      {cat === 'All' ? 'All Collections' : cat === 'Accessible' ? 'Accessible Luxury' : cat === 'Statement' ? 'Statement Pieces' : cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="shop-main">
            <div className="shop-toolbar flex justify-between items-center mb-md">
              <span>{filteredProducts.length} Results</span>
              <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="new">New Arrivals</option>
              </select>
            </div>

            <div className="grid shop-grid gap-md">
              {filteredProducts.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
