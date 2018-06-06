const Koa = require('koa');
const mongoose = require('mongoose')
const app = new Koa();
const {connect,initSchemas} = require('./database/init.js');

;(async () => {
  await connect();
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({userName:'liaofan',password:'123456'})
  oneUser.save().then(()=>{
    console.log('插入成功')
  })
})()
app.use(async (ctx) => {
  ctx.body = 'Koa is good'
})

app.listen(3000,() => {
  console.log('[Server] starting at port 3000')
})
