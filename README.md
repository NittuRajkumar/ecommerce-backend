# eCommerce MERN Application

A full-stack eCommerce application built with **MongoDB, Express.js, React.js, and Node.js (MERN)**. This application includes both customer-facing and admin functionalities with JWT authentication.

## 🎯 Features

### User Side
- ✅ Product catalog from MongoDB
- ✅ Product cards with images, titles, descriptions, prices, and stock
- ✅ Add to cart functionality with persistent storage
- ✅ Update cart quantities and remove items
- ✅ Automatic total price calculation
- ✅ Checkout process with customer information
- ✅ Payment success confirmation page

### Admin Side
- ✅ JWT-based authentication system
- ✅ Secure admin login page
- ✅ Protected admin dashboard
- ✅ Complete CRUD operations for products:
  - Create new products
  - Read and display all products
  - Update existing products
  - Delete products
- ✅ Product form with validation
- ✅ Product image URL support

### Technical Features
- ✅ RESTful API with Express.js
- ✅ MongoDB with Mongoose ORM
- ✅ MVC folder structure
- ✅ JWT middleware for protected routes
- ✅ Environment variables with dotenv
- ✅ React Router for navigation
- ✅ Axios for API calls
- ✅ Context API for state management
- ✅ Responsive UI with Tailwind CSS
- ✅ Clean and reusable code with comments

## 📁 Project Structure

```
ecommerce/
├── backend/
│   ├── models/
│   │   ├── User.js           # Admin user model
│   │   ├── Product.js        # Product model
│   │   └── Order.js          # Order model
│   ├── controllers/
│   │   ├── authController.js # Auth logic (login, register)
│   │   ├── productController.js # Product CRUD operations
│   │   └── orderController.js  # Order management
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   ├── productRoutes.js  # Product endpoints
│   │   └── orderRoutes.js    # Order endpoints
│   ├── middleware/
│   │   └── authMiddleware.js # JWT authentication & authorization
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── .env                  # Environment variables
│   ├── .env.example          # Example env file
│   ├── server.js             # Express server setup
│   └── package.json          # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx    # Navigation bar
│   │   │   ├── ProductCard.jsx # Product display component
│   │   │   ├── Cart.jsx      # Shopping cart modal
│   │   │   └── AdminProductForm.jsx # Product form
│   │   ├── pages/
│   │   │   ├── Home.jsx      # User home page with products
│   │   │   ├── AdminLogin.jsx # Admin login page
│   │   │   ├── AdminDashboard.jsx # Protected admin dashboard
│   │   │   ├── Checkout.jsx  # Checkout page
│   │   │   └── PaymentSuccess.jsx # Order confirmation
│   │   ├── context/
│   │   │   └── CartContext.jsx # Cart state management
│   │   ├── api/
│   │   │   └── axios.js      # Axios configuration
│   │   ├── App.jsx           # Main app routing
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html            # HTML template
│   ├── .env                  # Frontend env variables
│   ├── .env.example          # Example env file
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   ├── postcss.config.js     # PostCSS config
│   └── package.json          # Frontend dependencies
│
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local or MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (or copy from `.env.example`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   ```

4. **Start MongoDB** (if using local installation):
   ```bash
   # Windows
   mongod

   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

5. **Start the backend server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

   Backend will run on **http://localhost:5000**

### Frontend Setup

1. **Open a new terminal and navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (or copy from `.env.example`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend will run on **http://localhost:3000**

## 📝 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new admin (demo purposes)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user (protected)

### Product Routes
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get single product (public)
- `POST /api/products` - Create product (admin protected)
- `PUT /api/products/:id` - Update product (admin protected)
- `DELETE /api/products/:id` - Delete product (admin protected)

### Order Routes
- `POST /api/orders` - Create order (public)
- `GET /api/orders` - Get all orders (admin protected)
- `GET /api/orders/:id` - Get order details (public)
- `PUT /api/orders/:id` - Update order status (admin protected)

## 🔐 Authentication

### Default Admin Credentials
```
Email: admin@example.com
Password: admin123
```

⚠️ **Important:** Change these credentials in the `.env` file for production use!

### JWT Token
- Tokens are stored in `localStorage` as `adminToken`
- Tokens automatically included in API requests
- Tokens expire after 7 days (configurable in `.env`)
- Unauthorized requests redirect to login page

## 🛒 Using the Application

### As a Customer
1. Visit **http://localhost:3000**
2. Browse products on the home page
3. Click "Add to Cart" to add items
4. Click the cart icon to view/manage cart
5. Click "Checkout" to proceed
6. Fill in customer information
7. Complete purchase
8. View order confirmation

### As an Admin
1. Go to **http://localhost:3000/admin/login**
2. Login with demo credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
3. On the dashboard, you can:
   - View all products
   - Click "Add New Product" to create
   - Click "Edit" to modify a product
   - Click "Delete" to remove a product
4. Fill in product details and submit

## 🎨 UI Components

### User Interface
- **Responsive Design:** Works on mobile, tablet, and desktop
- **Modern Styling:** Tailwind CSS for clean aesthetics
- **Product Cards:** Images, titles, prices, stock info, and action buttons
- **Shopping Cart Modal:** Easy access and management
- **Checkout Form:** Multi-step validation
- **Success Page:** Order confirmation and details

### Admin Interface
- **Secured Dashboard:** JWT protected access
- **Product Management:** Create, read, update, delete operations
- **Form Validation:** Client-side validation with error messages
- **Image Preview:** See product image before saving
- **Success Messages:** Feedback on operations

## 💾 Database Models

### User Schema
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  isAdmin: Boolean (default: false),
  createdAt: Date
}
```

### Product Schema
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  stock: Number (required),
  image: String (URL),
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  items: [
    {
      productId: ObjectId,
      title: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: Number,
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  paymentStatus: String (pending|completed|failed),
  orderStatus: String (pending|processing|shipped|delivered),
  createdAt: Date
}
```

## 🔧 Development Tips

### Adding Sample Products
Use a tool like Postman or cURL to add products:

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Product",
    "description": "This is a sample product",
    "price": 29.99,
    "stock": 100,
    "image": "https://via.placeholder.com/300x300?text=Product",
    "category": "Electronics"
  }'
```

### Debugging
- Check browser console (F12) for frontend errors
- Check terminal output for backend errors
- Verify MongoDB connection in server logs
- Use browser DevTools to inspect network requests

### Extending the Application
- Add product search/filter functionality
- Implement product categories
- Add user wishlist feature
- Create admin order management interface
- Add payment gateway integration (Stripe, PayPal)
- Implement email notifications
- Add product reviews and ratings
- Create user accounts and order history

## 🐛 Common Issues and Solutions

### MongoDB Connection Error
**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:27017`
**Solution:** 
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Use MongoDB Atlas for cloud database

### CORS Error
**Problem:** `Access to XMLHttpRequest blocked by CORS policy`
**Solution:**
- Verify backend has CORS enabled
- Check `VITE_API_URL` in frontend `.env`
- Ensure backend is running on correct port

### Frontend Can't Connect to Backend
**Problem:** API requests fail with network error
**Solution:**
- Verify both servers are running
- Check ports (3000 for frontend, 5000 for backend)
- Verify `.env` files have correct URLs
- Clear browser cache and restart

### Token Issues
**Problem:** Getting 401 or 403 errors
**Solution:**
- Clear localStorage and login again
- Check token expiration in `.env`
- Verify JWT_SECRET matches between .env files

## 📦 Dependencies

### Backend
- **express:** Web framework
- **mongoose:** MongoDB ODM
- **bcryptjs:** Password hashing
- **jsonwebtoken:** JWT implementation
- **dotenv:** Environment variables
- **cors:** Cross-Origin Resource Sharing

### Frontend
- **react:** UI library
- **react-router-dom:** Client-side routing
- **axios:** HTTP client
- **tailwindcss:** CSS framework
- **vite:** Build tool

## 🚢 Deployment

### Backend (Heroku Example)
1. Create Heroku account and install CLI
2. Initialize git repository
3. Deploy: `git push heroku main`
4. Set environment variables on Heroku dashboard

### Frontend (Vercel Example)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically on push

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [JWT Introduction](https://jwt.io/)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## ✨ Features Checklist

- ✅ Product catalog display
- ✅ Shopping cart functionality
- ✅ Checkout process
- ✅ Admin authentication
- ✅ Product CRUD operations
- ✅ JWT authorization
- ✅ Responsive design
- ✅ Error handling
- ✅ Form validation
- ✅ LocalStorage persistence
- ✅ MongoDB integration
- ✅ RESTful API
- ✅ MVC architecture
- ✅ Comments in code
- ✅ Environment variables

---

**Happy Coding! 🚀**

For questions or issues, please refer to the relevant documentation or create an issue in the repository.
