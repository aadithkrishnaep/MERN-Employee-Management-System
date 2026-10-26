const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connString =
      process.env.MONGODB_URI ||
      process.env.MONGODB_URL ||
      'mongodb://localhost:27017/employeeDB';

    const conn = await mongoose.connect(connString);
    console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    // Do not exit process in development to allow graceful fallback/retries
  }
};

module.exports = connectDB;
