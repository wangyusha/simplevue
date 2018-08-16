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
module.exports=router;
