import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const productService = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (category) => api.get(`/products?category=${category}`),
  searchProducts: (query) => api.get(`/products?search=${query}`),
  createProduct: (product) => api.post('/products', product),
  updateProduct: (id, product) => api.put(`/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/products/${id}`)
};

export const orderService = {
  getAllOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  getOrdersByEmail: (email) => api.get(`/orders?email=${email}`),
  createOrder: (order) => api.post('/orders', order),
  updateOrderStatus: (id, status) => api.patch(`/orders/${id}/status?status=${status}`)
};

export const paymentService = {
  processPayment: (paymentData) => api.post('/payments/process', paymentData)
};

export default api;