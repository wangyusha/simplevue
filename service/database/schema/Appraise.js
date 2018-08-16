const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const appraiseSchema = new Schema({
  goodsId: String,
  userId: ObjectId,
  content: String,
  createAt:{type: Date,default: Date.now()}
},{
  collection:'Appraise'
})

mongoose.model('Appraise',appraiseSchema)
