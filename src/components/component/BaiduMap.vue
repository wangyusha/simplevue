<template>
  <div>
    <van-nav-bar left-text="返回"   @click-left="goback"  title="地图" />
    <div class="baidumap" id="allmap">
    </div>
  </div>
</template>

<script>
  import BMap from 'BMap';
  import BMapSymbolSHAPEPOINT from 'BMap_Symbol_SHAPE_POINT'
  export default {
    name: "baidu-map",
    mounted () {
      let minHeight = document.documentElement.clientHeight;
      document.getElementById('allmap').style.height = minHeight - 46 + 'px';
      this.baiduMap()
    },
    methods: {
      // 返回
      goback () {
        this.$router.go(-1)
      },
      baiduMap () {
        var map = new BMap.Map('allmap')
        var point = new BMap.Point(116.404, 39.915)
        map.centerAndZoom(point, 12)
        var marker = new BMap.Marker(point)  // 创建标注
        map.addOverlay(marker)              // 将标注添加到地图中
        map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_LARGE}));
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        map.addControl(new BMap.GeolocationControl());
        map.setCurrentCity("武威");
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            // alert('您的位置：'+r.point.lng+','+r.point.lat);
          }
          else {
            // alert('failed'+this.getStatus());
          }
        });
      }
    }
  }
</script>

<style scoped>
.baidumap{
  height: 600px;
}
</style>
