const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const { name, email, subject, message, category, feedbackType } = req.body;

    if (!name || !email || !subject || !message || !category) {
      return res.status(400).json({ msg: 'All required fields must be provided' });
    }

    const feedback = new Feedback({
      name,
      email,
      subject,
      message,
      category,
      feedbackType,
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    console.error('Failed to create feedback', err);
    res.status(500).send('Server Error');
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error('Failed to fetch feedbacks', err);
    res.status(500).send('Server Error');
  }
};

