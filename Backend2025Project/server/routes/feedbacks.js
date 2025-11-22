const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbacks } = require('../controllers/feedbackController');
const auth = require('../middleware/auth');

router.post('/', createFeedback);
router.get('/', auth, getFeedbacks);

module.exports = router;

