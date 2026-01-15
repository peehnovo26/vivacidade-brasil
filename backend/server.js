require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000',
    'https://vivacidade-brasil-web.onrender.com',
    'https://vivacidade-brasil-api.onrender.com',
    'https://vivacidade-brasil.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend PRIMEIRO
const publicPath = path.join(__dirname, './public');
console.log('Serving static files from:', publicPath);
app.use(express.static(publicPath));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check (disponível imediatamente)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  
  // Carregar rotas APÓS conexão com MongoDB
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/businesses', require('./routes/businesses'));
  app.use('/api/payments', require('./routes/payments'));
  app.use('/api/admin', require('./routes/admin'));
  app.use('/api/upload', require('./routes/upload'));
  
  console.log('✅ API routes loaded');
}).catch(err => {
  console.log('❌ MongoDB connection error:', err);
});

// Rota catch-all para servir index.html (SPA fallback) - DEVE SER A ÚLTIMA
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, './public/index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
