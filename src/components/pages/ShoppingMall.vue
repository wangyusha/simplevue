<template>
  <div class="home-shop">
    <!--搜索-->
    <v-search></v-search>
    <!--轮播-->
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="banner in bannerPicArray" :key="banner.goodsId">
          <img :src="banner.image" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品分类栏目 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index" @click="$router.push({name:'CategoryList',query: {CategoryId: cate.mallCategoryId}})">
        <img v-lazy="cate.image" width="90%"/>
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
              <img :src="item.image" width="80%"/>
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
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
            <van-col span="12" v-for="item in hotGoods" :key="item.goodsId">
              <goodsInfo :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfo>
            </van-col>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>

  import "swiper/dist/css/swiper.css";
  import {swiper, swiperSlide} from "vue-awesome-swiper";
  import url from '../../serviceAPI.config'
  import vSearch from "../common/Search.vue";
  import floorComponent from '../component/floorComponent.vue'
  import goodsInfo from '../component/goodInfoComponent.vue'
  export default {
    name: "ShoppingMall",
    components: {
      vSearch,
      swiper,
      swiperSlide,
      floorComponent,
      goodsInfo
    },
    data() {
      return {
        bannerPicArray: [],
        category: [],
        adBanner: "",
        recommendGoods: [],
        swiperOption: {},
        floor1: [],
        floor2: [],
        floor3: [],
        floorName: {},
        hotGoods:[],
      };
    },
    created() {
      this.$http
        .get(
          url.getShoppingMallInfo
        )
        .then(res => {
          // console.log(res.data);
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
        //  热卖商品
          this.hotGoods = data.hotGoods;
          // console.log(data.hotGoods)
        })
        .catch(err => {
        });
    }
  };
</script>

<style scoped>
  .home-shop{
    padding: 2.2rem 0 50px 0;
  }
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
    flex: 1;
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
  .hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
  }
  .hot-area .hot-title{
    text-align: center;
    color: #e5017d;
    background-color: #f1efef;
    padding: 0.5rem 0;
    font-size: 18px;
  }
  .hot-area .hot-name{
    height: 3rem;
  }
</style>
