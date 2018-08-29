const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/";
const LOCALURL =  "http://192.168.1.3:3000/";
const URL = {
  getShoppingMallInfo:BASEURL+'index',
  getGoodsInfo:BASEURL+'getGoodsInfo',
  registerUser:LOCALURL+'register',   //用户注册接口
  loginUser:LOCALURL + 'login',  //登录接口
  getDetailGoodsInfo: LOCALURL + 'getDetailGoodsInfo', //商品详情接口
  getCategoryList: LOCALURL + 'getCategoryList', //读取大类别,
  getCategorySubList: LOCALURL + 'getCategorySubList', //子类别,
  getGoodsListByCategorySubID: LOCALURL + 'getGoodsListByCategorySubID', //小类别商品信息
  userAppraise: LOCALURL +'userAppraise', //评论商品
  getAppraise: LOCALURL +'getAppraise', //评论列表
  keywordSearch: LOCALURL +'keywordSearch', //搜索数据
  getCity: LOCALURL + 'getCity', //获取省市区
  editorAddress: LOCALURL + 'editorAddress', //添加或编辑地址
  getAddressList: LOCALURL + 'getAddressList', //获取地址列表
  saveOrder: LOCALURL + 'saveOrder', //提交订单

}

export default URL;
