<template>
    <div class="editor-address">
      <van-nav-bar fixed left-text="返回" :title="title" fixed left-arrow @click-left="goBack" />
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        :show-delete="state == 1"
        show-set-default
        show-postal
        show-search-result
        @delete="onDelete"
        @save="saveAddress"
      />
    </div>
</template>

<script>
  import url from '../../serviceAPI.config';
    export default {
        name: "AddressEditor",
      data() {
        return {
          searchResult: [],
          areaList:{},
          userId:'',
          addressInfo: {},
          title: '添加地址',
          state: 0, //0：1添加 1：编辑
        }
      },
      created() {
        this.userId = localStorage.userInfo ? JSON.parse(localStorage.userInfo).userId:'';
        this.getCity();
        if(this.$route.query.id){
          this.title ='编辑地址';
          this.state = 1;
          this.getAddress(this.$route.query.id);
        }
      },
      mounted() {

      },
      methods: {
        goBack() {
          this.$router.go(-1)
        },
        saveAddress(content) {
          // console.log(content)
          this.$http.post(url.editorAddress,{state:this.state,userId:this.userId,addressInfo: content})
            .then( res => {
              if(res.data.code == 200) {
                  this.$toast.success(this.state ==0 ?'添加地址成功':'编辑地址成功')
                  this.$router.go(-1)
              }
            }).catch( err => {
              console.log(err)
          })
        },
        onDelete(content) {
          // console.log(content)
          this.$http.post(url.moveAddress,{addressId: content._id})
            .then( res => {
              // console.log(res)
              if(res.data.code === 200 ){
                this.$toast('删除成功');
                this.$router.go(-1);
              }else {
                this.$toast('服务器错误');
              }
            }).catch( err => {
              console.log(err)
          })
        },
        onChangeDetail(val) {
          if (val) {
            this.searchResult = [{
              name: '黄龙万科中心',
              address: '杭州市西湖区'
            }];
          } else {
            this.searchResult = [];
          }
        },
        //获取省市区
        getCity() {
          this.$http.get(url.getCity)
            .then( res => {
              if(res.data.code === 200) {
                this.areaList = res.data.message.city;
                // console.log(this.areaList)
              }
            }).catch( err => {
              console.log(err)
          })
        },
        getAddress(id) {
          this.$http.post(url.addressById,{addressId: id})
            .then( res => {
              if(res.data.code == 200) {
                this.addressInfo = res.data.message[0];
              }
            }).catch( err => {
            console.log(err)
          })
        },
      }
    }
</script>

<style scoped>
.editor-address{
  padding-top: 42px;
}
</style>
