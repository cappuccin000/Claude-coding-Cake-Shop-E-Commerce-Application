import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderService } from '../apiService';
import './Checkout.css';

const Checkout = () => {
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    paymentMethod: 'card'
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    try {
      setLoading(true);
      
      const orderRequest = {
        ...formData,
        items: cart.items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };
      
      const response = await orderService.createOrder(orderRequest);
      
      toast.success('Order created successfully!');
      navigate('/payment', { 
        state: { 
          orderId: response.data.id,
          totalAmount: response.data.totalAmount,
          paymentMethod: formData.paymentMethod
        } 
      });
      
    } catch (error) {
      toast.error(error.response?.data || 'Failed to create order');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="checkout-empty container">
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Shipping Address *</label>
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Payment Method *</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="card">Credit/Debit Card</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Continue to Payment'}
            </button>
          </form>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-items">
            {cart.items.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} × {item.quantity}</span>
                <span>${item.totalPrice.toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;