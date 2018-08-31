<template>
  <div>
    <div>
      <van-nav-bar  title="会员中心" />
    </div>
    <div class="top">
      <img :src="userInfo.photoUrl" class="top-img" />
      <div>{{userInfo.userName}}</div>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="会员卡" icon="idcard" is-link />
        <van-cell title="地址管理" icon="free-postage" is-link  />
        <van-cell title="我的订单" icon="records" @click="$router.push('/myOrder')" is-link  />
        <van-cell title="会员权益" icon="like" is-link />
        <van-cell title="联系我们" icon="phone" is-link  />
        <van-cell title="退出" icon="setting" is-link  @click="layout" />
      </van-cell-group>

    </div>

  </div>
</template>

<script>
  export default {
    name:'Center',
    data() {
      return {
        userInfo:{}
      }
    },
    created() {
      if(localStorage.userInfo){
        this.userInfo = JSON.parse(localStorage.userInfo)
      }
    },
    methods: {
      layout() {
        this.$dialog.confirm({
          title: '提示',
          message: '确认退出吗！',
          showCancelButton: true,
        }).then(() => {
          localStorage.clear();
          this.$router.push('/')
        })
      }
    }

  }
</script>

<style scoped>
  .top-img{
    width:70px;
    height: 70px;
    border-radius: 50px;
  }
  .top{
    height:5rem;
    text-align: center;
    padding:2rem 0;
    background-color: #e5017d;
    color: #fff;
  }
  .login{
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding:10px;
  }
  .login div{
    flex:1;
    text-align: center;
  }
</style>
