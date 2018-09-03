<template>
  <div> <!--search bar layout-->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3" ><van-icon name="location" class="location-icon"  @click="$router.push('/map')"/></van-col>
        <van-col span="16">
          <div @click="goSearch">
            <input type="text" class="search-input" disabled v-model="keyword" />
          </div>
        </van-col>
        <van-col span="5">
          <van-button size="mini"  @click="goSearch">查找</van-button>
        </van-col>

      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        locationIcon: require("../../assets/logo.png"),
        keyword:''
      };
    },
    methods: {
      getLocation() {
        if (navigator.geolocation){
          console.log('111')
          navigator.geolocation.getCurrentPosition(this.successfulCallback,this.failCallback);
        }else{
          alert("浏览器不支持地理定位。");
        }
      },
      successfulCallback(position) {
        // console.log('222222')
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        alert(longitude)
      },
      failCallback(error) {
        var text ;
        switch(error.code){
          case error.PERMISSION_DENIED:
            text ="用户拒绝对获取地理位置的请求。";
            break;
          case error.POSITION_UNAVAILABLE:
            text ="位置信息是不可用的。";
            break;
          case error.TIMEOUT:
            text ="请求用户地理位置超时。";
            break;
          case error.UNKNOWN_ERROR:
            text ="未知错误。";
            break;
        }
      },
      goSearch() {
        // console.log(this.keyword)
        // if(this.keyword != '') {
          this.$router.push({name:'Search'})
        // }

      }
    }
  };
</script>

<style scoped>
  .search-bar {
    height: 2.2rem;
    width: 100%;
    background-color: #e5017d;
    line-height: 2.2rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
  .search-input {
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
  }
  .location-icon {
    padding-top: 0.7rem;
    padding-left: 1.1rem;
    color: #fff;
  }
</style>
