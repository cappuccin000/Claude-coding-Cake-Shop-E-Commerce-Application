import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../store';
import { FaTrash } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(cartActions.updateQuantity({ id, quantity }));
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-empty container">
        <h2>Your cart is empty</h2>
        <p>Add some delicious cakes to get started!</p>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>
              
              <div className="quantity-controls">
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                <p>${item.totalPrice.toFixed(2)}</p>
              </div>
              
              <button 
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal ({cart.totalQuantity} items)</span>
            <span>${cart.totalAmount.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>${(cart.totalAmount + 5).toFixed(2)}</span>
          </div>
          
          <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;