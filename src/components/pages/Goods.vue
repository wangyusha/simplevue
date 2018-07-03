<template>
  <div>
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="goBack"
      fixed
    />
    <div class="content" v-html="goodsInfo.DETAIL"></div>
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
            console.log(response);
            this.goodsInfo = response.data.message
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
</style>
