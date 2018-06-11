const Koa = require('koa');
const mongoose = require('mongoose')
const app = new Koa();
const Router = require('koa-router')
const bodyParse = require('koa-bodyparser');
const cros = require('koa2-cors');
const onerror = require('koa-onerror')
const {connect,initSchemas} = require('./database/init.js');
const user = require('./appApi/User.js');

let router = new Router();
router.use('/user',user.routes())

onerror(app)
// ;(async () => {
//   await connect();
//   initSchemas()
//   const User = mongoose.model('User')
//   let oneUser = new User({userName:'liaofanrr',password:'123456'})
//   oneUser.save().then(()=>{
//     console.log('插入成功')
//   })
// })();
app.use(bodyParse());
app.use(cros());
app.use(router.routes())
app.use(router.allowedMethods())
// app.use(async (ctx) => {
//   ctx.body = 'Koa is good'
// })
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3000,() => {
  console.log('[Server] starting at port 3000')
})
