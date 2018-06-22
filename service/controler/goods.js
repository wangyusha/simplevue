const mongoose = require('mongoose');
module.exports = {
    /**
    * 查找商品
    * */
  async findGoods() {
    const Goods = mongoose.model('Goods')
    return new Promise((resolve,reject) => {
      Goods.find({},(err,doc) => {
        if(!err) {
          resolve(doc)
        }else {
          reject(err)
        }
      })
    })
  }
}
