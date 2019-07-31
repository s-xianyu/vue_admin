<template>
  <div :class="msg">
    <div class="menu">
      <div class="content">
        <div class="left">
          <span class="span">新增</span>
          <span class="span">编辑</span>
          <span class="span">删除</span>
        </div>
        <div class="right">
          <el-select
            class="inputMin"
            v-model="shValue"
            size="mini"
            placeholder="审核状态">
            <el-option
              class="inputMin"
              v-for="(item,index) in shOption"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select
            class="inputMin"
            v-model="rlValue"
            size="mini"
            placeholder="是否已认领">
            <el-option
              class="inputMin"
              v-for="(item,index) in rlOption"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select
            class="inputMin"
            v-model="yhValue"
            size="mini"
            placeholder="银行">
            <el-option
              class="inputMin"
              v-for="(item,index) in yhOption"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select
            class="inputMin"
            v-model="czyhValue"
            size="mini"
            placeholder="充值银行">
            <el-option
              class="inputMin"
              v-for="(item,index) in yhOption"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input class="inputMin" v-model="userContract" size="mini" placeholder="合同编号"></el-input>
          <el-input class="inputMin" v-model="userLogin" size="mini" placeholder="登录名"></el-input>
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
            style="width: 100%"
            :height="winHeight">
            <el-table-column align="center" type="selection" fixed sortable width="55">
            </el-table-column>
            <el-table-column align="center" type="index" prop="index" fixed label="..." width="55">
            </el-table-column>
            <el-table-column align="center" prop="audit_people" sortable label="审核人" width="100">
            </el-table-column>
            <el-table-column align="center" prop="audit_time" sortable label="审核时间" width="120">
            </el-table-column>
            <el-table-column align="center" prop="audit_state" sortable label="审核状态" width="120">
            </el-table-column>
            <el-table-column align="center" prop="" sortable label="操作" width="80">
              <template slot-scope="scope">
                <!--<router-link class="ygcount" tag="span" to="/">审核</router-link>-->
                <el-button size="mini" type="info" @click="shClick">审核</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="bankTo[0].name" sortable label="银行" width="150">
            </el-table-column>
            <el-table-column align="center" prop="money" sortable label="金额" width="120">
            </el-table-column>
            <el-table-column align="center" prop="createtime" sortable label="入账时间" width="180">
            </el-table-column>
            <el-table-column align="center" prop="createtimeTo" sortable label="入账到账日期" width="180">
            </el-table-column>
            <el-table-column align="center" prop="accounttime" sortable label="入账到账时间" width="130">
            </el-table-column>
            <el-table-column align="center" prop="bankTo[0].name" sortable label="充值银行" width="120">
            </el-table-column>
            <el-table-column align="center" prop="bank" sortable label="网站直充银行" width="150">
            </el-table-column>
            <el-table-column align="center" prop="rmoney" sortable label="充值人民币" width="120">
            </el-table-column>
            <el-table-column align="center" prop="hxmoney" sortable label="充值华币" width="120">
            </el-table-column>
            <el-table-column align="center" prop="rechargeTime" sortable label="充值日期" width="180">
            </el-table-column>
            <el-table-column align="center" prop="bankTo[0].name" sortable label="账单银行" width="120">
            </el-table-column>
            <el-table-column align="center" prop="rmoney" sortable label="账单金额" width="120">
            </el-table-column>
            <el-table-column align="center" prop="zhangDanhxMoney" sortable label="账单华币金额" width="150">
            </el-table-column>
            <el-table-column align="center" prop="zhangDanTcMoney" sortable label="账单赠送华币金额" width="170">
            </el-table-column>
            <el-table-column align="center" prop="zhangDanAccountdate" sortable label="账单到账时间" width="180">
            </el-table-column>
            <el-table-column align="center" prop="contract_no" sortable label="合同编号" width="200">
            </el-table-column>
            <el-table-column align="center" prop="login_name" sortable label="登录名" width="180">
            </el-table-column>
            <el-table-column align="center" prop="real_name" sortable label="认领人" width="100">
            </el-table-column>
            <el-table-column align="center" sortable label="操作" width="90">
              <template slot-scope="scope">
                <!--<router-link v-show="scope.row.state === 1" class="ygcount" tag="span" to="/">修改认领</router-link>-->
                <el-button v-show="scope.row.state === 1" size="mini" type="info">修改认领</el-button>
                <!--<router-link v-show="scope.row.state === 0" class="ygcount" tag="span" to="/">认领</router-link>-->
                <el-button v-show="scope.row.state === 0" size="mini" type="info">认领</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="" sortable label="认领方式" width="120">
            </el-table-column>
            <el-table-column align="center" prop="memo" sortable label="备注" width="180">
            </el-table-column>
            <el-table-column align="center" prop="historymemo" sortable label="历史认领备注" width="200">
            </el-table-column>
          </el-table>
        </el-main>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import { getNoCheckList } from '../../config/ajax'
  import { mapMutations, mapGetters,mapState } from 'vuex'
  export default {
    data() {
      return {
        loading:true,
        msg:'CaiwuRuzhangNoCheckGridPanel',
        winHeight:document.documentElement.clientHeight-185+'px',
        list:[],  //传值给子级
        multipleSelection:[],
        shValue:'',
        shOption:[
          {name:'所有',value:' '},
          {name:'未审核',value:'0'},
          {name:'已审核',value:'1'}
        ],
        rlValue:'',
        rlOption:[
          {name:'所有',value:' '},
          {name:'未认领',value:'0'},
          {name:'已认领',value:'1'}
        ],
        yhValue:'',
        czyhValue:'',
        yhOption:[
          {name:'公司建行账户',value:9},
          {name:'公司工行账户',value:10},
          {name:'公司招行账户',value:11},
          {name:'公司农行账户',value:12},
          {name:'公司中行账户',value:13},
          {name:'公司邮政账户',value:20},
          {name:'公司联合账户',value:21},
          {name:'微信',value:16},
          {name:'支付宝',value:14},
          {name:'银联支付',value:17},
          {name:'车猫支付',value:18},
          {name:'新生支付',value:19},
        ],
        userContract:'',
        userLogin:'',
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
        this.params['page.start'] = (val - 1) * this.params['page.limit'];
        this.getList();
      }
    },
    computed:{
      ...mapState(['paginationPage']),
      ...mapGetters(['_getPagination']),
      params(){
        return {
          'page.start':0,
          'page.limit':30,
        }
      }
    },
    mounted(){
      this.getList();
    },
    methods:{
      ...mapMutations(['COMMITS_PAGE','PAGINATION_PAGE']),
      async getList() {
        let { data } = await getNoCheckList(this.params);
        this.list = data.root;
        this.list.map((key,index)=>{
          // key.isZd = key.zhangDanAccountdate ? '有账单' : '无账单';
          key.audit_state = key.zhangDanAccountdate ? '审核通过' : '未审核';
          key.audit_time = this.$forTime('YYYY-MM-DD HH:mm:ss',key.audit_time);
          key.createtimeTo = this.$forTime('YYYY-MM-DD',key.createtime);
          key.bankTo = Object.values(this.yhOption).filter(k=>{
            return key.bank === k.value ? k.name : '';
          });
          key.createtime = this.$forTime('YYYY-MM-DD HH:mm:ss',key.createtime);
          key.rechargeTime = this.$forTime('YYYY-MM-DD HH:mm:ss',key.rechargeTime);
        });
        this.loading = false;
        this.COMMITS_PAGE({
          page:this.params['page.limit'],
          allPage:data.totalProperty
        })
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
        console.log(val);
      },
      getSearch(){
        let params = this.params;
        this.loading = true;
        this.shValue ? params['caiwuRuzhang.audit_state'] = this.shValue : delete params['caiwuRuzhang.audit_state']; //是否审核
        this.rlValue ? params['caiwuRuzhang.state'] = this.rlValue : delete params['caiwuRuzhang.state']; //是否已认证
        this.yhValue ? params['caiwuRuzhang.bank'] = this.yhValue : delete params['caiwuRuzhang.bank'];  //银行
        this.czyhValue ? params['caiwuRuzhang.reBank'] = this.czyhValue : delete params['caiwuRuzhang.reBank']; //充值银行
        this.userContract ? params['caiwuRuzhang.contract_no'] = this.userContract : delete params['caiwuRuzhang.contract_no']; //合同编号
        this.userLogin ? params['caiwuRuzhang.login_name'] = this.userLogin : delete params['caiwuRuzhang.login_name']; //登录名
        this.thisTime ? params['caiwuRuzhang.accountdate'] = this.thisTime : delete params['caiwuRuzhang.accountdate']; //到账日期
        this.getList();
      },
      delSearch(){
        [
          this.shValue,
          this.rlValue,
          this.yhValue,
          this.czyhValue,
          this.userContract,
          this.userLogin,
          this.thisTime,
        ] = [''];
        delete this.params['caiwuRuzhang.audit_state'];
        delete this.params['caiwuRuzhang.state'];
        delete this.params['caiwuRuzhang.bank'];
        delete this.params['caiwuRuzhang.reBank'];
        delete this.params['caiwuRuzhang.contract_no'];
        delete this.params['caiwuRuzhang.login_name'];
        delete this.params['caiwuRuzhang.accountdate'];
        console.log(this.params);
        if(this.paginationPage === 1){
          this.getList();
        }else{
          this.PAGINATION_PAGE(1);
        }
      },
      shClick(){
        this.$message('这是一条消息提示');
      },
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
