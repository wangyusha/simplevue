<template>
  <div id="app">
    <!--　<transition :name="transitionName">-->
    <!--　　　<navigation>-->
          <router-view class="Router"/>
        <!--</navigation>-->
    <!--　</transition>-->
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
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
    watch: {
      // '$route' (to, from) {
      //   let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
      //   console.log(this.$router.isBack)
      //   if(isBack) {
      //     this.transitionName = 'slide-right'
      //   } else {
      //     this.transitionName = 'slide-left'
      //   }
      //   this.$router.isBack = false
      // }
    }
  }
</script>

<style >
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


  .slide-left-leave-to,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
</style>
