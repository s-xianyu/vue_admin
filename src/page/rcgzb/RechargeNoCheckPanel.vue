<template>
  <div :class="msg">
    <div class="menu">
      <div class="content">
        <div class="left">
          <span class="span">编辑</span>
        </div>
        <div class="right">
          <el-select
            class="inputMin"
            v-model="czValue"
            size="mini"
            placeholder="充值方式">
            <el-option
              class="inputMin"
              v-for="(item,index) in czOption"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input class="inputMin" v-model="userName" size="mini" placeholder="用户账号"></el-input>
          <el-input class="inputMin" v-model="userId" size="mini" placeholder="用户ID"></el-input>
          <el-select
            class="inputMin"
            v-model="yhValue"
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
          <el-input class="inputMax" v-model="userPrice" size="mini" placeholder="充值金额"></el-input>
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
            <el-table-column align="center" prop="caiwuId" sortable label="财务id" width="120">
            </el-table-column>
            <el-table-column align="center" prop="" sortable label="操作" width="80">
              <template slot-scope="scope">
                <!--<router-link class="ygcount" tag="span" to="/">审核</router-link>-->
                <el-button size="mini" type="info" @click="shClick">审核</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="loginName" sortable label="用户账号" width="150">
            </el-table-column>
            <el-table-column align="center" prop="isZd" sortable label="是否有账单" width="120">
            </el-table-column>
            <el-table-column align="center" prop="contract_no" sortable label="入账合同号" width="120">
            </el-table-column>
            <el-table-column align="center" prop="ruZhangBankTo[0].name" sortable label="入账银行" width="180">
            </el-table-column>
            <el-table-column align="center" prop="ruZhangMoney" sortable label="入账余额" width="120">
            </el-table-column>
            <el-table-column align="center" prop="ruZhangCreatetime" sortable label="入账时间" width="180">
            </el-table-column>
            <el-table-column align="center" prop="ruZhangAccountdate" sortable label="入账到账日期" width="180">
            </el-table-column>
            <el-table-column align="center" prop="ruZhangAccountdateTo" sortable label="入账到账时间" width="130">
            </el-table-column>
            <el-table-column align="center" prop="ruZhangBankTo[0].name" sortable label="账单银行" width="180">
            </el-table-column>
            <el-table-column align="center" prop="zhangDanMoney" sortable label="账单金额" width="100">
            </el-table-column>
            <el-table-column align="center" prop="zhangDanhxMoney" sortable label="账单华币金额" width="130">
            </el-table-column>
            <el-table-column align="center" prop="zhangDanTcMoney" sortable label="账单赠送华币金额" width="160">
            </el-table-column>
            <el-table-column align="center" prop="zhangDanContractmemo" sortable label="合同内容" width="120">
            </el-table-column>
            <el-table-column align="center" prop="ruZhangCreatetime" sortable label="到账时间" width="170">
            </el-table-column>
            <el-table-column align="center" prop="" sortable label="操作" width="120">
              <template slot-scope="scope">
                <!--<router-link class="ygcount" tag="span" to="/">绑定账单</router-link>-->
                <el-button size="mini" type="info" @click="shClick">绑定账单</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="" sortable label="操作" width="120">
              <template slot-scope="scope">
                <!--<router-link class="ygcount" tag="span" to="/">绑定账单</router-link>-->
                <el-button size="mini" type="info" @click="shClick">解除账单</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="ruZhangBankTo[0].name" sortable label="充值银行" width="170">
            </el-table-column>
            <el-table-column align="center" prop="ruZhangBank" sortable label="网站直充" width="100">
            </el-table-column>
            <el-table-column align="center" prop="rmoney" sortable label="充值人民币" width="140">
            </el-table-column>
            <el-table-column align="center" prop="money" sortable label="充值金额" width="140">
            </el-table-column>
            <el-table-column align="center" prop="actTime" sortable label="充值日期" width="200">
            </el-table-column>
            <el-table-column align="center" prop="info" sortable label="充值描述" width="140">
            </el-table-column>
            <el-table-column align="center" prop="detail" sortable label="充值备注" width="200">
            </el-table-column>
            <el-table-column align="center" prop="realName" sortable label="用户客服" width="120">
            </el-table-column>
            <el-table-column align="center" prop="ruZhangAccountdate" sortable label="审核时间" width="180">
            </el-table-column>
            <el-table-column align="center" prop="audit_state" sortable label="审核状态" width="140">
            </el-table-column>
            <el-table-column align="center" prop="audit_people" sortable label="审核人" width="140">
            </el-table-column>
            <el-table-column align="center" sortable label="操作" width="140">
              <template slot-scope="scope">
                <!--<router-link class="ygcount" tag="span" to="/">充值记录</router-link>-->
                <el-button size="mini" type="info">充值记录</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" sortable label="操作" width="140">
              <template slot-scope="scope">
                <!--<router-link class="ygcount" tag="span" to="/">账单</router-link>-->
                <el-button size="mini" type="info">账单</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" sortable label="操作" width="140">
              <template slot-scope="scope">
                <!--<router-link class="ygcount" tag="span" to="/">提醒客服</router-link>-->
                <el-button size="mini" type="info">提醒客服</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import { getNoCheckRecharge } from '../../config/ajax'
  import { mapMutations, mapGetters,mapState } from 'vuex'
  export default {
    data() {
      return {
        msg:'RechargeNoCheckPanel',
        loading:true,
        winHeight:document.documentElement.clientHeight-185+'px',
        list:[],  //传值给子级
        multipleSelection:[],
        czValue:'',
        czOption:[
          {name:'所有',value:' '},
          {name:'充值平台',value:'4'},
          {name:'其他方式',value:'1'}
        ],
        userName:'',
        userId:'',
        yhValue:'',
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
        userPrice:'',
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
          'page.limit':20,
        }
      }
    },
    mounted(){
      this.getList();
    },
    methods:{
      ...mapMutations(['COMMITS_PAGE','PAGINATION_PAGE']),
      async getList() {
        let { data } = await getNoCheckRecharge(this.params);
        this.list = data.root;
        this.list.map((key,index)=>{
          key.isZd = key.zhangDanAccountdate ? '有账单' : '无账单';
          key.ruZhangBankTo = Object.values(this.yhOption).filter(k=>{
            return key.ruZhangBank === k.value ? k.name : '';
          });
          key.ruZhangCreatetime = this.$forTime('YYYY-MM-DD HH:mm:ss',key.ruZhangCreatetime);
          key.actTime = this.$forTime('YYYY-MM-DD HH:mm:ss',key.actTime);
          key.ruZhangAccountdate = this.$forTime('YYYY-MM-DD HH:mm:ss',key.ruZhangAccountdate);
          key.ruZhangAccountdateTo = this.$forTime('HH:mm:ss',key.ruZhangAccountdate);
          key.audit_state = key.audit_state === 1 ? '已审核' : '未审核';
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
        this.czValue ? params['recharge.type'] = this.czValue : delete params['recharge.type']; //充值方式
        this.userName ? params['recharge.loginName'] = this.userName : delete params['recharge.loginName']; //用户账号
        this.userId ? params.userid = this['recharge.userId'] : delete params['recharge.userId'];  //用户Id
        this.yhValue ? params['recharge.banktype'] = this.yhValue : delete params['recharge.banktype']; //用户分类
        this.userPrice ? params['recharge.money'] = this.userPrice : delete params['recharge.money']; //充值金额
        this.getList();
      },
      delSearch(){
        [
          this.czValue,
          this.userName,
          this.userId,
          this.yhValue,
          this.userPrice,
        ] = [''];
        delete this.params['recharge.type'];
        delete this.params['recharge.loginName'];
        delete this.params['recharge.userId'];
        delete this.params['recharge.banktype'];
        delete this.params['recharge.money'];
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
