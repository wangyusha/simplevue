<template>
  <div :style="{paddingTop:'45px'}">
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      fixed
      z-index="999"
      @click-left="$router.go(-1)"
    />
    <van-tabs v-model="active" sticky :swipe-threshold="5" @change="tabChange">
      <van-tab v-for="(item,index) in tabs" :title="item" :key="index">

      </van-tab>
    </van-tabs>
    <div class="order-box" ref="orderBox" :style="{height: '577px'}">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <van-cell-group>
          <van-cell v-for="item in orderList" :key="item._id">
            <div>订单号：{{item.orderNum}}</div>
            <van-card v-for="e in item.goods" :title="e.Name" centered :num="e.count" :price="e.price" :thumb="e.image" :key="e.goodsId"/>
            <div class="num-price">共计{{item.totalNum}}商品 合计:￥{{item.totalPrice}}</div>
            <div class="opreat-btn">
              <van-button type="danger" v-if="item.status == 0" size="small" plain>付款</van-button>
              <van-button v-if="item.status == 0" size="small" plain>取消订单</van-button>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
      <div class="emty" v-if="orderList.length == 0 && finished">
        <div class="emty-icon"><van-icon name="description" /></div>
        <div>暂无相关订单</div>
        <van-button plain type="warning" size="small" @click="$router.push({name: 'CategoryList'})">去逛逛</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import url from '@/serviceAPI.config.js'
  export default {
    name: "my-order",
    data() {
      return {
        active: 0,
        tabs:['全部订单','待付款','待发货','待收货','待评价'],
        page: 1,
        num: 10,
        loading: false,
        finished: false,
        orderList:[],
        userId: '',
        empty: false
      }
    },
    created() {
      if(localStorage.userInfo) {
        let userInfo = JSON.parse(localStorage.userInfo);
        this.userId = userInfo.userId;
      }
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight;
      let orderBox = this.$refs.orderBox;
      // console.log(orderBox)
      // orderBox.style.height = winHeight-90 + 'px';
    },
    methods: {
      tabChange(index,title) {
        this.orderList = [];
        this.active = index;
        this.page = 1;
        this.finished = false;
        this.onLoad();
      },
      getOrderList() {
        this.$http.post(url.getOrder,{
          userId: this.userId,
          page: this.page,
          num: this.num,
          status: this.active
        }).then( res => {
          if(res.data.code ==200 && res.data.message.length>0) {

            res.data.message.forEach(v=> {
              v.totalNum =0;
              v.totalPrice=0;
              v.goods.forEach(e=> {
                // console.log(e)
                v.totalNum += e.count;
                v.totalPrice += e.count*e.price;
              })
            })
            this.orderList = [...this.orderList,...res.data.message];
          }else  {
            this.finished = true;
          }
          this.loading = false;
          this.page ++;
        }).catch( err => {
          console.log(err)
        })
      },
      onLoad() {
        setTimeout(() => {
          this.getOrderList()
        },3000)
      }
    }
  }
</script>

<style scoped>
  .order-box {
    overflow: scroll;
  }
  .num-price{
    text-align: right;
    padding: 5px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .opreat-btn{
    text-align: right;
    margin-top: 10px;
  }
  .emty{
    padding-top: 6rem;
    text-align: center;
  }
  .emty .emty-icon{
    color: #5c5c5c;
    font-size: 3rem;
  }
</style>
