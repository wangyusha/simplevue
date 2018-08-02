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
    <div class="goods-price">价格：<span class="price">￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</span></div>
    <div>
      <van-tabs  swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">

          </div>
        </van-tab>
        <van-tab title="评价">
          正在制作中
        </van-tab>
      </van-tabs>

    </div>
    <!--<div class="goods-bottom">-->

      <!--<div>-->
        <!--<van-button size="large" type="primary">加入购物车</van-button>-->
      <!--</div>-->
      <!--<div>-->
        <!--<van-button size="large" type="danger">直接购买</van-button>-->
      <!--</div>-->

    <!--</div>-->
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
      <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn" />
      <van-goods-action-big-btn text="加入购物车" @click="addGooodsToCart" />
      <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn" primary />
    </van-goods-action>
  </div>
</template>

<script>
  import {toMoney} from '@/filter/moneyFilter.js'
  import url from '@/serviceAPI.config.js'
  export default {
    name: "goods",
    filters: {
      moneyFilter (money) {
        return toMoney(money);
      }
    },
    data() {
      return {
        goodsId: '01e2f8a88fe44bb8aa6e843ae02105a8',
        goodsInfo: {}
      }
    },
    created(){
      this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId;
      console.log(this.goodsId)
      this.getInfo()
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      onClickMiniBtn() {
        this.$toast('点击图标');
      },
      onClickBigBtn() {
        this.$toast('点击按钮');
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
      },
      addGooodsToCart() {
        //取出商品购物车的商品
        let cartInfo = localStorage.cartInfo? JSON.parse(localStorage.cartInfo):[];
        let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId);
        if(!isHaveGoods) {
          //没有商品直接添加到数组中
          //重新组成添加到购物车的信息
          let newGoodsInfo={
            goodsId:this.goodsInfo.ID,
            Name:this.goodsInfo.Name,
            price:this.goodsInfo.PRESENT_PRICE,
            image:this.goodsInfo.IMAGE1,
            count:1
          }
          cartInfo.push(newGoodsInfo);
          localStorage.cartInfo = JSON.stringify(cartInfo);
          this.$toast.success('添加成功')
        }else  {
          this.$toast.success('商品已存在')
        }
        this.$router.push({name:'Cart'})  //进行跳转
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
  .goods-bottom{
    position: fixed;
    bottom:0px;
    left:0px;
    background-color: #FFF;
    width:100%;

    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
  }
  .goods-bottom > div{
     flex:1;
     padding:5px;
   }
.goods-name{
  color: #333;
  padding: 0 20px;
  font-weight: bold;
}
  .goods-price{
    color: #333;
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;

  }
  .goods-price .price{
    color: #f44;
  }
</style>
