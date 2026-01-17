import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../apiService';
import { FaCheckCircle } from 'react-icons/fa';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrderById(orderId);
      setOrder(response.data);
    } catch (error) {
      console.error('Failed to fetch order', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="order-error container">
        <h2>Order not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="order-confirmation container">
      <div className="confirmation-card">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        
        <h1>Order Confirmed!</h1>
        <p className="thank-you">Thank you for your order</p>
        
        <div className="order-details">
          <h2>Order Details</h2>
          
          <div className="detail-row">
            <span className="label">Order ID:</span>
            <span className="value">#{order.id}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Status:</span>
            <span className={`status-badge ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="label">Payment Method:</span>
            <span className="value">{order.paymentMethod}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Total Amount:</span>
            <span className="value total">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="customer-info">
          <h3>Shipping Information</h3>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Email:</strong> {order.customerEmail}</p>
          <p><strong>Phone:</strong> {order.customerPhone}</p>
          <p><strong>Address:</strong> {order.shippingAddress}</p>
        </div>
        
        <div className="order-items">
          <h3>Order Items</h3>
          {order.orderItems.map((item, index) => (
            <div key={index} className="order-item">
              <div className="item-info">
                <span className="item-name">{item.product.name}</span>
                <span className="item-quantity">Quantity: {item.quantity}</span>
              </div>
              <span className="item-price">${item.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="confirmation-actions">
          <p className="email-note">
            A confirmation email has been sent to {order.customerEmail}
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;