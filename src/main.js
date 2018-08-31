// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Navigation from 'vue-navigation'
import {Button, Row, Col,Icon ,Swipe, SwipeItem,Lazyload,List,NavBar,
  Field,Toast,Tab, Tabs, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn,
  PullRefresh,Stepper,Tabbar,AddressEdit, TabbarItem,Checkbox, CheckboxGroup, Dialog,
  Cell, CellGroup,Sku,Search,Tag,ImagePreview,AddressList,Popup,Card,RadioGroup, Radio} from 'vant';
import './uitil/rem.js';
import axios from 'axios';

Vue.use(Button).use(Row).use(Col).use(Icon).use(AddressEdit)
  .use(Swipe).use(SwipeItem).use(Lazyload, {loading:'',error:'',preload:''})
  .use(List).use(NavBar).use(Field).use(Toast).use(Tab).use(Tabs).use(GoodsAction)
  .use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(PullRefresh).use(Stepper)
  .use(Tabbar).use(TabbarItem).use(Checkbox).use(CheckboxGroup).use(Dialog)
  .use(Cell).use(CellGroup).use(Sku).use(Search).use(Tag).use(ImagePreview)
  .use(AddressList).use(Popup).use(Card).use(RadioGroup).use(Radio);
Vue.use(Navigation, {router});

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

router.beforeEach((to,from,next) => {
  if(to.meta.verify) {
    if(!localStorage.userInfo) {
      next({path:'/login', query: {url: to.fullPath}})
    }else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
