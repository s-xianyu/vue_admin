<template>
  <div class="CarManUserGridPanel">
    <div class="menu">
      <div class="content">
        <div class="left">
          <span class="span">总计</span>
          <span class="span">新增车销客</span>
          <span class="span">运营数据统计</span>
          <span class="span">导出EXCEL</span>
        </div>
        <div class="right">
          <el-input v-model="companyName" size="small" placeholder="公司名"></el-input>
          <el-input style="margin:0 15px;" v-model="loginName" size="small" placeholder="车销客登录名"></el-input>
          <el-input v-model="hxName" size="small" placeholder="华夏账号"></el-input>
          <el-button class="search" icon="el-icon-search" circle @click="getSearch"></el-button>
          <el-button type="danger" size="small" round @click="delSearch">重置</el-button>
        </div>
      </div>
    </div>
    <el-container style="border: 1px solid #eee">
      <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
        <el-main>
          <el-table
            v-loading="loading"
            :data="list" @selection-change="handleSelectionChange"
            style="width: 100%"
            :height="winHeight">
            <el-table-column align="center" type="selection" fixed sortable width="55">
            </el-table-column>
            <el-table-column align="center" type="index" fixed label="..." width="55">
            </el-table-column>
            <el-table-column align="center" prop="create_time" sortable label="创建时间" width="180">
            </el-table-column>
            <el-table-column align="left" prop="company" sortable label="公司名" width="200">
            </el-table-column>
            <el-table-column align="center" prop="mobile" sortable label="车销客登记名" width="140">
            </el-table-column>
            <el-table-column align="center" prop="verification_state" sortable label="认证" width="100">
            </el-table-column>
            <el-table-column align="center" prop="areacode" sortable label="省市" width="100">
            </el-table-column>
            <el-table-column align="center" prop="ygcount" sortable label="员工数" width="100">
              <template slot-scope="scope">
                <router-link class="ygcount" title="查看" tag="span" to="/">{{scope.row.ygcount}}</router-link>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="" sortable label="华夏账号" width="140">
            </el-table-column>
            <el-table-column align="center" prop="" sortable label="第三方关联" width="120">
              <template slot-scope="scope">
                <router-link class="ygcount" tag="span" to="/">查看</router-link>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="khcount" sortable label="客户总数" width="100">
            </el-table-column>
            <el-table-column align="center" prop="kccar" sortable label="库存车辆" width="100">
            </el-table-column>
            <el-table-column align="center" prop="xsddcount" sortable label="销售订单" width="100">
            </el-table-column>
            <el-table-column align="center" prop="sgpgcount" sortable label="收购评估订单" width="140">
            </el-table-column>
            <el-table-column align="center" prop="yxtgcount" sortable label="营销推广订单" width="140">
            </el-table-column>
            <el-table-column align="center" prop="lmcount" sortable label="车企联盟" width="100">
            </el-table-column>
            <el-table-column align="center" prop="wtcount" sortable label="问题反馈" width="100">
            </el-table-column>
            <el-table-column align="center" prop="modtime" sortable label="使用时间" width="100">
            </el-table-column>
            <el-table-column align="center" prop="real_name" sortable label="客服" width="100">
            </el-table-column>
            <el-table-column align="center" prop="hxloginname" sortable label="查询到的华夏" width="140">
            </el-table-column>
          </el-table>
        </el-main>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import { carManUserList } from '../../config/ajax'
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        msg: 'CarManUserGridPanel',
        loading:true,
        winHeight:document.documentElement.clientHeight-185+'px',
        list:[],
        multipleSelection:[],
        companyName:'',
        loginName:'',
        hxName:''
      }
    },
    watch:{
      _getPagination(val){
        this.params.start = (val - 1) * this.params.limit;
        this.getList();
      }
    },
    computed:{
      ...mapGetters(['_getPagination']),
      params(){
        return {
          start:0,
          limit:20,
        }
      }
    },
    mounted(){
      this.getList();
    },
    methods:{
      ...mapMutations(['COMMITS_PAGE','PAGINATION_PAGE']),
      async getList() {
        let { data } = await carManUserList(this.params);
        this.list = data.root;
        this.list.map((key)=>{
          key.create_time = this.$forTime('YYYY-MM-DD HH:mm', key.create_time);
          key.modtime = this.$forTime('YYYY-MM-DD',key.modtime);
          key.verification_state = key.verification_state === 0 ? '未认证' : '验证成功';
        });
        this.loading = false;
        this.COMMITS_PAGE({
          page:this.params.limit,
          allPage:data.totalProperty
        })
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
        console.log(val);
      },
      getSearch(){
        this.loading = true;
        this.params.company = this.companyName;
        this.params.mobile = this.loginName;
        this.params.hx_loginname = this.hxName;
        this.getList();
      },
      delSearch(){
        this.loading = true;
        [this.companyName,this.loginName,this.hxName] = ['','',''];
        delete this.params.company;
        delete this.params.mobile;
        delete this.params.hx_loginname;
        this.getList();
        this.PAGINATION_PAGE(1);
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../../static/style/common";
  .ygcount{
    color:blue;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
</style>
