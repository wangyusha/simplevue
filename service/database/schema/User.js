const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
//创建用户Schema
const userSchema = new Schema({
  userId: ObjectId,
  userName: {unique: true,type: String},
  password: String,
  createAt: {type: Date,default: Date.now()},
  lastLogin: {type: Date,default: Date.now()}
},{
  collection: 'user'
});

//发布模型
mongoose.model('User',userSchema);
