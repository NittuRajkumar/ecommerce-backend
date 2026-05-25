import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * @async
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  const primaryURI = process.env.MONGODB_URI;
  const fallbackURI = 'mongodb://127.0.0.1:27017/ecommerce';
  const attemptConnect = async (uri) => {
    return mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  };

  try {
    if (!primaryURI) {
      throw new Error('MONGODB_URI not provided');
    }
    const conn = await attemptConnect(primaryURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (error) {
    console.warn(`Primary MongoDB connection failed: ${error.message}`);
  }

  try {
    const conn = await attemptConnect(fallbackURI);
    console.log(`Fallback MongoDB connected: ${conn.connection.host}`);
  } catch (fallbackError) {
    console.error(`Fallback MongoDB connection failed: ${fallbackError.message}`);
    process.exit(1);
  }
};

export default connectDB;
