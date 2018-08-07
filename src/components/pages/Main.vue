<template>
    <div>
      <div class="main-box">
        <router-view/>
      </div>
      <van-tabbar v-model="active" :style="{zIndex:999}" :fixed="true">
        <van-tabbar-item icon="shop" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="records" to="/CategoryList">列表页</van-tabbar-item>
        <van-tabbar-item icon="cart" to="/Cart">购物车</van-tabbar-item>
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
      }
    }
</script>

<style scoped>

</style>
