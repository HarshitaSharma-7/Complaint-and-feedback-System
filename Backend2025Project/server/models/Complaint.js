const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['hostel', 'academic', 'library'], // Updated categories
    required: true,
  },
  hostelName: { type: String },
  groupNumber: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'resolved'], // Updated statuses
    default: 'pending',
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('complaint', ComplaintSchema);