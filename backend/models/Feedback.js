const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  feedbackText: { type: String, required: true },
  category: { type: String, enum: ['suggestion', 'bug report', 'feature request', 'other'], default: 'other' },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Feedback', feedbackSchema); 