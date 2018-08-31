<template>
  <div>
    <van-nav-bar left-text="返回"  @click-left="goBack"  left-arrow  title="支付" />
    <van-radio-group v-model="apRadio">
      <van-cell-group>
        <van-cell title="支付宝" clickable center @click="apRadio = 'z'">
          <span class="a-icon" slot="icon"><van-icon name="alipay"/></span>
          <van-radio name="z" />
        </van-cell>
        <van-cell title="微信" clickable center @click="apRadio = 'w'">
          <span class="a-icon wechat" slot="icon"><van-icon name="wechat"/></span>
          <van-radio name="w" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="a-btn" @click="sumbit">支付</div>
  </div>
</template>

<script>
  export default {
    name: "Applay",
    data() {
      return {
        apRadio: 'z',
        orderNum:''
      }
    },
    created() {
      this.orderNum = this.$route.query.orderNo;
      // console.log(this.orderNum)

    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      sumbit() {
        console.log(this.apRadio)
        this.$http.post('/api',{
          appkey:'984bbe3c72f44ab59530b9c3e125d33e',
          method: 'wap',
          sign:'9BF3162452BBD9736A18EE44EF895DC3',
          timestamp: new Date().getTime() +'',
          version:'1.0',
          outTradeNo: this.orderNum,
          payType: '1'
        }).then( res=> {
            console.log(res)
        }).catch( err=> {
            console.log(err)
        })
      }

    }
  }
</script>

<style scoped>
.a-icon{
  font-size: 2rem;
  padding-right: 10px;
  color: #108ee9 ;
}
  .wechat{
    color:#62b900;
  }
  .a-btn{
    width: 100%;
    height: 50px;
    text-align: center;
    background-color: #F15353;
    color: #fff;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
