const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  city: { type: String, required: true },
  category: String,
  date: { type: Date, required: true },
  location: String,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  image: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
