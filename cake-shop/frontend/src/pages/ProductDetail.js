import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { productService } from '../apiService';
import { cartActions } from '../store';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      toast.error('Failed to load product');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(cartActions.addToCart(product));
    }
    toast.success(`${quantity} ${product.name}(s) added to cart!`);
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail container">
      <button className="btn btn-secondary back-btn" onClick={() => navigate('/products')}>
        ← Back to Products
      </button>
      
      <div className="detail-content">
        <div className="detail-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        
        <div className="detail-info">
          <h1>{product.name}</h1>
          <div className="category-badge">{product.category}</div>
          
          <p className="description">{product.description}</p>
          
          <div className="price-section">
            <span className="price">${product.price}</span>
          </div>
          
          <div className="stock-info">
            {product.available ? (
              <span className="in-stock">✓ In Stock ({product.stockQuantity} available)</span>
            ) : (
              <span className="out-of-stock">✗ Out of Stock</span>
            )}
          </div>
          
          {product.available && (
            <div className="purchase-section">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max={product.stockQuantity}
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                className="btn btn-primary add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;