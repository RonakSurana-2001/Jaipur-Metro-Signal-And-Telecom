const mongoose = require('mongoose');
const PASSWORD=require('./env');
const connectToMongo = async () => {
  try {
    await mongoose.connect(`mongodb+srv://ronaksurana2017:${PASSWORD}@cluster0.uikp9u8.mongodb.net/?retryWrites=true&w=majority`,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
module.exports = connectToMongo;