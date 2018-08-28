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
    <div class="s-list" ref="sList">
      <div class="tag-model" v-if="searchList.length == 0">
        <van-tag plain type="danger" v-for="(tag,index) in tagList" :key="tag.id"><span slot="default"  @click="onClickTag(tag.title)">{{tag.title}}</span></van-tag>
      </div>
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div  class="goods-list">
          <div class="list-item"  v-for="item in searchList" :key="item.ID">
            <goodsInfo :goodsId="item.ID" :goodsImage="item.PICTURE_COMPERSS_PATH" :goodsName="item.NAME" :goodsPrice="item.PRESENT_PRICE"></goodsInfo>
          </div>
        </div>

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
        tagList:[
          {id:'1',title:'饮料'},
          { id: '2',title: '果'},
          {id:'3',title:'奶'},
          { id:'4',title:'酒'}],
        page: 1,
        num: 10,
        searchList: [],
        loading: false, //上啦加载
        finished: true, //下拉加载完成
      }
    },
    created() {
      this.keyword = this.$route.params.keyword ? this.$route.params.keyword :'';
      if(this.keyword != ''){
        // this.getList()
      }
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight;
      let sLIist = this.$refs.sList;
      console.log(winHeight)
      sLIist.style.height = winHeight-42 + 'px';
    },
    methods: {
      onSearch() {
        if(this.keyword != ''){
          this.searchList=[]
          this.finished = false
          this.page=1
          this.onLoad()
        }
      },
      onLoad() {
        setTimeout(() => {
          this.getList();
        },1000)
      },
      getList() {
        this.$http.post(url.keywordSearch,{keyword: this.keyword,page: this.page,num: this.num})
          .then( res => {
            // console.log(res.data)
            if(res.data.code ===200 && res.data.message.length>0) {
              this.page ++;
              this.searchList = [...this.searchList,...res.data.message];
            }else  {
              this.finished = true;
            }
            this.loading = false;
          }).catch( err => {
          console.log(err)
        })
      },
      onClickTag(title) {
        // console.log(title)
        this.keyword = title;
        this.searchList=[]
        this.finished = false
        this.page=1
        this.onLoad()
      }
    }

  }
</script>

<style scoped>
  .search{
    padding: 42px 0 0 0;
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
    overflow: scroll;
  }
  .tag-model {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 20px;
  }
  .tag-model>span {
    margin-right: 2rem;
    font-size: 16px;
    padding: 5px 10px;
  }
  .goods-list{
    display: flex;
    flex-wrap: wrap;
  }
  .list-item{
    width: 50%;
  }
</style>
