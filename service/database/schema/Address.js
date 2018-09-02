
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const addressSchema = new Schema({
  userId:ObjectId,
  addressDetail: String,
  areaCode: String,
  city: String,
  county: String,
  isDefault: Boolean,
  name: String,
  postalCode: String,
  province: String,
  tel: String,
  createAt:{type: Date,default: Date.now()}
},{
  collection:'Address'
})

mongoose.model('Address',addressSchema)
