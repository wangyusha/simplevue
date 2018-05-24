const Koa = require('koa');
const app = new Koa();
const {connect} = require('./database/init.js');

;(async () => {
  await connect()
})()
app.use(async (ctx) => {
  ctx.body = 'Koa is good'
})

app.listen(3000,() => {
  console.log('[Server] starting at port 3000')
})
