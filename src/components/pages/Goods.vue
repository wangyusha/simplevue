<template>
  <div class="content">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="goBack"
      fixed
    />
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%"/>
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE}}</div>
    <div>
      <van-tabs >
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">

          </div>
        </van-tab>
        <van-tab title="评价">
          正在制作中
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>

<script>
  import url from '@/serviceAPI.config.js'
  export default {
    name: "goods",
    data() {
      return {
        goodsId: '01e2f8a88fe44bb8aa6e843ae02105a8',
        goodsInfo: {}
      }
    },
    created(){
      this.goodsId = this.$route.query.goodsId;
      console.log(this.goodsId)
      this.getInfo()
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      getInfo() {
        this.$http.post(url.getDetailGoodsInfo,{goodsId: this.goodsId})
          .then(response=>{
            if(response.data.code==200 && response.data.message) {
              this.goodsInfo = response.data.message
            }else{
              this.$toast('服务器错了')
            }

          })
          .catch(error=>{
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>
.content{
  padding: 46px 0 20px 0;
}
.detail{
  font-size:0px;
}
.goods-name{
  background-color: #fff;
}
.goods-price{
  background-color: #fff;
}
</style>
