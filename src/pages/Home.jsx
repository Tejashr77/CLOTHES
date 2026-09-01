import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import './Home.css';

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container text-center">
          <h2>Your vision. Our couture.</h2>
          <h1 className="hero-title">Designed to reign.</h1>
          <div className="hero-actions flex justify-center gap-md">
            <Link to="/shop">
              <Button variant="primary">Shop RTW</Button>
            </Link>
            <Link to="/bespoke">
              <Button variant="outline" className="btn-hero-outline">Bespoke Couture</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-header text-center mb-lg">
          <h2>Ready-to-Wear</h2>
          <p>Discover our in-house designed occasion and party wear.</p>
        </div>

        <div className="grid featured-grid gap-md">
          {featuredProducts.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-lg">
          <Link to="/shop">
            <Button variant="outline">View All Collection</Button>
          </Link>
        </div>
      </section>

      <section className="bespoke-highlight">
        <div className="container grid bespoke-grid items-center gap-lg">
          <div className="bespoke-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1550614000-4b95d466f20d?auto=format&fit=crop&q=80&w=800"
              alt="Bespoke Couture Process"
              className="bespoke-image"
            />
          </div>
          <div className="bespoke-text">
            <h2>Bespoke Couture</h2>
            <p>Upload your inspiration. Let us craft a made-to-measure masterpiece tailored uniquely to your vision and body.</p>
            <ul className="bespoke-steps">
              <li>1. Upload Inspiration</li>
              <li>2. Guided Measurements</li>
              <li>3. Collaborative Design</li>
              <li>4. Delivered to You</li>
            </ul>
            <Link to="/bespoke">
              <Button variant="primary">Start Your Design</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
