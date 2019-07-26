import {
  GETLOGIN,
  COMMITS_PAGE,
  PAGINATION_PAGE
} from './mutation-type'

export default {
  [GETLOGIN] (state, info) {
    console.log(info);
  },
  // 提交分页信息
  [COMMITS_PAGE](state,val){
    // 每页展示几条
    state.pagination.page = val.page;
    // 展示开始位置
    state.pagination.firstPage = (state.paginationPage-1) * val.page + 1;
    // 展示结束位置
    state.pagination.lastPage = state.paginationPage*val.page > val.allPage ? val.allPage : state.paginationPage*val.page;
    // 共多少条数据
    state.pagination.allPage = val.allPage;

    if(state.pagination.allPage <= 0){
      state.pagination.show = false;
    }
  },

  // 提交改变分页数
  [PAGINATION_PAGE](state,val){
    state.paginationPage = val;
  }
}
