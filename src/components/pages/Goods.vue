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
      <van-tabs  swipeable sticky @click="tabChange">
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">

          </div>
        </van-tab>
        <van-tab title="评价">
          <van-cell-group>
            <van-cell v-for="item in appraiseList" :key="item._id">
              <div class="ptoto-name"><div class="photo"><img v-lazy="item.userId.photoUrl" width="100%" alt=""></div><span>{{item.userId.userName}}</span></div>
              <div>{{item.content}}</div>
            </van-cell>
          </van-cell-group>
          <div class="appraise-empty" v-if="appraiseList.length == 0">暂无评价！</div>
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
      <van-goods-action-mini-btn icon="chat" text="客服"  />
      <van-goods-action-mini-btn icon="cart" text="购物车" @click="goCart" :info=" cartCount" />
      <van-goods-action-big-btn text="加入购物车" @click="addGooodsToCart" />
      <van-goods-action-big-btn text="立即购买" @click="onGoBuy" primary />
    </van-goods-action>
    <!--<van-sku v-model="showSku">-->
      <!--<template slot="sku-header-price" >-->
        <!--<div class="van-sku__goods-price">-->
          <!--<span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">6666</span>-->
        <!--</div>-->
      <!--</template>-->
    <!--</van-sku>-->
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
        goodsInfo: {},
        cartCount: 0,
        appraiseList: [],
        showSku: false,
      }
    },
    created(){
      this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId;
      this.getInfo();
      this.cartCount = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo).length : 0;
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      onGoBuy() {
        console.log('111')
        this.showSku = true;
      },
      getInfo() {
        // console.log(this.goodsId)
        this.$http.post(url.getDetailGoodsInfo,{goodsId: this.goodsId})
          .then(response=>{
            // console.log(response)
            if(response.data.code==200 && response.data.message) {
              this.goodsInfo = response.data.message;
              console.log(this.goodsInfo);
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
            Name:this.goodsInfo.NAME,
            price:this.goodsInfo.PRESENT_PRICE,
            image:this.goodsInfo.IMAGE1,
            count:1
          }
          cartInfo = [newGoodsInfo,...cartInfo];
          localStorage.cartInfo = JSON.stringify(cartInfo);
          this.$toast.success('添加成功');
          this.cartCount += 1;
        }else  {
          this.$toast.success('商品已存在');
          return;
        }
        // this.$router.push({name:'Cart'})  //进行跳转
      },
      goCart() {
        this.$router.push({name:'Cart'})
      },
      tabChange(index,title) {
        // console.log(index,title)
        if(index === 1) {
          this.$http.post(url.getAppraise,{goodsId: this.goodsId})
            .then( res => {
              if(res.data.code ==200) {
                // console.log(res.data.data);
                this.appraiseList = res.data.data;
              }else{
                this.$toast.fail('服务器错误！')
              }
            }).catch( err => {
              console.log(err)
          })
        }
      }

    }
  }
</script>

<style scoped>
  .content{
    padding: 46px 0 60px 0;
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
  .appraise-empty{
    text-align: center;
    padding: 8rem 0;
    color: #797979;
  }
  .ptoto-name .photo{
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 1rem;
  }
</style>
