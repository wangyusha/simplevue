const router = require('koa-router')();
const mongoose = require('mongoose');
// const  router = new Router;
router.get('/',async(ctx) =>{
  ctx.body = '这是用户操作首页'
});

router.post('/register',async(ctx)=>{
  let params= ctx.request.body;
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

/**
 * 用户登录
 */
router.post('/login',async(ctx) => {
  let {userName,password} = ctx.request.body;
  // console.log(userName,password)
  const User = mongoose.model('User');
  await User.find({userName:userName}).exec().then(async(result)=>{
    let [checkResult] = result;
    if(checkResult) {
      let newUser = new User();
      await newUser.comparePassword(password,checkResult.password)
        .then((isMatch) => {
          console.log(isMatch)
          if(isMatch) {
            ctx.body = {
              code:200,
              message:isMatch,
              data: {
                userId: checkResult._id,
                photoUrl: checkResult.photoUrl,
                userName:checkResult.userName
              }
            }
          }else  {
            ctx.body={ code:202, message:'用户名或密码不存在'}
          }
        }).catch(err=> {
          //出现异常，返回异常
          console.log(err)
          ctx.body={ code:500, message:err}
        })
    }else {
      ctx.body = {
        code:201,
        message:'用户名不存在'
      }
    }
  }).catch(err => {
    console.log(err);
    ctx.body = {
      code:500,
      message:err
    }
  })
})
//用户评论
router.post('/userAppraise',async(ctx) => {
  let params = ctx.request.body;
  // console.log(params)
  let Appraise = mongoose.model('Appraise');
  // console.log(Appraise.getIndexes())
  let newAppraise = new Appraise(params);
  await newAppraise.save().then(() => {
    ctx.body ={
      code: 200,
      message: '评论成功'
    }
  }).catch(err => {
    ctx.body ={
      code: 500,
      message: err
    }
  })
})
/**
 * 查询评论列表
 */
router.post('/getAppraise',async (ctx) => {
  let params = ctx.request.body;
  let Appraise = mongoose.model('Appraise');
  let User= mongoose.model('User');
  try {
    let result = await Appraise.find({goodsId: params.goodsId}).populate({path:'userId',select:'userName photoUrl',model: User}).exec();
    ctx.body = {
      code:200,
      data: result
    }
  }catch (err) {
    ctx.body = {
      code:200,
      message: err
    }
  }

})
/**
 * 省市区
 */
router.get('/getCity',async (ctx) =>{
  try {
    let City = mongoose.model('City');
    let [result]= await City.find({}).exec();
    // console.log(result)
    ctx.body = {
      code:200,
      message: result
    }
  }catch (err) {
    ctx.body = {
      code:500,
      message: err
    }
  }
})
/**
 *添加和编辑地址
 * state:0,添加 1，编辑
 */
router.post('/editorAddress',async (ctx) => {
  let {state,userId,addressInfo} = ctx.request.body;
  let obj = {userId,...addressInfo}
  let Address = mongoose.model('Address')
  if(state === 0){
    let newAddress = new Address(obj)
    await newAddress.save().then(() => {
      ctx.body ={
        code:200,
        message:'添加地址成功'
      }
    }).catch( err => {
      ctx.body ={
        code:500,
        message:err
      }
    })
  }
})
/**
 * 地址列表
 */
router.post('/getAddressList',async (ctx) => {
  try {
    let userId = ctx.request.body.userId;
    let Address = mongoose.model('Address')
    let result = await Address.find({userId:userId}).exec();
    // console.log(result)
    ctx.body = {
      code: 200,
      message: result
    }
  }catch( err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})
/**
 * 生成订单
 */
router.post('/saveOrder',async(ctx) => {
  let orderNo = '';
  for(let i=0;i<6;i++) {
    orderNo += Math.floor(Math.random()*10)
  }
  let orderNum = new Date().getTime() + orderNo;
  let params = ctx.request.body;
  let Order = mongoose.model('Order');
  let newOrder = new Order({orderNum,...params});
  await newOrder.save().then(() => {
    ctx.body ={
      code: 200,
      message: '提交订单成功',
      orderNum: orderNum
    }
  }).catch(err=> {
    ctx.body ={
      code: 500,
      message: err
    }
  })
})

/*
* 订单列表*
* 0：全部
* 1：待付款
* 2：待发货
* 3：待收货
* 4：待评价*/
router.post('/getOrder',async(ctx) => {
  // console.log(ctx.request.body)
  try {
    let userId = ctx.request.body.userId;
    let page = ctx.request.body.page || 1;
    let num = ctx.request.body.num || 10;
    let status = ctx.request.body.status || 0;
    let start = (page-1) * num;
    let Order= mongoose.model('Order');
    let result;
    if(status == 0) {
      result = await Order.find({userId:userId}).skip(start).limit(num).exec();
    } else {
      result = await Order.find({userId:userId,status:status-1}).skip(start).limit(num).exec();
    }
    ctx.body = {code: 200,message: result}
  }catch (err) {
    ctx.body ={code: 500, message: err}
  }
})
module.exports=router;
