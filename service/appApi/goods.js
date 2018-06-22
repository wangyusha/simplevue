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
* 商品列表
* */
router.get('/goodsList',async(ctx) => {
  let result = {
    code:500,
    message:'',
    data:{
      list:{}
    }
  }
 let goodsResult = await goodsInfo.findGoods();
 if(goodsResult) {
   result.code = 200;
   result.data = {
     goodsList:goodsResult
   }
 }
 ctx.body = result;
})
module.exports = router;
