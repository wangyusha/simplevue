<template>
  <div>
    <div>
      <van-nav-bar  title="会员中心" />
    </div>
    <div class="top">
      <img :src="userInfo.photoUrl" class="top-img" />
      <div>{{userInfo.userName}}</div>
    </div>
    <div class="login">
      <div><van-button type="primary" @click="$router.push('/login')">我要登录</van-button></div>
      <div><van-button type="primary" @click="$router.push('/register')">我要注册</van-button></div>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="会员卡" is-link />
        <van-cell title="地址管理" is-link  />
        <van-cell title="我的订单" is-link  />
        <van-cell title="会员权益" is-link />
        <van-cell title="联系我们" is-link  />
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
