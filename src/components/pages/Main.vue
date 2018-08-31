<template>
  <div>
    <div class="main-box">
      <transition :name="transitionName">
        　<navigation>
        <router-view class="Router"/>
      </navigation>
      </transition>
    </div>
    <van-tabbar v-model="active" :style="{zIndex:999}" :fixed="true" @change="changTabbar">
      <van-tabbar-item icon="shop" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="records" replace>列表页</van-tabbar-item>
      <van-tabbar-item icon="cart" replace>购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" replace>会员中心</van-tabbar-item>
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
        transitionName: 'slide-right'  // 默认动态路由变化为slide-right
      }
    },
    created () {
      // bind event ， 更多参数移步vue-navigation
      this.$navigation.on('forward', (to, from) => {
        this.transitionName = 'slide-left'
      })
      this.$navigation.on('back', (to, from) => {
        this.transitionName = 'slide-right'
      })
    },
    mounted() {
      // console.log(this.active)
      // this.changTabbar(this.active)
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
            this.$router.push({name: 'Center'});
            break;
        }
      }
    },
    watch: {
      $route(to,from) {
        switch (to.name) {
          case 'ShoppingMall' :
            this.active = 0;
            break;
          case 'CategoryList' :
            this.active = 1;
            break;
          case 'Cart' :
            this.active = 2;
            break;
          case 'Center' :
            this.active = 3;
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .Router {
    position: absolute;
    width: 100%;
    transition: all .3s ease;
  }


  .slide-left-enter,
  .slide-right-leave-to {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
</style>
