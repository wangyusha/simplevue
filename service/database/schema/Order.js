
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const orderSchema = new Schema({
  orderId:ObjectId,
  userId: ObjectId,
  orderNum: String,
  status: {type: Number,default: 0},
  goods: Array,
  message: String,
  addressId: ObjectId,
  createAt:{type: Date,default: Date.now()}
},{
  collection:'Order'
})

mongoose.model('Order',orderSchema)
