const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const resetDatabase = async () => {
  try {
    await connectDB();
    
    // Drop the users collection to reset with new schema
    await mongoose.connection.collection('users').drop();
    console.log('✅ Users collection dropped successfully!');
    
    // Drop the complaints collection as well for a fresh start
    await mongoose.connection.collection('complaints').drop();
    console.log('✅ Complaints collection dropped successfully!');
    
    console.log('✅ Database reset complete! You can now register users with the new schema.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error resetting database:', err.message);
    process.exit(1);
  }
};

resetDatabase();
