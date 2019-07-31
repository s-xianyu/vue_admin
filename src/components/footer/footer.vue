<template>
  <div class="footer">
    <div class="left">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagination.page"
        layout="prev, pager, next, jumper"
        :total="pagination.allPage">
      </el-pagination>
    </div>
    <div class="right">
      <span v-if="pagination.show" class="f14">显示第<font>{{pagination.firstPage}}</font>条到第<font>{{pagination.lastPage}}</font>条记录，一共<font>{{pagination.allPage}}</font>条</span>
      <span v-else class="f14">暂无数据</span>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations,mapGetters } from 'vuex';
  export default {
    data() {
      return {
        msg: 'footer',
        currentPage:1
      }
    },
    watch:{
      _getPagination(val){
        this.currentPage = val;
      }
    },
    computed:{
      ...mapState(['pagination']),
      ...mapGetters(['_getPagination']),
    },
    methods:{
      ...mapMutations(['PAGINATION_PAGE']),
      handleCurrentChange(val) {
        this.PAGINATION_PAGE(val);
      },
    }
  }
</script>

<style lang="scss" scoped>
@import "../../../static/style/common";
.footer{
  @include flexCenter;
  @include wh(100%,60px);
  .left{
    flex:1;
    display: flex;
    justify-content: flex-start;
  }
  .right{
    flex:1;
    display: flex;
    justify-content: flex-end;
    font{
      color:#f60;
      display: inline-block;
      margin:0 5px;
    }
  }
}
</style>
