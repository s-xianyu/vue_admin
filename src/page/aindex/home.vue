<template>
  <div :class="msg">
    <div class="menu">
      <div class="content">
        <div class="left"></div>
        <div class="right">
          <el-date-picker
            class="inputMax"
            v-model="thisTime"
            align="right"
            type="date"
            size="small"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-ddT00:00:00"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
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
            :height="winHeight">
            <el-table-column align="center" fixed type="selection" width="55">
            </el-table-column>
            <el-table-column align="center" type="index" fixed prop="index" label="..." width="55">
            </el-table-column>
            <el-table-column align="center" fixed sortable prop="realName" label="员工" width="100">
            </el-table-column>
            <el-table-column align="center" sortable prop="thisdate" label="日期" width="100">
            </el-table-column>
            <el-table-column align="center" sortable prop="telnum" label="电话量" width="100">
            </el-table-column>
            <el-table-column align="center" sortable prop="telnumsix" label="超60电话" width="140">
            </el-table-column>
            <el-table-column align="center" sortable prop="telnumsum" label="超30+超60电话" width="150">
            </el-table-column>
            <el-table-column align="center" sortable prop="telsum" label="时长" width="150">
            </el-table-column>
            <el-table-column align="center" sortable prop="money" label="业绩" width="150">
            </el-table-column>
            <el-table-column align="center" sortable prop="summit" label="峰会业绩" width="150">
            </el-table-column>
            <el-table-column align="center" sortable prop="reward" label="奖金" width="150">
            </el-table-column>
            <el-table-column align="center" sortable prop="costmonth" label="月消费用户数" width="150">
            </el-table-column>
            <el-table-column align="center" sortable prop="logincount" label="月用户登录数" width="140">
            </el-table-column>
            <el-table-column align="center" sortable prop="auser" label="A类用户" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="buser" label="B类用户" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="cuser" label="C类用户" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="duser" label="D类用户" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="notypeuser" label="未分类用户" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="thismonthpublishcarAB" label="当月发车AB用户数" width="180">
            </el-table-column>
            <el-table-column align="center" sortable prop="costmonthAB" label="当月消费AB用户数" width="180">
            </el-table-column>
            <el-table-column align="center" sortable prop="monthPublishuserScale" label="当月发车用户比" width="160">
            </el-table-column>
            <el-table-column align="center" sortable prop="monthPayuserScale" label="当月消费用户比" width="160">
            </el-table-column>
            <el-table-column align="center" sortable prop="thismonthpublishcar" label="当月发车用户数" width="160">
            </el-table-column>
            <el-table-column align="center" sortable prop="occupy500" label="前500名占有数" width="160">
            </el-table-column>
            <el-table-column align="center" sortable prop="occupy4000" label="前4000名占有数" width="160">
            </el-table-column>
            <el-table-column align="center" sortable prop="occupy2000" label="前2000名占有数" width="160">
            </el-table-column>
            <el-table-column align="center" sortable prop="visit50" label="微页面访问超50" width="160">
            </el-table-column>
            <el-table-column align="center" sortable prop="visit20" label="微页面访问超20" width="160">
            </el-table-column>
            <el-table-column align="center" sortable prop="threemonthnotpublishcar" label="超3个月未发车" width="160">
            </el-table-column>
            <el-table-column align="center" sortable prop="sixmonthnotpay" label="超6个月未续费" width="160">
            </el-table-column>
            <el-table-column align="center" sortable prop="pay" label="付费用户" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="out30connect" label="30天未联络" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="ordinaryStore" label="普通微网站数" width="150">
            </el-table-column>
            <el-table-column align="center" sortable prop="enterpriseStore" label="企业微网站数" width="150">
            </el-table-column>
            <el-table-column align="center" sortable prop="cost" label="消费用户" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="publiccar" label="发车用户" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="promotion" label="促销用户" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="free" label="免费用户" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="usercost" label="月总用户消费额" width="180">
            </el-table-column>
            <el-table-column align="center" sortable prop="hxmoney" label="用户库存华币" width="180">
            </el-table-column>
            <el-table-column align="center" sortable prop="miaodan" label="秒/单" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="dianhuadan" label="电话/单" width="200">
            </el-table-column>
            <el-table-column align="center" sortable prop="rewardwanmiao" label="奖金/万秒" width="200">
            </el-table-column>
            <el-table-column align="center" sortable prop="rewardbaidianhua" label="奖金/百电话" width="200">
            </el-table-column>
          </el-table>
        </el-main>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { ContactCensusMonthSortlist } from '../../config/ajax';
  import { mapMutations,mapGetters,mapState } from 'vuex'
  export default {
    data() {
      return {
        msg:'home',
        loading:true,
        winHeight:document.documentElement.clientHeight-185+'px',
        list:[],
        multipleSelection:[],
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        thisTime:'',
      }
    },
    watch:{
      _getPagination(val){
        this.params.start = (val - 1) * this.params.limit;
        this.getList();
      }
    },
    mounted(){
      this.getList();
    },
    computed:{
      ...mapState(['paginationPage']),
      ...mapGetters(['_getPagination']),
      params () {
        return {
          start:0,
          limit:60,
        }
      }
    },
    methods:{
      ...mapMutations(['COMMITS_PAGE']),
      async getList(){
        let { data } = await ContactCensusMonthSortlist(this.params);
        this.list = data.root;
        this.list.map((key)=>{
          key.thisdate = this.$forTime('YYYY-MM-DD', key.thisdate);
          this.loading = false;
        });
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
        this.params.searchtime = this.thisTime;
        if(this.paginationPage === 1){
          this.getList();
        }else{
          this.PAGINATION_PAGE(1);
        }
      },
      delSearch(){
        this.thisTime = '';
        delete this.params.searchtime;
        if(this.paginationPage === 1){
          this.getList();
        }else{
          this.PAGINATION_PAGE(1);
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
</style>
