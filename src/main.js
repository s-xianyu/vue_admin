// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../static/style/common.scss'
import ElementUi from 'element-ui'
import './config/allAixin'
import 'element-ui/lib/theme-chalk/index.css';

import store from './store/store'

import router from './router'

import * as filterName from './config/filter.js' // 全局过滤器

import axios from 'axios'
Vue.prototype.$ajax = axios; //用$ajax代替axios
Vue.prototype.HOST = '/api'; //配置跨域

import { getCookie } from './config/mUtils' // 调用getStore

Vue.use(ElementUi);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 需要权限,进一步进行判断
    let isLogin = getCookie('hx2car_admin'); // 获取
    console.log(isLogin);
    if (isLogin) { // 获取当前的user_id是否存在
      next()
    } else { // 如果没有权限,重定向到登录页,进行登录
      next({
        path: '/login'
        // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else { // 不需要权限 直接跳转
    next()
  }
});

//过滤器统一处理函数
Object.keys(filterName).forEach(key =>{ //filterName为传进来的过滤器名称
  Vue.filter(key,filterName[key]);
});

/* eslint-disable no-new */
new Vue({
  el: '#hx',
  router,
  store,
  components: { App },
  template: '<App/>'
});
