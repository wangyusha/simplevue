<template>
    <div class="editor-address">
      <van-nav-bar fixed left-text="返回" title="添加地址" fixed left-arrow @click-left="goBack" />
      <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-postal
        show-search-result
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
          userId:''
        }
      },
      created() {
        this.userId = localStorage.userInfo ? JSON.parse(localStorage.userInfo).userId:'';
        this.getCity();
      },
      methods: {
        goBack() {
          this.$router.go(-1)
        },
        saveAddress(content) {
          // console.log(content)
          this.$http.post(url.editorAddress,{state:0,userId:this.userId,addressInfo: content})
            .then( res => {
              if(res.data.code == 200) {
                this.$toast.success('添加地址成功')
                this.$router.push('/Settlement')
              }
            }).catch( err => {
              console.log(err)
          })
        },
        onDelete() {
          this.$toast('delete');
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
        }
      }
    }
</script>

<style scoped>
.editor-address{
  padding-top: 42px;
}
</style>
