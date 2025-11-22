const mongoose = require('mongoose');

const categories = ['hostel', 'academic', 'library'];
const feedbackTypes = ['suggestion', 'praise', 'improvement'];

const FeedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    category: { type: String, enum: categories, required: true },
    feedbackType: { type: String, enum: feedbackTypes, default: 'suggestion' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('feedback', FeedbackSchema);

