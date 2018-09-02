
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const uploadSchema = new Schema({
  userId:ObjectId,
  originalname:String,
  mimetype: String,
  filename: String,
  path: String,
  size: String,
  createAt:{type: Date,default: Date.now()}
},{
  collection:'UpLoad'
})

mongoose.model('UpLoad',uploadSchema )
