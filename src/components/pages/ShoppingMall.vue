<template>
    <div>
      <!--搜索-->
        <v-search></v-search>
      <!--轮播-->
      <div class="swiper-area">
        <van-swipe :autoplay="2000">
          <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
            <img :src="banner.imageUrl" width="100%"/>
          </van-swipe-item>
        </van-swipe>
      </div>

    </div>
</template>

<script>
import vSearch from '../common/Search.vue';
export default {
    name: "ShoppingMall",
    components: {
        vSearch
    },
  data() {
      return {
        bannerPicArray:[
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'},
        ]
      }
  }
};
</script>

<style scoped>
  .swiper-area{
    width:20rem;
    clear:both;
  }
</style>
