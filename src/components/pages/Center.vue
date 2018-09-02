<template>
  <div>
    <div>
      <van-nav-bar  title="会员中心" />
    </div>
    <div class="top">
      <img :src="userInfo.photoUrl" class="top-img" @click="showUpload = true" />
      <div>{{userInfo.userName}}</div>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="会员卡" icon="idcard" is-link />
        <van-cell title="地址管理" icon="free-postage" @click="showAddressList = true" is-link  />
        <van-cell title="我的订单" icon="records" @click="$router.push('/myOrder')" is-link  />
        <van-cell title="我的收藏" icon="like" is-link />
        <van-cell title="联系我们" icon="phone" is-link  />
        <van-cell title="退出" icon="setting" is-link  @click="layout" />
      </van-cell-group>

    </div>
    <van-popup v-model="showAddressList" position="right">
      <van-nav-bar fixed left-text="返回" title="管理收货地址" fixed left-arrow @click-left="showAddressList = false" />
      <AddressList :list="addressList" @onselect="toggleAddress" :opreat="2" />
    </van-popup>
    <van-dialog v-model="showUpload" show-cancel-button title="上传头像" @confirm="upLoadImg">
      <div class="upload-icon">
        <van-uploader :after-read="readFile" :max-size="500000" @oversize="oversize" accept="image/gif, image/jpeg" multiple>
          <van-icon name="photograph" />
        </van-uploader>
        <div><img class="upload-img" :src="upLoadUrl" alt=""></div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
  import AddressList from '@/components/component/addressList.vue';
  import url from '../../serviceAPI.config';
  export default {
    name:'Center',
    components:{
      AddressList,
    },
    data() {
      return {
        userInfo:{},
        showAddressList: false,
        addressList: [],
        showUpload: false,
        upLoadUrl: '',
        file: {},//上传文件参数
      }
    },
    created() {
      if(localStorage.userInfo){
        this.userInfo = JSON.parse(localStorage.userInfo);
        this.photoUrl = this.userInfo.photoUrl;
        this.getAddress(this.userInfo.userId)
      }
    },
    methods: {
      layout() {
        this.$dialog.confirm({
          title: '提示',
          message: '确认退出吗！',
          showCancelButton: true,
        }).then(() => {
          localStorage.clear();
          this.$router.push('/')
        })
      },
      getAddress(userId) {
        this.$http.post(url.getAddressList,{userId: userId})
          .then( res => {
            // console.log(res)
            if(res.data.code ===200 && res.data.message.length >0 ){
              this.addressList = res.data.message;
              this.addressList.forEach(v => {
                v['id'] = v._id;
                v['address'] = v.province+v.city+v.county+v.addressDetail
              })
            }else if(res.data.code ===500){
              this.$toast('服务器错误');
            }
          }).catch( err => {
          console.log(err)
        })
      },
      toggleAddress(item) {
        // console.log(item)
      },
      readFile(f) {
        this.upLoadUrl = f.content;
        this.file = f.file;
      },
      upLoadImg() {
        // console.log(this.file)
        // console.log(this.file.name)
        if(!this.file.name) {
          this.$toast('请选择图片');
          return;
        }
        let param = new FormData();
        // let userId = this.userInfo.userId;
        param.append('file',this.file);
        param.append('message',this.userInfo.userId)
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; //添加请求头
        this.$http.post(url.upFile,param,config)
          .then(res =>{
            if(res.data.code === 200) {
                this.userInfo.photoUrl = res.data.path;
                localStorage.userInfo = JSON.stringify(this.userInfo);
            }
          }).catch( err => {
            console.log(err)
        })
      },
      oversize(f) {
        // console.log(f)
        this.$toast('请上传小于500kb的图片')
      }
    }

  }
</script>

<style scoped>
  .top-img{
    width:70px;
    height: 70px;
    border-radius: 50px;
  }
  .top{
    height:5rem;
    text-align: center;
    padding:2rem 0;
    background-color: #e5017d;
    color: #fff;
  }
  .login{
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding:10px;
  }
  .login div{
    flex:1;
    text-align: center;
  }
  .upload-icon{
    font-size: 2rem;
    text-align: center;
    padding: 1rem 0;
  }
  .upload-img{
    width: 3rem;
  }
</style>
