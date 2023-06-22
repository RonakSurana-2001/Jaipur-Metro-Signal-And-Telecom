const mongoose = require('mongoose');
const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/metro');
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
module.exports = connectToMongo;