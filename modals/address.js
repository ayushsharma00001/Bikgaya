const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    _id:false
  },
  street: {
    type:String,
    required:true
  },
  city: {
    type:String,
    required:true
  },
  contact:{
    type:Number,
    required:true,
    minLength:10,
    maxLength:10
  }
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
