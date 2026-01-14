const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  });
};

const businessAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'business' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  });
};

module.exports = { auth, adminAuth, businessAuth };
