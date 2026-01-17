import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categories = [
    { name: 'Chocolate', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
    { name: 'Fruit', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400' },
    { name: 'Classic', image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400' },
    { name: 'Specialty', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Sweet Delights</h1>
          <p>Handcrafted cakes made with love and the finest ingredients</p>
          <Link to="/products" className="btn btn-primary btn-large">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="categories container">
        <h2>Browse by Category</h2>
        <div className="category-grid">
          {categories.map(category => (
            <Link 
              key={category.name}
              to={`/products?category=${category.name}`}
              className="category-card"
            >
              <img src={category.image} alt={category.name} />
              <div className="category-overlay">
                <h3>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="features container">
        <div className="feature">
          <h3>🎂 Fresh Daily</h3>
          <p>All our cakes are baked fresh every day</p>
        </div>
        <div className="feature">
          <h3>🚚 Fast Delivery</h3>
          <p>Same-day delivery available</p>
        </div>
        <div className="feature">
          <h3>💝 Custom Orders</h3>
          <p>We create custom cakes for your special occasions</p>
        </div>
      </section>
    </div>
  );
};

export default Home;