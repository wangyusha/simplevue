<template>
  <div >
    <!--搜索-->
    <v-search></v-search>
    <!--轮播-->
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="banner in bannerPicArray" :key="banner.goodsId">
          <img :src="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品分类栏目 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <!--swiper-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--floor one area-->
    <div class="floor">
      <floorComponent :floorData="floor1" :floorTitle="floorName.floor1" :num="1"></floorComponent>
      <floorComponent :floorData="floor2" :floorTitle="floorName.floor2" :num="2"></floorComponent>
      <floorComponent :floorData="floor3" :floorTitle="floorName.floor3" :num="3"></floorComponent>
    </div>
  </div>
</template>

<script>

import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import vSearch from "../common/Search.vue";
import floorComponent from '../component/floorComponent.vue'
export default {
    name: "ShoppingMall",
    components: {
        vSearch,
        swiper,
        swiperSlide,
        floorComponent,
    },
    data() {
        return {
            bannerPicArray: [],
            category: [],
            adBanner: "",
            recommendGoods: [],
            swiperOption: {},
            floor1: [],
            floor2:[],
            floor3:[],
            floorName:{}
        };
    },
    created() {
        this.$http
            .get(
                "https://www.easy-mock.com/mock/5ae268b700247c2aa1efe461/SimpleVue/homeList"
            )
            .then(res => {
                console.log(res.data);
                let data = res.data.data;
                // 轮播banner
                this.bannerPicArray = data.slides;
                this.category = data.category;
                // 广告banner
                this.adBanner = data.advertesPicture;
                this.recommendGoods = data.recommend;

                this.floor1 = data.floor1;
                this.floor2 = data.floor2;
                this.floor3 = data.floor3;

                this.floorName = data.floorName;

            })
            .catch(err => {});
    }
};
</script>

<style scoped>
.swiper-area {
    width: 20rem;
    clear: both;
}

.type-bar {
    background-color: #fff;
    margin: 0 0.3rem 0.3rem 0.3rem;
    border-radius: 0.3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type-bar div {
    padding: 0.3rem;
    font-size: 12px;
    text-align: center;
}
.ad-banner {
    background-color: #f1efef;
    padding: 0.5rem 0.2rem;
}
.recommend-area {
    background-color: #fff;
    margin-top: 0.3rem;
}
.recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: 0.2rem;
    color: #e5017d;
}
.recommend-body {
    border-bottom: 1px solid #eee;
}

.recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
}
.floor-anomaly {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}
.floor-anomaly div {
    width: 10rem;

    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.floor-one {
    border-right: 1px solid #ddd;
}
.floor-two {
    border-bottom: 1px solid #ddd;
}

</style>
