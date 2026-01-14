const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const User = require('../models/User');
const Event = require('../models/Event');
const { adminAuth } = require('../middleware/auth');

// Dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBusinesses = await Business.countDocuments();
    const totalEvents = await Event.countDocuments();
    const premiumUsers = await User.countDocuments({ 'subscription.status': 'active' });

    res.json({
      totalUsers,
      totalBusinesses,
      totalEvents,
      premiumUsers
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users (admin)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all businesses (admin)
router.get('/businesses', adminAuth, async (req, res) => {
  try {
    const businesses = await Business.find().populate('owner', 'name email');
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Feature/unfeature business
router.put('/businesses/:id/feature', adminAuth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    business.featured = !business.featured;
    await business.save();

    res.json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user (admin)
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete business (admin)
router.delete('/businesses/:id', adminAuth, async (req, res) => {
  try {
    await Business.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Business deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
