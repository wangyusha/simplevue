const router = require('koa-router')();
const multer = require('koa-multer');
const mongoose = require('mongoose');
const fs = require('fs');
// const  router = new Router;
router.get('/',async(ctx) =>{
  ctx.body = '这是用户操作首页'
});
const UPPATH = 'static/img';
//文件上传配置
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    if(!fs.existsSync(UPPATH)) {
      fs.mkdirSync(UPPATH)
    }
    cb(null,UPPATH)
  },
  filename: (req,file,cb) => {
    let fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
/**
 * 上传图片
 */
router.post('/upFile',multer({storage}).single('file'),async(ctx) => {
  const {originalname, mimetype, filename, path, size} = ctx.req.file;
  const {userId} = ctx.request.body;
  let fullPath = 'http://192.168.1.3:3000/' + UPPATH +'/' + filename;
  let Upload = mongoose.model('UpLoad');
  let newUpload = new Upload({originalname, mimetype, filename, path, size});
  await newUpload.save().then(() => {
    ctx.body ={
      code: 200,
      message: '上传成功',
      path: fullPath
    }
  }).catch(err=> {
    ctx.body ={
      code: 500,
      message: '上传失败'
    }
  })


});

/**
 * 注册
 */
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
  let obj = {userId,...addressInfo};
  let Address = mongoose.model('Address');
  if(addressInfo.isDefault) {
    await Address.update({isDefault: true},{$set:{isDefault:false}},{multi: true}).exec();
  }
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
  }else {
    await Address.update({_id: addressInfo._id},{$set: {
        addressDetail: addressInfo.addressDetail,
        areaCode: addressInfo.areaCode,
        city: addressInfo.city,
        county: addressInfo.county,
        isDefault: addressInfo.isDefault,
        name: addressInfo.name,
        postalCode: addressInfo.postalCode,
        province: addressInfo.province,
        tel: addressInfo.tel
      }}).then(() => {
      ctx.body ={
        code:200,
        message:'编辑地址成功'
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
 * 删除地址
 */
router.post('/moveAddress',async(ctx) => {
    let addressId = ctx.request.body.addressId;
    let Address = mongoose.model('Address')
    await Address.remove({_id: addressId}).then(() => {
      ctx.body ={
        code:200,
        message:'请求成功'
      }
    }).catch( err => {
      ctx.body ={
        code:500,
        message:err
      }
    })
})

/**
 * 地址列表userId
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
 * 根据地质id查询地址
 */
router.post('/addressById',async (ctx) => {
  try {
    let addressId = ctx.request.body. addressId;
    let Address = mongoose.model('Address')
    let result = await Address.find({_id:addressId}).exec();
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
