import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { paymentService } from '../apiService';
import { cartActions } from '../store';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { orderId, totalAmount, paymentMethod } = location.state || {};
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  
  const [loading, setLoading] = useState(false);

  if (!orderId) {
    return (
      <div className="payment-error container">
        <h2>No order found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Return to Shop
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const paymentRequest = {
        amount: totalAmount,
        paymentMethod: paymentMethod,
        orderId: orderId,
        ...paymentData
      };
      
      const response = await paymentService.processPayment(paymentRequest);
      
      if (response.data.status === 'succeeded') {
        toast.success('Payment successful!');
        dispatch(cartActions.clearCart());
        navigate(`/order-confirmation/${orderId}`);
      } else {
        toast.error(response.data.message || 'Payment failed');
      }
      
    } catch (error) {
      toast.error('Payment processing error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (paymentMethod === 'cash') {
    return (
      <div className="payment-page container">
        <div className="payment-card">
          <h1>Cash on Delivery</h1>
          <p className="cod-message">
            Your order has been placed successfully! Please have the exact amount ready when the delivery arrives.
          </p>
          <div className="payment-summary">
            <div className="summary-row">
              <span>Order ID:</span>
              <span>#{orderId}</span>
            </div>
            <div className="summary-row total">
              <span>Amount to Pay:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => {
              dispatch(cartActions.clearCart());
              navigate(`/order-confirmation/${orderId}`);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page container">
      <div className="payment-card">
        <div className="payment-header">
          <FaCreditCard className="payment-icon" />
          <h1>Payment</h1>
        </div>
        
        <div className="security-note">
          <FaLock /> Secure payment processing
        </div>
        
        <div className="payment-summary">
          <div className="summary-row">
            <span>Order ID:</span>
            <span>#{orderId}</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="demo-notice">
            <strong>Demo Mode:</strong> Use card number starting with 4242 (e.g., 4242424242424242) for successful payment
          </div>
          
          <div className="form-group">
            <label>Cardholder Name *</label>
            <input
              type="text"
              name="cardholderName"
              value={paymentData.cardholderName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              placeholder="4242 4242 4242 4242"
              maxLength="19"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Month *</label>
              <input
                type="text"
                name="expiryMonth"
                value={paymentData.expiryMonth}
                onChange={handleChange}
                placeholder="MM"
                maxLength="2"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Expiry Year *</label>
              <input
                type="text"
                name="expiryYear"
                value={paymentData.expiryYear}
                onChange={handleChange}
                placeholder="YY"
                maxLength="2"
                required
              />
            </div>
            
            <div className="form-group">
              <label>CVV *</label>
              <input
                type="text"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-success pay-btn"
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;