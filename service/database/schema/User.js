const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const SALT_WORK_FACTOR = 5;
//创建用户Schema
const userSchema = new Schema({
  userId: ObjectId,
  userName: {unique: true,type: String},
  password: String,
  photoUrl:{type: String,default:'http://localhost:3000/static/img/default.jpg'},
  createAt: {type: Date,default: Date.now()},
  lastLogin: {type: Date,default: Date.now()}
},{
  collection: 'user'
});

//每次存储数据时都要执行
userSchema.pre('save', function(next){
  //let user = this
  // console.log(this)
  // if (!this.isModified('password')) return next();
  bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
    if(err) return next(err)

    bcrypt.hash(this.password,salt, (err,hash)=>{
      if(err) return next(err)
      this.password = hash
      next()
    })

  })
})

userSchema.methods = {
  comparePassword:(_password,password) => {
    return new Promise((resolve,reject)=> {
      console.log(_password,password)
      bcrypt.compare(_password,password,(err,isMatch)=>{

        if(!err) {
          resolve(isMatch)
        }else {
          reject(err)
        }
      })
    })
  }
}

//发布模型
mongoose.model('User',userSchema);
