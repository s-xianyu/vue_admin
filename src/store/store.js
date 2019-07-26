import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex);

const state = {
  loginStatus:false,
  loading:true,
  pagination:{ //分页
    page:0,
    firstPage:0, //开始位置
    lastPage:0, //结束位置
    allPage:0, //一共多少数据
    show:true, //是否展示提示 ,没有数据的时候不展示
  },
  paginationPage:1, //分页默认当前第一页
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
