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
    // 展示开始位置 总条数小与等于每页条数展示为1开始位置
    state.pagination.firstPage = val.allPage > val.page ? (state.paginationPage-1) * val.page + 1 : 1;
    // 展示结束位置 请求的条数大于总条数展示总条数
    state.pagination.lastPage = state.paginationPage*val.page > val.allPage ? val.allPage : state.paginationPage*val.page;
    // 共多少条数据
    state.pagination.allPage = val.allPage;

    state.pagination.show = val.allPage === 0 ? false : true;
  },

  // 提交改变分页数
  [PAGINATION_PAGE](state,val){
    state.paginationPage = val;
  }
}
