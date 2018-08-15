<template>
    <div>
      <div class="main-box">
        <router-view/>
      </div>
      <van-tabbar v-model="active" :style="{zIndex:999}" :fixed="true" v-if="isShow">
        <van-tabbar-item icon="shop" to="/main">首页</van-tabbar-item>
        <van-tabbar-item icon="records" to="/main/CategoryList">列表页</van-tabbar-item>
        <van-tabbar-item icon="cart" to="/main/Cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
          return {
            active: 0,
            isShow: true,
          }
        },
      methods: {
          changTabbar(active) {
            switch (active) {
              case 0 :
                this.$router.push({name: 'ShoppingMall'});
                break;
              case 1 :
                this.$router.push({name: 'CategoryList'});
                break;
              case 2 :
                this.$router.push({name: 'Cart'});
                break;
              case 3 :
                break;
            }
          }
      },
      watch: {
          $route(to,from) {
            console.log(to,from)
            // if(to.name == 'Cart') {
            //   this.isShow = false;
            // }else {
            //   this.isShow = true;
            // }
            switch (to.name) {
              case 'ShoppingMall' :
                this.active = 0;
                this.isShow = true;
                break;
              case 'CategoryList' :
                this.active = 1;
                this.isShow = true;
                break;
              case 'Cart' :
                this.active = 2;
                this.isShow = false;
                break;
              case 3 :
                break;
            }
          }
      }
    }
</script>

<style scoped>

</style>
