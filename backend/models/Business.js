const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  description: String,
  images: [String],
  address: String,
  phone: String,
  website: String,
  email: String,
  rating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  plan: { type: String, enum: ['free', 'start', 'plus', 'elite'], default: 'free' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  featured: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
  tags: [String],
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  seals: [String], // Array de seals: 'verified', 'top-rated', 'excellent', 'award-winning'
  coupon: {
    code: String,
    discount: Number, // percentual (0-100)
    description: String,
    expiresAt: Date,
    active: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Business', businessSchema);
