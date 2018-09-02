<template>
  <div class="order-confirm">
    <div class="order-top">
      <van-nav-bar fixed left-text="返回" title="确认订单" fixed left-arrow @click-left="goBack" />
    </div>
    <div class="address">
      <van-cell-group>
        <van-cell title="单元格" is-link center  @click="showAddressList = true" v-if="addressInfo.name">
          <span slot="icon" class="address-icon"><van-icon name="location" color="#38f"/></span>
          <template slot="title">
            <div><span>{{addressInfo.name}}</span><span class="tel">{{addressInfo.tel}}</span></div>
            <div>{{addressInfo.province}}{{' '+addressInfo.county}}{{' '+addressInfo.city}}{{' '+addressInfo.addressDetail}}</div>
          </template>
        </van-cell>
        <van-cell  is-link  class="add-address" @click="goEditor" v-else>
          <span slot="icon" class="add-icon"><van-icon  name="add-o" color="#1595ff" /></span>
          <template slot="title">
            新增收货地址
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div>
      <van-cell-group>
        <van-cell   v-for="item in goodsInfo" :key="item.goodsId">
          <div slot="title" class="t-title">
            <div class="goods-info">
              <div class="img info-item">
                <img :src="item.image" width="100%" alt="">
              </div>
              <div class="name info-item">
                <div class="name-title">{{item.Name}}</div>
                <div><van-stepper v-model="item.count" @change="stepperChange" /></div>
              </div>
            </div>
          </div>
          <div slot="right-icon" class="count-price">
            <div>￥{{item.price}}</div>
            <div>×{{item.count}}</div>
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="配送方式" is-link value="快递/免邮" />
        <van-field
          value="请输入留言"
          label="给卖家留言:"
          v-model="message"
        />
      </van-cell-group>
    </div>
    <!--<van-submit-bar :price="totalPrice*100" button-text="提交订单"/>-->
    <div class="buy-bar">
      <div class="bar-item bar-item-left"></div>
      <div class="bar-item ">总价：￥{{totalPrice | moneyFilter}}</div>
      <div class="bar-item bar-item-right" ><van-button type="danger" @click="submit">提交订单</van-button></div>
    </div>
    <van-popup v-model="showAddressList" position="right">
      <van-nav-bar fixed left-text="返回" title="管理收货地址" fixed left-arrow @click-left="showAddressList = false" />
      <AddressList :list="addressList" @onselect="toggleAddress" :id="addressInfo._id" />
    </van-popup>
  </div>
</template>

<script>
  import {toMoney} from '@/filter/moneyFilter.js';
  import AddressList from '@/components/component/addressList.vue';
  import url from '../../serviceAPI.config';
  export default {
    name: "Settlement",
    components: {
      AddressList
    },
    filters: {
      moneyFilter:(money) => toMoney(money)
    },
    data() {
      return {
        goodsInfo: [],
        totalPrice:0,
        addressInfo:{},
        message:'',
        showAddressList: false,
        addressList:[]
      }
    },
    created() {
      if(localStorage.settlementGoods) {
        this.goodsInfo = JSON.parse(localStorage.settlementGoods)
      }
      if(this.goodsInfo.length !=0) {
        this.goodsInfo.forEach(v=> {
          this.totalPrice += v.price*v.count
        })
      }
      if(localStorage.userInfo) {
        let userInfo = JSON.parse(localStorage.userInfo);
        this.getAddress(userInfo.userId)
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      stepperChange(s) {
        // console.log(s)
        this.totalPrice = 0;
        this.goodsInfo.forEach(v=> {
          this.totalPrice += v.price*v.count
        })
      },
      goEditor() {
        this.$router.push({name:'AddressEditor'})
      },
      getAddress(userId) {
        this.$http.post(url.getAddressList,{userId: userId})
          .then( res => {
            // console.log(res)
            if(res.data.code ===200 && res.data.message.length >0 ){
                let flag = false;
                res.data.message.forEach( v => {
                  if(v.isDefault) {
                    this.addressInfo = v;
                    flag = true
                  }
                })
                if(!flag) {
                  this.addressInfo = res.data.message[0]
                }
              this.addressList = res.data.message;
              this.addressList.forEach(v => {
                v['id'] = v._id;
                v['address'] = v.province+v.city+v.county+v.addressDetail
              })
            }else if(res.data.code ===500){
              this.$toast('服务器错误');
            }
          }).catch( err => {
            console.log(err)
        })
      },
      submit() {
        if(this.addressInfo.hasOwnProperty('name')) {
          this.$http.post(url.saveOrder,{
            userId: this.addressInfo.userId,
            message: this.message,
            addressId: this.addressInfo._id,
            goods: this.goodsInfo
          }).then( res => {
            if(res.data.code ===200) {
              // console.log(res.data.orderNum)
              this.$router.push({name: 'Applay' ,query:{orderNo:encodeURI(res.data.orderNum)}})
            }
          }).catch( err => {
            console.log(err)
          })
        }else {
          this.$toast('请选择地址！')
        }
      },
      toggleAddress(item) {
        // console.log(item)
        this.addressInfo = item;
        this.showAddressList = false;
      }
    }
  }
</script>

<style scoped>
  .order-confirm {
    width: 100%;
    padding: 42px 0 0 0;

  }
  .add-address{
    font-size: 16px;
  }
  .address:after{
    content: '';
    display: block;
    height: 2px;
    background: -webkit-repeating-linear-gradient( 135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #3283fa 0, #3283fa 45%, transparent 0, transparent 50% );
    background: repeating-linear-gradient( -45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #3283fa 0, #3283fa 45%, transparent 0, transparent 50% );
    background-size: 80px;
  }
  .add-icon{
    color: #1595ff;
    padding-right: 10px;
  }
  .t-title{
    display: inline-block;
    width: 100%;
  }
  .goods-info{
    width: 100%;
    display: flex;
  }
  .goods-info .img{
    width: 5rem;
  }
  .goods-info .name{
    flex: 1;
    padding: 1rem 0 0 0.5rem;
  }
  .goods-info .name-title{
    width: 10rem;
  }
  .count-price{
    padding-top: 1rem;
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
  .address-icon{
    padding-right: 10px;
  }
  .tel {
    margin-left: 5rem;
  }
</style>
