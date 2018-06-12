const router = require('koa-router')();
const mongoose = require('mongoose');
const {connect,initSchemas} = require('../database/init.js');
// const  router = new Router;
router.get('/',async(ctx) =>{
  ctx.body = '这是用户操作首页'
});

router.post('/register',async(ctx)=>{
  let params= ctx.request.body
  // await connect();
  // initSchemas();
  const User = mongoose.model('User');
  let newUser = new User(params);
  await newUser.save().then(() => {
    ctx.body ={
      code: 200,
      message: '注册成功'
    }
  }).catch( error => {
    ctx.body ={
      code: 500,
      message: error
    }
  })
})
module.exports=router;
