const mongoose = require('mongoose');
const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb+srv://ronaksurana2017:BeAwzAuwO7E7ZfJ5@cluster0.ropmbet.mongodb.net/?retryWrites=true&w=majority",{
      useNewUrlParser: true, // Add this option
      useUnifiedTopology: true // Add this option as well (recommended)
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
module.exports = connectToMongo;