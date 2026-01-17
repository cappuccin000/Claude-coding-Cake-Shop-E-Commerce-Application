# Cake Shop E-Commerce Application

A complete full-stack e-commerce application for a cake shop built with React, Spring Boot, and PostgreSQL.

## 🎯 Features

### Customer Features
- Browse cakes by category
- Search for products
- View detailed product information
- Add items to cart
- Manage cart (update quantities, remove items)
- Checkout process
- Mock payment processing (Stripe-like demo)
- Order confirmation and tracking

### Admin Features
- Manage products (Create, Read, Update, Delete)
- View all orders
- Update order status
- Inventory management

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA / Hibernate
- **Build Tool**: Maven
- **API**: RESTful endpoints

### Frontend
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **UI Notifications**: React Toastify
- **Icons**: React Icons

## 📋 Prerequisites

- Java 17 or higher
- Node.js 16+ and npm
- PostgreSQL 12+
- Maven 3.6+

## 🚀 Installation & Setup

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE cakeshop;
```

Update database credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cakeshop
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Build the project:

```bash
mvn clean install
```

Run the application:

```bash
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080/api`

**Note**: Sample product data will be automatically loaded on first startup.

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

### Backend Structure

```
backend/
├── src/main/java/com/cakeshop/
│   ├── config/
│   │   ├── CorsConfig.java          # CORS configuration
│   │   └── DataLoader.java          # Sample data initialization
│   ├── controller/
│   │   ├── OrderController.java     # Order endpoints
│   │   ├── PaymentController.java   # Payment endpoints
│   │   └── ProductController.java   # Product endpoints
│   ├── dto/
│   │   ├── OrderRequest.java        # Order request DTO
│   │   ├── PaymentRequest.java      # Payment request DTO
│   │   └── PaymentResponse.java     # Payment response DTO
│   ├── entity/
│   │   ├── Order.java               # Order entity
│   │   ├── OrderItem.java           # Order item entity
│   │   └── Product.java             # Product entity
│   ├── repository/
│   │   ├── OrderRepository.java     # Order data access
│   │   └── ProductRepository.java   # Product data access
│   ├── service/
│   │   ├── OrderService.java        # Order business logic
│   │   ├── PaymentService.java      # Payment processing
│   │   └── ProductService.java      # Product business logic
│   └── CakeShopApplication.java     # Main application class
└── pom.xml                           # Maven configuration
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js                # Navigation component
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Home.js                  # Home page
│   │   ├── ProductList.js           # Product catalog
│   │   ├── ProductDetail.js         # Product details
│   │   ├── Cart.js                  # Shopping cart
│   │   ├── Checkout.js              # Checkout form
│   │   ├── Payment.js               # Payment processing
│   │   ├── OrderConfirmation.js     # Order confirmation
│   │   ├── AdminPanel.js            # Admin dashboard
│   │   └── [corresponding CSS files]
│   ├── apiService.js                # API integration
│   ├── store.js                     # Redux store
│   ├── App.js                       # Main app component
│   ├── App.css
│   ├── index.js                     # React entry point
│   └── index.css
└── package.json                      # npm configuration
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products?category={category}` - Filter by category
- `GET /api/products?search={query}` - Search products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders?email={email}` - Get orders by customer email
- `POST /api/orders` - Create new order
- `PATCH /api/orders/{id}/status` - Update order status

### Payments
- `POST /api/payments/process` - Process payment (Mock)

## 💳 Testing Payment

The application uses a mock payment gateway. For testing:

- **Successful Payment**: Use card number starting with `4242` (e.g., `4242424242424242`)
- **Failed Payment**: Use any other card number
- Fill in any future expiry date and any 3-digit CVV

## 🎨 Default Categories

- Chocolate
- Fruit
- Classic
- Citrus
- Specialty

## 📝 Sample Products

The application includes 8 pre-loaded sample cakes:
1. Chocolate Fudge Cake - $45.99
2. Strawberry Shortcake - $39.99
3. Red Velvet Cake - $42.99
4. Lemon Drizzle Cake - $35.99
5. Carrot Cake - $38.99
6. Black Forest Cake - $48.99
7. Vanilla Birthday Cake - $36.99
8. Tiramisu Cake - $52.99

## 🔐 Security Notes

This is a demonstration application. For production deployment:

- Implement proper authentication and authorization
- Use environment variables for sensitive configuration
- Implement real payment gateway integration
- Add input validation and sanitization
- Enable HTTPS
- Implement rate limiting
- Add comprehensive error handling
- Set up proper logging

## 🐛 Troubleshooting

### Backend won't start
- Verify PostgreSQL is running
- Check database credentials in `application.properties`
- Ensure port 8080 is not in use

### Frontend won't start
- Delete `node_modules` and run `npm install` again
- Ensure port 3000 is not in use
- Check that backend is running

### CORS errors
- Verify CORS configuration in `CorsConfig.java`
- Ensure frontend URL matches allowed origins

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## 📄 License

This is a demonstration project for educational purposes.

## 👥 Contributing

This is a complete template application. Feel free to fork and customize for your needs!

---

**Happy Coding! 🎂**
