<template>
    <div class="category">
      <div class="navbar-div">
        <van-nav-bar   title="类别列表" />
      </div>
      <div>
        <van-row>
          <van-col span="6">
            <div id="leftNav">
              <ul>
                <li @click="clickCategory(index,item.ID)" :class="{categoryActive: categoryIndex == index}" v-for="(item,index) in category" :key="index">
                  {{item.MALL_CATEGORY_NAME}}
                </li>
              </ul>
            </div>
          </van-col>
          <van-col span="18">
            <div class="tabCategorySub">
              <van-tabs v-model="active" @click="onClickCategorySub">
                <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                </van-tab>
              </van-tabs>
            </div>
            <div id="list-div">
              <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  @load="onLoad"
                >
                  <div class="list-item" @click="goGoodInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                    <div class="list-item-img"><img v-lazy="item.IMAGE1" width="100%"/></div>
                    <div class="list-item-text">
                      <div>{{item.NAME}}</div>
                      <div class="">￥{{item.ORI_PRICE | moneyFilter}}</div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
</template>

<script>
    import url from '../../serviceAPI.config';
    import {toMoney} from '@/filter/moneyFilter.js';
    export default {
        name: "CategoryList",
        filters: {
          moneyFilter(money) {
            return toMoney(money)
          }
        },
        data() {
          return {
            category: [],
            categoryIndex: 0,
            categorySub: [],
            active: 0,
            list:[],
            loading: false, //上啦加载
            finished: false, //下拉加载完成
            isRefresh:false, //下拉加载
            page: 1,
            num: 10,
            goodList: [],
            categorySubId:'' //商品子分类ID
          }
        },
        created() {
          if(this.$route.query.CategoryId) {
            this.getCategory(true);
            this.clickCategory(this.$route.query.CategoryId-1,this.$route.query.CategoryId)
          }else {
            this.getCategory(false);
          }
        },
        mounted() {
          let winHeight = document.documentElement.clientHeight;
          // console.log(winHeight)
          document.getElementById("leftNav").style.height= winHeight-46 +'px';
          document.getElementById('list-div').style.height=winHeight-140 +'px'
        },
        methods: {
          getCategory(isId) {
            this.$http.get(url.getCategoryList)
              .then( res => {
                // console.log(res);
                if(res.data.code == 200 && res.data.message) {
                  this.category = res.data.message;
                  if(!isId) {
                    this.getCategorySubByCategoryId(this.category[0].ID);
                  }
                }else {
                  this.$toast('服务器错误')
                }
              }).catch( err => {
                console.log(err)
            })
          },
          clickCategory(index,categoryId) {
            this.categoryIndex = index;
            this.page=1;
            this.finished = false;
            this.goodList=[];
            this.getCategorySubByCategoryId(categoryId);
          },
          getCategorySubByCategoryId(categoryId) {
            this.$http.post(url.getCategorySubList,{categoryId: categoryId})
              .then( res => {
                // console.log(res)
                if(res.data.code == 200 && res.data.message ){
                  this.categorySub=res.data.message;
                  this.active = 0;
                  // console.log(this.categorySub)
                  this.categorySubId = this.categorySub[0].ID;
                  this.getGoodList();
                }else{
                  this.$toast('服务器错误，数据取得失败')
                }
              }).catch(err => {
                console.log(err)
            })
          },
          onLoad() {
            setTimeout(() => {
              this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
              // console.log(this.categorySubId)
              this.getGoodList()
            },1000)
          },
          onRefresh(){
            setTimeout(() => {
              this.isRefresh = false;
              this.finished = false;
              this.goodList=[];
              this.page=1
              this.onLoad()
            }, 500);
          },
          getGoodList() {
            this.$http.post(url.getGoodsListByCategorySubID,{
              page: this.page,
              num: this.num,
              categorySubId: this.categorySubId
            }).then( res => {
              // console.log(res)
              if(res.data.code == 200 && res.data.message.length > 0) {
                this.page ++ ;
                this.goodList = [...this.goodList,...res.data.message];
              } else {
                this.finished = true;
              }
              this.loading = false;
            }).catch( err => {
              console.log(err)
            })
          },
          onClickCategorySub(index,title){
            this.categorySubId = this.categorySub[index].ID;
            // console.log(this.categorySubId)
            this.goodList=[]
            this.finished = false
            this.page=1
            this.onLoad()
          },
          goGoodInfo(id) {
            // console.log(id)
            this.$router.push({name:'Goods',query:{goodsId: id}})
          }
        }
    }
</script>

<style scoped>
  #leftNav{
    background-color: #e5017d;
    color: #fff;
  }
  #leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
  }
  .categoryActive{
    background-color: #fff;
    color: #e5017d;
  }
  .list-item{
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
  }
  #list-div{
    overflow: scroll;
  }
  .list-item-img{
    flex:8;
  }
  .list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
  }

</style>
