const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const appraiseSchema = new Schema({
  appraiseId:ObjectId,
  goodsId: {type: String},
  userId: {type: String},
  content: {type:String},
  create_time:{type: Date,default: Date.now()}
},{
  collection:'Appraise'
})

mongoose.model('Appraise',appraiseSchema)
