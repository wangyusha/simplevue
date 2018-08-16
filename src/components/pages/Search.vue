<template>
  <div class="search">
    <div class="s-top">
      <div class="back" @click="$router.go(-1)"> <van-icon name="arrow-left" />返回</div>
      <van-search class="s-model"
        v-model="keyword"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        background="#e5017d"
      >
        <div class="s-btn" slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <div class="s-list">
      <van-list>
        <van-col span="12" v-for="item in searchList" :key="item.ID">
          <goodsInfo :goodsId="item.ID" :goodsImage="item.PICTURE_COMPERSS_PATH" :goodsName="item.NAME" :goodsPrice="item.PRESENT_PRICE"></goodsInfo>
        </van-col>
      </van-list>
    </div>
  </div>
</template>

<script>
  import url from '../../serviceAPI.config'
  import goodsInfo from '../component/goodInfoComponent.vue'
  export default {
    name: "Search",
    components: {
      goodsInfo
    },
    data() {
      return {
        keyword:'',
        page: 1,
        num: 10,
        searchList: []
      }
    },
    created() {
      this.keyword = this.$route.params.keyword ? this.$route.params.keyword :'';
      if(this.keyword != ''){
        this.getList()
      }
    },
    methods: {
      onSearch() {
        if(this.keyword != ''){
          this.getList()
        }
      },
      getList() {
        this.$http.post(url.keywordSearch,{keyword: this.keyword,page: this.page,num: this.num})
          .then( res => {
            console.log(res.data)
            if(res.data.code ===200) {
              this.searchList = res.data.message;
            }else  {
              this.$toast.fail('服务器错误');
            }
          }).catch( err => {
            console.log(err)
        })
      }
    }

  }
</script>

<style scoped>
  .search{
    padding: 50px 0 20px 0;
  }
  .s-top{
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #e5017d;
    position: fixed;
    top:0;
    left: 0;
  }
  .back {
    color: #fff;
    font-size: 14px;
    padding-left: 5px;
  }
  .s-model{
    flex: 1;
  }
.s-btn{
  color: #fff;
  padding: 0 10px;
}
  .s-list{
    font-size: 14px;
    text-align: center;
    color: #333;
  }
</style>
