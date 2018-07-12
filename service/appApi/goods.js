const router = require('koa-router')();
const mongoose = require('mongoose');
const fs = require('fs');
const goodsInfo = require('../controler/goods.js')
router.get('/insertAllGoodsInfo',async(ctx)=> {
  // console.log(fs)
  fs.readFile('./newGoods.json','utf8',(err,data) => {
    console.log(err)
    if(!err) {
      console.log(data)
      data = JSON.parse(data);
      let saveCount = 0;
      const Goods = mongoose.model('Goods');
      data.map((value,index) => {
        let newGoods = new Goods(value);
        newGoods.save().then(() => {
          saveCount++;
          console.log('保存成功')
        }).catch(err=>{
          console.log(err)
        })
      })
    }
  })
  ctx.body="开始导入数据"
})
/*
* 导入商品大类数据*/
router.get('/insertAllCategory',async(ctx)=> {
  // console.log(fs)
  fs.readFile('./data_json/category.json','utf8',(err,data) => {
    console.log(err)
    if(!err) {
      console.log(data)
      data = JSON.parse(data);
      let saveCount = 0;
      const Category = mongoose.model('Category');
      data.RECORDS.map((value,index) => {
        let newCategory = new Category(value);
        newCategory.save().then(() => {
          saveCount++;
          console.log('保存成功')
        }).catch(err=>{
          console.log(err)
        })
      })
    }
  })
  ctx.body="开始导入数据"
})

/*
* 导入商品子类数据*/
router.get('/insertAllCategorySub',async(ctx)=> {
  // console.log(fs)
  fs.readFile('./data_json/category_sub.json','utf8',(err,data) => {
    console.log(err)
    if(!err) {
      console.log(data)
      data = JSON.parse(data);
      let saveCount = 0;
      const CategorySub = mongoose.model('CategorySub');
      data.RECORDS.map((value,index) => {
        let newCategorySub = new CategorySub(value);
        newCategorySub.save().then(() => {
          saveCount++;
          console.log('保存成功')
        }).catch(err=>{
          console.log(err)
        })
      })
    }
  })
  ctx.body="开始导入数据"
})
/*
* 商品详情接口*/
router.post('/getDetailGoodsInfo',async(ctx) => {
  let {goodsId} = ctx.request.body;
  const Goods = mongoose.model('Goods');
  await Goods.findOne({ID:goodsId})
    .then(async(res) => {
      ctx.body={code:200,message:res}
    }).catch(err=> {
      ctx.body={code:500,message:err}
    });
});

/*
* 读取大类别
* */
router.get('/getCategoryList',async(ctx) => {
  try {
    let Category = mongoose.model('Category');
    let result = await Category.find().exec();
    ctx.body = {code: 200,message: result}
  }catch (err) {
    ctx.body ={code: 500, message: err}
  }
})
/*
* 读取小类别*/
router.get('/getCategorySubList',async(ctx) => {
  try {
    let categoryId = 1;
    let Category = mongoose.model('CategorySub');
    let result = await Category.find({MALL_CATEGORY_ID:categoryId}).exec();
    ctx.body = {code: 200,message: result}
  }catch (err) {
    ctx.body ={code: 500, message: err}
  }
})

/*
* 读取商品列表*/
router.get('/getGoodsListByCategorySubID',async(ctx) => {
  try {
    let categorySubId = '2c9f6c946016ea9b016016f79c8e0000';
    let Goods= mongoose.model('Goods');
    let result = await Goods.find({SUB_ID:categorySubId}).exec();
    ctx.body = {code: 200,message: result}
  }catch (err) {
    ctx.body ={code: 500, message: err}
  }
})
module.exports = router;
