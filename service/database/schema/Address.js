
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const addressSchema = new Schema({
  userId:ObjectId,
  address_detail: String,
  area_code: String,
  city: String,
  county: String,
  is_default: Boolean,
  name: String,
  postal_code: String,
  province: String,
  tel: String,
  createAt:{type: Date,default: Date.now()}
},{
  collection:'Address'
})

mongoose.model('Address',addressSchema)
