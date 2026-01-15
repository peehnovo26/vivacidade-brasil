const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const User = require('../models/User');
const Event = require('../models/Event');
const Coupon = require('../models/Coupon');
const { adminAuth } = require('../middleware/auth');
const { updateBusinessSeals, addVerifiedSeal, removeSeal, SEAL_TYPES } = require('../utils/sealManager');

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

// Seal Management Routes
// Add verified seal to business
router.post('/seals/:businessId/add', adminAuth, async (req, res) => {
  try {
    const { sealType } = req.body;
    const validSeals = Object.values(SEAL_TYPES);
    
    if (!validSeals.includes(sealType)) {
      return res.status(400).json({ error: 'Tipo de seal inválido' });
    }

    const business = await Business.findById(req.params.businessId);
    if (!business) return res.status(404).json({ error: 'Negócio não encontrado' });

    if (!business.seals) business.seals = [];
    if (!business.seals.includes(sealType)) {
      business.seals.push(sealType);
      await business.save();
    }

    res.json({ msg: 'Seal adicionado', seals: business.seals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove seal from business
router.delete('/seals/:businessId/:sealType', adminAuth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.businessId);
    if (!business) return res.status(404).json({ error: 'Negócio não encontrado' });

    business.seals = business.seals.filter(s => s !== req.params.sealType);
    await business.save();

    res.json({ msg: 'Seal removido', seals: business.seals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Coupon Management Routes
// Create coupon
router.post('/coupons', adminAuth, async (req, res) => {
  try {
    const { code, businessId, description, discountType, discountValue, maxUses, expiresAt } = req.body;

    if (!code || !businessId || !discountValue) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }

    // Verificar se código já existe
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({ error: 'Código de cupom já existe' });
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      businessId,
      description,
      discountType,
      discountValue,
      maxUses,
      expiresAt,
      createdBy: req.user.id
    });

    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all coupons
router.get('/coupons', adminAuth, async (req, res) => {
  try {
    const coupons = await Coupon.find()
      .populate('businessId', 'name')
      .populate('createdBy', 'name');
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get coupons by business
router.get('/coupons/business/:businessId', adminAuth, async (req, res) => {
  try {
    const coupons = await Coupon.find({ businessId: req.params.businessId });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update coupon
router.put('/coupons/:id', adminAuth, async (req, res) => {
  try {
    const { description, discountValue, maxUses, expiresAt, active } = req.body;
    
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { description, discountValue, maxUses, expiresAt, active, updatedAt: Date.now() },
      { new: true }
    );

    res.json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete coupon
router.delete('/coupons/:id', adminAuth, async (req, res) => {
  try {
    await Coupon.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Cupom deletado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
