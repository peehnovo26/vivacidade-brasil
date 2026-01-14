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

// Update user (admin)
router.put('/users/:id', adminAuth, async (req, res) => {
  try {
    const { name, role } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (name) user.name = name;
    if (role) user.role = role;
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reviews (admin)
router.get('/reviews', adminAuth, async (req, res) => {
  try {
    const Review = require('../models/Review');
    const reviews = await Review.find().populate('businessId userId');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete review (admin)
router.delete('/reviews/:id', adminAuth, async (req, res) => {
  try {
    const Review = require('../models/Review');
    await Review.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events (admin)
router.get('/events', adminAuth, async (req, res) => {
  try {
    const events = await Event.find().populate('businessId');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create event (admin)
router.post('/events', adminAuth, async (req, res) => {
  try {
    const { name, businessId, date, location } = req.body;
    
    const newEvent = new Event({
      name,
      businessId,
      date,
      location
    });
    
    await newEvent.save();
    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update event (admin)
router.put('/events/:id', adminAuth, async (req, res) => {
  try {
    const { name, businessId, date, location } = req.body;
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    if (name) event.name = name;
    if (businessId) event.businessId = businessId;
    if (date) event.date = date;
    if (location) event.location = location;
    
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete event (admin)
router.delete('/events/:id', adminAuth, async (req, res) => {
  try {
    await Event.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
