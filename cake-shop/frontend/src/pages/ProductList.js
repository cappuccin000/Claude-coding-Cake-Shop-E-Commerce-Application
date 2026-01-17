import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { productService } from '../apiService';
import { cartActions } from '../store';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const categories = ['All', 'Chocolate', 'Fruit', 'Classic', 'Citrus', 'Specialty'];

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const category = searchParams.get('category');
      let response;
      
      if (category) {
        response = await productService.getProductsByCategory(category);
      } else {
        response = await productService.getAllProducts();
      }
      
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        setLoading(true);
        const response = await productService.searchProducts(searchQuery);
        setProducts(response.data);
      } catch (error) {
        toast.error('Search failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    
    try {
      setLoading(true);
      let response;
      if (category === 'All') {
        response = await productService.getAllProducts();
      } else {
        response = await productService.getProductsByCategory(category);
      }
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to filter products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(cartActions.addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="product-list container">
      <h1>Our Delicious Cakes</h1>
      
      <div className="filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search cakes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat || (cat === 'All' && !selectedCategory) ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="no-products">No products found</div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="price">${product.price}</span>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.available}
                  >
                    {product.available ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;