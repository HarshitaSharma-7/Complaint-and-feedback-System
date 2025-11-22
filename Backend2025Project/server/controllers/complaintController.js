const Complaint = require('../models/Complaint');

// FOR STUDENTS: Create a new complaint
exports.createComplaint = async (req, res) => {
  const { title, description, category, hostelName, groupNumber } = req.body;
  try {
    const newComplaint = new Complaint({
      title,
      description,
      category,
      user: req.user.id, // req.user comes from the auth middleware
      // include optional fields if provided
      ...(hostelName ? { hostelName } : {}),
      ...(groupNumber ? { groupNumber } : {}),
    });
    const complaint = await newComplaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// FOR STUDENTS: Get only the complaints submitted by the logged-in student
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ date: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// FOR STAFF (Warden/Teacher): Get complaints relevant to their role
exports.getComplaintsByCategory = async (req, res) => {
  try {
    const userRole = req.user.role;
    const roleCategoryMap = {
      warden: 'hostel',
      teacher: 'academic',
      librarian: 'library',
    };

    const requestedCategory = req.query.category;
    const defaultCategory = roleCategoryMap[userRole];
    const category = requestedCategory || defaultCategory;

    if (!category) {
      return res.status(400).json({ msg: 'Category not supported for this role' });
    }

    if (requestedCategory && requestedCategory !== defaultCategory) {
      return res.status(403).json({ msg: 'User not authorized for requested category' });
    }
    
    // Find complaints and populate the user's name and email
    const complaints = await Complaint.find({ category })
      .populate('user', ['name', 'email'])
      .sort({ date: -1 });
      
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// FOR STAFF (Warden/Teacher): Update the status of a complaint
exports.updateComplaintStatus = async (req, res) => {
  const { status } = req.body; // Expecting { status: "approved" } or { status: "rejected" }
  try {
    let complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

    // Security Check: Ensure the staff member is authorized for this category
    const userRole = req.user.role;
    const complaintCategory = complaint.category;

    if (
      (userRole === 'warden' && complaintCategory !== 'hostel') ||
      (userRole === 'teacher' && complaintCategory !== 'academic') ||
      (userRole === 'librarian' && complaintCategory !== 'library')
    ) {
      return res.status(401).json({ msg: 'User not authorized to update this complaint' });
    }

    complaint.status = status;
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};