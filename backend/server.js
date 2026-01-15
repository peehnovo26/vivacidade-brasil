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
    'https://vivacidade-brasil-api.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, './public')));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rota catch-all para servir index.html (SPA fallback)
app.get('*', (req, res) => {
  // Se for uma rota de API, não fazer nada (deixar passar para os routes)
  if (req.path.startsWith('/api/')) {
    return;
  }
  // Caso contrário, tentar servir o arquivo ou o index.html
  const filePath = path.join(__dirname, './public', req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, './public/index.html'));
    }
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log('MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/upload', require('./routes/upload'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
