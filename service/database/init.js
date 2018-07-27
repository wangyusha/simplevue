const mongoose = require('mongoose');
const glob = require('glob');
const {resolve} = require('path');
const db = 'mongodb://localhost/simple-db';
mongoose.Promise = global.Promise;
exports.connect = ()=> {
  mongoose.connect(db);
  let maxConnectionTimes = 0;
  return new Promise((resolve, reject) => {
    //增加数据库连接事件监听
    mongoose.connection.on('disconnected',()=> {
      console.log('*******************數據庫斷開*********');
      if(maxConnectionTimes <3) {
        maxConnectionTimes++;
        //进行连接数据
        mongoose.connect(db);
      }else {
        reject();
        throw new Error('數據庫出現問題')
      }

    })
    //数据库出现错误的时候
    mongoose.connection.on('error',err=>{
      console.log(err);
      mongoose.connect(db);
    })
    //链接打开的时候
    mongoose.connection.once('open',()=>{
      console.log('MongoDB Connected successfully!');
      resolve();
    })
  })

};

exports.initSchemas = () =>{
  glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}
