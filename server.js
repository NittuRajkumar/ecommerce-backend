import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to eCommerce API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

/**
 * Create initial admin user if not present.
 * Uses ADMIN_EMAIL and ADMIN_PASSWORD from environment variables.
 */
const seedAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.warn('ADMIN_EMAIL or ADMIN_PASSWORD not set; skipping admin seed');
      return;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`Admin user exists: ${email}`);
      return;
    }

    const user = await User.create({ email, password, isAdmin: true });
    console.log(`Admin user created: ${user.email}`);
  } catch (error) {
    console.error('Failed to seed admin user:', error.message);
  }
};

// Start server after DB connection and seeding
const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
