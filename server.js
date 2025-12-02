// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const path = require('path');
const themeRoutes = require('./routes/themeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// ----------------------------------------
// SERVE PUBLIC HOMEPAGE FIRST
// ----------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// ----------------------------------------
// API ROUTES
// ----------------------------------------
app.use('/api/themes', themeRoutes);
app.use('/api/users', userRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// ----------------------------------------
// Health check (optional)
// ----------------------------------------
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Portfolio API is running' });
});

// ----------------------------------------
// 404 Handler
// ----------------------------------------
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
