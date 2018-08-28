<template>
  <div class="cart">
    <div class="navbar-div">
      <van-nav-bar fixed left-text="返回"  :right-text="rightTitle" @click-left="goBack" @click-right="delCart" left-arrow  title="购物车" />
    </div>
    <!--显示购物车中的商品-->
    <div class="cart-list">
      <van-checkbox-group v-model="result" @change="checkChange">
        <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
          <van-checkbox :name="item.goodsId" />
          <div class="pang-img"><img v-lazy="item.image" width="100%" /></div>
          <div class="pang-text">
            <div class="pang-goods-name">{{item.Name}}</div>

            <div class="pang-control">
              <van-stepper v-model="item.count" @change="stepperChange" />
            </div>
          </div>
          <div class="pang-goods-price">￥{{item.price * item.count | moneyFilter}}</div>
        </div>
      </van-checkbox-group>
      <!--<van-checkbox-group v-model="result">-->
      <!--<van-checkbox-->
      <!--v-for="(item, index) in cartInfo"-->
      <!--:key="index"-->
      <!--:name="item.Name"-->
      <!--&gt;-->
      <!--<img :src="item.image" width="100%" /> {{ item.price }}-->
      <!--</van-checkbox>-->
      <!--</van-checkbox-group>-->
      <div class="cart-empty" v-if="cartInfo.length == 0">
        <van-icon name="shopping-cart" color="#ff5d38" size=""/>
        <span class="empty-title">购物车空空如也！</span>
        <router-link class="goBrowse" to="/main/CategoryList">去逛逛</router-link>
      </div>
    </div>
    <div class="buy-bar">
      <div class="bar-item bar-item-left"><van-checkbox v-model="isAllSelect"  @change="allChange">全选</van-checkbox></div>
      <div class="bar-item ">总价：{{totalPrice | moneyFilter}}</div>
      <div class="bar-item bar-item-right" ><van-button type="danger" @click="delAndSet">{{toggleTitle}}</van-button></div>
    </div>
  </div>
</template>

<script>
  import {toMoney} from '@/filter/moneyFilter.js'
  import { Toast } from 'vant';
  export default {
    name: "Cart",
    filters: {
      moneyFilter (money) {
        return toMoney(money);
      }
    },
    data() {
      return {
        cartInfo: [],
        isEmpty: false,
        result: [],
        toggleTitle: '结算',
        rightTitle: '删除',
        totalPrice: 0,
        isAllSelect: false
      }
    },
    created() {
      this.getCartInfo();
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      //购物车信息
      getCartInfo() {
        if(localStorage.cartInfo) {
          this.cartInfo = JSON.parse(localStorage.cartInfo)
        }
        // console.log(`cartInfo:${JSON.stringify(this.cartInfo)}`);
        this.isEmpty = this.cartInfo.length > 0 ? true:false;
        // if(this.cartInfo.length > 0) {
        //   this.cartInfo.forEach(v=> {
        //     this.totalPrice += v.price * v.count;
        //   })
        // }
      },
      checkChange(a) {
        if(a.length != this.cartInfo.length) {
          this.isAllSelect = false;
        }else {
          this.isAllSelect = true;
        }
        // console.log(a)
        this.totalPrice = 0
        this.cartInfo.forEach(v=> {
          a.forEach( item => {
            // console.log('item=' + item)
            if(v.goodsId == item){
              // console.log('1111111')
              this.totalPrice += v.price * v.count;
            }
          })
        })
      },
      delCart() {
        if(this.rightTitle  == '删除') {
          this.rightTitle = '完成';
          this.toggleTitle = '删除';
        }else {
          this.rightTitle  = '删除';
          this.toggleTitle = '结算';
        }
      },
      allChange(a) {
        // console.log(a)

        if(a) {
          this.result = [];
          this.cartInfo.forEach(v => {
            this.result.push(v.goodsId)
          })
        }else {
          if(this.result.length == this.cartInfo.length ) {
            this.result = [];
          }
        }
      },
      stepperChange(s) {
        // console.log(s)
        this.totalPrice = 0 ;
        this.cartInfo.forEach(v=> {
          this.result.forEach( item => {
            // console.log('item=' + item)
            if(v.goodsId == item){
              // console.log('1111111')
              this.totalPrice += v.price * v.count;
            }
          })
        })
      },
      //结算和删除
      delAndSet() {
        // console.log(this.result)
        if(this.result.length != 0 ){
          if(this.toggleTitle == '删除') {
            this.$dialog.confirm({
              title: '提示',
              message: '确认要删除吗？',
              showCancelButton: true,
            }).then(() => {
              // console.log('1111')
              let a = this.cartInfo.filter(v => {
                // console.log(!this.result.includes(v.goodsId))
                return !(this.result.includes(v.goodsId))
              })
              this.cartInfo = a;
              localStorage.cartInfo = JSON.stringify(a);
              this.result = []
            }).catch(() => {
              console.log('222')
            })
          }else {
            let selectCart = this.cartInfo.filter(v => {
              return this.result.includes(v.goodsId)
            })
            localStorage.settlementGoods = JSON.stringify(selectCart);
            this.$router.push('/Settlement')
          }
        }else {
          Toast('请选择')
        }

      }
    }

  }
</script>

<style scoped>
  .cart{
    padding: 42px 0 50px 0;
  }
  .cart-list{
    background-color: #fff;
  }
  .pang-row{
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
  }
  .pang-img{
    flex:6;
  }
  .pang-text{
    flex:14;
    padding-left:10px;
  }
  .pang-control{
    padding-top: 10px;
  }
  .pang-goods-price{
    flex:4;
    text-align: right;
  }
  .buy-bar{
    position: fixed;
    left: 0;
    bottom: 0;
    height: 55px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-top: 1px solid #ddd;
    font-size: 14px;
    z-index: 1000;
  }
  .bar-item{
    flex: 1;
    /*text-align: center;*/
  }
  .bar-item-left{
    padding-left: 20px;
    /*border-right: 1px solid #ddd;*/
  }
  .bar-item-right{
    text-align: right;
    padding-right: 20px;
  }
  .cart-empty{
    text-align: center;
    padding-top: 10rem;
    color:  #ff5d38;
    font-size: 22px;
  }
  .cart-empty .goBrowse{
    color: #ff5d38;
    font-size: 16px;
  }
  .empty-title{
    font-size: 16px;
    color: #797979;
  }
</style>
