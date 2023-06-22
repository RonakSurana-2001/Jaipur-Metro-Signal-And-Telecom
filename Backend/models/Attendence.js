const mongoose = require('mongoose');
const { Schema } = mongoose;
const Attendence = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    locationN:{
        type:String
    },
    InTime:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('attendences',Attendence );