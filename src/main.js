// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Row, Col,Icon ,Swipe, SwipeItem,Lazyload,List,NavBar,Field,Toast} from 'vant';
import './uitil/rem.js';
import axios from 'axios';

Vue.use(Button).use(Row).use(Col).use(Icon)
  .use(Swipe).use(SwipeItem).use(Lazyload, {loading:'',error:'',preload:''})
  .use(List).use(NavBar).use(Field).use(Toast);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
