<template>
    <div>
      商品详情页
      <div v-html="goodsInfo.DETAIL"></div>
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

        this.getInfo()
      },
      methods:{
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

</style>
