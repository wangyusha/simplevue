<template>
  <div>
    <van-nav-bar
      title="用户登录"
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
        :error-message="usernameErrorMsg"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" size="large" @click=" loginAction" :loading="openLoading">登录</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import url from '@/serviceAPI.config.js';
    export default {
        name: "login",
      data() {
          return {
            username: '',
            password: '',
            openLoading: false,
            usernameErrorMsg:'',   //当用户名出现错误的时候
            passwordErrorMsg:'',   //当密码出现错误的时候
          }
      },
      created() {
        if(localStorage.userInfo){
          this.$toast.success('您已经登录过了')
          this.$router.push('/')
        }
      },
      methods: {
          goBack() {
            this,$router.go(-1);
          },
        loginUser() {
            this.openLoading = true;
            this.$http({
              url: url.loginUser,
              method: 'post',
              data:{
                userName:this.username,
                password:this.password
              }
            })
              .then(response => {
                  if(response.data.code==200 && response.data.message){
                    new Promise((resolve,reject)=>{
                      localStorage.userInfo= {userName:this.username}
                      setTimeout(()=>{resolve()},500)
                    }).then(()=>{
                      this.$toast.success('登录成功')
                      this.$router.push('/')
                    }).catch(err=>{
                      this.$toast.fail('登录状态保存失败')
                      console.log(err)
                    })
                  }else {
                    this.$toast.fail(response.data.message)
                    this.openLoading = false;
                  }
              })
              .catch((error) => {
                this.$toast.fail('登录失败');
                this.openLoading = false;
              })

        },
        checkForm(){
          let isOk= true
          if(this.username.length<5){
            this.usernameErrorMsg="用户名不能小于5位"
            isOk= false
          }else{
            this.usernameErrorMsg=''
          }
          if(this.password.length<6){
            this.passwordErrorMsg="密码不能少于6位"
            isOk= false
          }else{
            this.passwordErrorMsg=''
          }
          return isOk
        },
        loginAction() {
            this.checkForm() && this.loginUser();
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
