<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerUser">马上注册</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import url from '@/serviceAPI.config.js';
    export default {
        name: "register",
      data() {
          return {
            username: '',
            password: ''
          }
      },
      methods: {
          goBack() {
            this,$router.go(-1);
          },
        registerUser() {
            console.log(this.username,this.password)
            this.$http({
              url: url.registerUser,
              method: 'post',
              data:{
                userName:this.username,
                password:this.password
              }
            })
              .then(response => {
                  if(response.data.code=200){
                    this.$toast.success('注册成功')
                  }else {
                    this.$toast.fail('注册失败')
                  }
              })
              .catch((error) => {
                this.$toast.fail('注册失败')
              })

        }

      }
    }
</script>

<style scoped>
  .register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .register-button{
    padding-top:10px;
  }
</style>
