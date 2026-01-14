const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const { businessAuth, auth, adminAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all businesses
router.get('/', async (req, res) => {
  try {
    const { city, category, search, plan } = req.query;
    let query = {};

    if (city) query.city = city;
    if (category) query.category = category;
    if (plan) query.plan = plan;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const businesses = await Business.find(query)
      .populate('owner', 'name email')
      .sort({ featured: -1, rating: -1 });

    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single business
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('owner', 'name email phone')
      .populate('reviews');

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    res.json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create business (requires business or admin role)
router.post('/', businessAuth, async (req, res) => {
  try {
    const { name, category, city, description, address, phone, website, email } = req.body;

    const business = new Business({
      name,
      category,
      city,
      description,
      address,
      phone,
      website,
      email,
      owner: req.user.id
    });

    await business.save();
    res.status(201).json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update business
router.put('/:id', businessAuth, async (req, res) => {
  try {
    let business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    business = await Business.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete business
router.delete('/:id', businessAuth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Business.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Business removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upgrade business plan
router.put('/:id/upgrade-plan', businessAuth, async (req, res) => {
  try {
    const { plan } = req.body;
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    business.plan = plan;
    await business.save();

    res.json({ msg: 'Plan upgraded', business });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload images for business
router.post('/:id/upload-images', businessAuth, upload.array('images', 10), async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
    }

    // Adicionar URLs das imagens
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    business.images = [...(business.images || []), ...imageUrls];

    await business.save();

    res.json({ 
      msg: 'Imagens carregadas com sucesso', 
      images: imageUrls,
      business 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete image from business
router.delete('/:id/images/:imageName', businessAuth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const imageUrl = `/uploads/${req.params.imageName}`;
    business.images = business.images.filter(img => img !== imageUrl);

    await business.save();

    res.json({ msg: 'Imagem removida', business });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
