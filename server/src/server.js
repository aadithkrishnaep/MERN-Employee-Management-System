const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware setup
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Endpoints (supports both /api/employees and /api/employeelist)
app.use('/api/employees', employeeRoutes);
app.use('/api/employeelist', employeeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'MERN Employee API is running' });
});

// Resolve client static assets path
let clientBuildPath = path.join(__dirname, '../public');
if (!fs.existsSync(path.join(clientBuildPath, 'index.html'))) {
  clientBuildPath = path.join(__dirname, '../../client/dist');
}
if (!fs.existsSync(path.join(clientBuildPath, 'index.html'))) {
  clientBuildPath = path.join(__dirname, '../dist');
}

app.use(express.static(clientBuildPath));

app.get('*', (req, res, next) => {
  // If requesting an API route that wasn't matched, send 404 JSON
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  // Otherwise serve React client
  const indexPath = path.join(clientBuildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(200).send('API is running. Client build not found.');
});

// Centralized error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`[Server] Express server running on http://localhost:${PORT}`);
});

module.exports = app;
