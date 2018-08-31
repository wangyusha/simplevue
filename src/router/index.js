import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall';
import Register from '@/components/pages/Register';
import Login from '@/components/pages/Login';
import Goods from '@/components/pages/Goods';
import CategoryList from '@/components/pages/CategoryList';
import Cart from '@/components/pages/Cart';
import Center from '@/components/pages/Center';
import Main from '@/components/pages/Main';
import Search from '@/components/pages/Search';
import Settlement from '@/components/pages/Settlement';
import AddressEditor from '@/components/pages/AddressEditor';
import MyOrder from '@/components/pages/MyOrder';
import Applay from '@/components/pages/Applay';


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/main' },
    {path: '/main',name:'Main',component:Main,
    children: [
      {
        path: '/',
        name: 'ShoppingMall',
        component: ShoppingMall
      },{
        path: 'CategoryList',
        name: 'CategoryList',
        component: CategoryList
      },{
        path: 'Cart',
        name: 'Cart',
        component: Cart
      },{
        path: 'center',
        name: 'Center',
        component: Center,
        meta: {
          verify: true
        }
      }
    ]},
    {
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/goods',
      name: 'Goods',
      component: Goods
    },{
      path: '/search',
      name: 'Search',
      component: Search
    },{
      path: '/settlement',
      name: 'Settlement',
      component: Settlement,
      meta: {
        verify: true
      }
    },{
      path: '/addressEditor',
      name: 'AddressEditor',
      component: AddressEditor,
      meta: {
        verify: true
      }
    }, {
      path: '/myOrder',
      name: 'MyOrder',
      component: MyOrder,
      meta: {
        verify: true
      }
    },
    {
      path: '/applay',
      name: 'Applay',
      component: Applay,
      meta: {
        verify: true
      }
    }
  ]
})
