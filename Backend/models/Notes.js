const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    Reason:{
        type:String,
        required: true
    },
    Status:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('notes', NotesSchema);