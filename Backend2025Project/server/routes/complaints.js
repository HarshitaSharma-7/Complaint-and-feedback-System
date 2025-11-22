const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getMyComplaints,
  getComplaintsByCategory,
  updateComplaintStatus,
} = require('../controllers/complaintController');
const auth = require('../middleware/auth'); // Your JWT authentication middleware

// @route   POST api/complaints
// @desc    Create a complaint (Student)
router.post('/', auth, createComplaint);

// @route   GET api/complaints/my
// @desc    Get my complaints (Student)
router.get('/my', auth, getMyComplaints);

// @route   GET api/complaints/category
// @desc    Get complaints by category (Warden/Teacher)
router.get('/category', auth, getComplaintsByCategory);

// @route   PUT api/complaints/:id/status
// @desc    Update complaint status (Warden/Teacher)
router.put('/:id/status', auth, updateComplaintStatus);

module.exports = router;