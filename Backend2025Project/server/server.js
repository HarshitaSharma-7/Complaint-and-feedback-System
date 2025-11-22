const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Make sure cors is required
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

// Middleware setup
app.use(cors()); // <-- This line is CRUCIAL and must be here
app.use(express.json()); // <-- This allows your server to read JSON from requests

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/feedbacks', require('./routes/feedbacks'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));