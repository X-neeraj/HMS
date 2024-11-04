import mongoose from 'mongoose';
const config = require("../../config")

async function connectDB() {
  try {
    await mongoose.connect(config.mongourl);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

export default connectDB;
