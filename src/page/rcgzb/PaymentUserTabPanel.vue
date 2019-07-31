<template>
  <div :class="msg">
    <!--header-->
    <div class="menu">
      <div class="content">
        <div class="left" style="width:170px;">
          <span class="span">设置客户经理</span>
        </div>
        <div class="right">
          <el-select
            class="inputMin"
            v-model="kfValue"
            size="mini"
            @visible-change="visibleChangeKf"
            placeholder="选择客服">
            <el-option
              class="inputMin"
              v-for="(item,index) in kfOption"
              :key="index"
              :label="item.realName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input class="inputMin" v-model="userId" size="mini" placeholder="用户ID"></el-input>
          <el-input class="inputMin" v-model="userName" size="mini" placeholder="模糊查询姓名"></el-input>
          <el-input class="inputMin" v-model="userPhone" size="mini" placeholder="电话或手机"></el-input>
          <el-select
            class="inputMin"
            v-model="sfValue"
            size="mini"
            @visible-change="visibleChangeSf"
            placeholder="省份">
            <el-option
              class="inputMin"
              v-for="(item,index) in sfOption"
              :key="index"
              :label="item.areaName"
              :value="item.areaCode">
            </el-option>
          </el-select>
          <el-input class="inputMin" v-model="loginName" size="mini" placeholder="登录名"></el-input>
          <el-select
            class="inputMin"
            v-model="czValue"
            size="mini"
            @visible-change="visibleChangeSf"
            placeholder="充值类型">
            <el-option
              class="inputMin"
              v-for="(item,index) in czOption"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select
            class="inputMin"
            v-model="ztValue"
            size="mini"
            @visible-change="visibleChangeSf"
            placeholder="状态">
            <el-option
              class="inputMin"
              v-for="(item,index) in ztOption"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select
            class="inputMin"
            v-model="kfztValue"
            size="mini"
            @visible-change="visibleChangeSf"
            placeholder="客服处理状态">
            <el-option
              class="inputMin"
              v-for="(item,index) in kfztOption"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input class="inputMin" v-model="companyName" size="mini" placeholder="公司名"></el-input>
          <el-select
            class="inputMin"
            v-model="yhztValue"
            size="mini"
            @visible-change="visibleChangeSf"
            placeholder="用户状态">
            <el-option
              class="inputMin"
              v-for="(item,index) in yhztOption"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select
            class="inputMin"
            v-model="llztValue"
            size="mini"
            @visible-change="visibleChangeSf"
            placeholder="联络状态">
            <el-option
              class="inputMin"
              v-for="(item,index) in llztOption"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button class="search" icon="el-icon-search" circle @click="getSearch"></el-button>
          <el-button type="danger" size="small" round @click="delSearch">重置</el-button>
        </div>
      </div>
    </div>
    <!--tab-->
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="操作过网上充值的用户-未处理（25）"></el-tab-pane>
      <el-tab-pane label="操作过网上充值的用户-所有（25）"></el-tab-pane>
      <el-tab-pane label="直充成功无归属客服表（0）"></el-tab-pane>
    </el-tabs>
    <!--table-->
    <el-container style="border: 1px solid #eee">
      <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
        <el-main>
          <el-table
            v-loading="loading"
            :data="list" @selection-change="handleSelectionChange"
            style="width: 100%"
            :height="winHeight">
            <el-table-column align="center" type="selection" fixed sortable width="55"></el-table-column>
            <el-table-column align="center" type="index" fixed label="..." width="55"></el-table-column>
            <el-table-column align="center" prop="login_name" sortable label="登录名" width="120"></el-table-column>
            <el-table-column align="center" prop="star" sortable label="星级" width="90"></el-table-column>
            <el-table-column align="center" prop="paymentCreateTime" sortable label="操作时间" width="160"></el-table-column>
            <el-table-column align="center" prop="paymentMoney" sortable label="充值金额" width="100"></el-table-column>
            <el-table-column align="center" prop="paymentpaytype" sortable label="支付方式" width="100"></el-table-column>
            <el-table-column align="center" prop="paymenttype" sortable label="充值类型" width="100"></el-table-column>
            <el-table-column align="center" prop="childType" sortable label="充值子类型" width="150"></el-table-column>
            <el-table-column align="center" prop="paymentProcessstate" sortable label="状态" width="90"></el-table-column>
            <el-table-column align="center" prop="payfive" sortable label="操作" width="120">
              <template slot-scope="scope">
                <el-button size="mini" type="info" @click="shClick">充值记录</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="iscontact_state" sortable label="客服处理状态" width="150"></el-table-column>
            <el-table-column align="center" prop="last_contact_time" sortable label="最近联系时间" width="150"></el-table-column>
            <el-table-column align="center" prop="hxmoney" sortable label="华币余额" width="120"></el-table-column>
            <el-table-column align="center" prop="real_name" sortable label="工号" width="120"></el-table-column>
            <el-table-column align="center" prop="lastrechargetime" sortable label="付费时间" width="150"></el-table-column>
            <el-table-column align="left" prop="company" sortable label="公司名" width="180"></el-table-column>
            <el-table-column align="center" prop="province" sortable label="省份" width="90"></el-table-column>
            <el-table-column align="center" prop="paymentState" sortable label="用户状态" width="100"></el-table-column>
            <el-table-column align="center" prop="" sortable label="联络状态" width="120"></el-table-column>
            <el-table-column align="center" prop="promotion_count" sortable label="促销次数" width="100"></el-table-column>
            <el-table-column align="center" prop="summoney" sortable label="付费次数" width="100"></el-table-column>
            <el-table-column align="center" prop="loginmonth" sortable label="本月登陆次数" width="130"></el-table-column>
            <el-table-column align="center" prop="payfive" sortable label="本月发车次数" width="130"></el-table-column>
            <el-table-column align="center" prop="contact_info" sortable label="联络描述" width="200"></el-table-column>
            <el-table-column align="center" prop="contact_type" sortable label="联系方式" width="100"></el-table-column>
            <el-table-column align="center" prop="contact_name" sortable label="联系人" width="100"></el-table-column>
            <el-table-column align="center" prop="selectState" sortable label="勾选状态" width="200"></el-table-column>
            <el-table-column align="center" prop="" sortable label="总发车数" width="100"></el-table-column>
            <el-table-column align="center" prop="tuijian" sortable label="推荐数量" width="100"></el-table-column>
            <el-table-column align="center" prop="moneycostzhou" sortable label="本周使用" width="100"></el-table-column>
            <el-table-column align="center" prop="moneycostmonth" sortable label="本月使用" width="100"></el-table-column>
            <el-table-column align="center" prop="" sortable label="总华币使用" width="130"></el-table-column>
            <el-table-column align="center" prop="contactcount" sortable label="联络次数" width="100"></el-table-column>
            <el-table-column align="center" prop="give_count" sortable label="QQ赠送次数" width="130"></el-table-column>
            <el-table-column align="center" prop="star" sortable label="星级" width="90"></el-table-column>
            <el-table-column align="center" prop="" sortable label="用户类型" width="100">
              <template>
                <router-link to="/" class="ygcount">个人</router-link>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import {
    findPaymentUser,
    findPaymentUserAll,
    findPaymentUserState0Mid0,
    getAllManagerList,
    getProvince
  } from '../../config/ajax'
  import { mapMutations, mapGetters, mapState } from 'vuex'
  export default {
    data() {
      return {
        msg:'PaymentUserTabPanel',
        loading:true,
        winHeight:document.documentElement.clientHeight-222+'px',
        list:[],
        multipleSelection:[],
        kfValue:'',
        kfOption:[],
        userId:'',
        userName:'',
        userPhone:'',
        sfValue:'',
        sfOption:[],
        loginName:'',
        czValue:'',
        czOption:[
          {name:'所有',id:' '},
          {name:'华币',id:'0'},
          {name:'现金',id:'1'},
          {name:'台支付款不充值',id:'2'},
        ],
        ztValue:'',
        ztOption:[
          {name:'所有',id:' '},
          {name:'成功',id:'0'},
          {name:'未知',id:'1'},
          {name:'失败',id:'2'},
        ],
        kfztValue:'',
        kfztOption:[
          {name:'所有',id:' '},
          {name:'未处理',id:'0'},
          {name:'用户在测试',id:'1'},
          {name:'充值在沟通',id:'2'},
          {name:'发银行账号',id:'3'},
        ],
        companyName:'',
        yhztValue:'',
        yhztOption:[
          {name:'所有',id:' '},
          {name:'已删',id:'0'},
          {name:'正常',id:'1'},
          {name:'黑名单',id:'2'},
        ],
        llztValue:'',
        llztOption:[
          {name:'所有',id:' '},
          {name:'联络中',id:'0'},
          {name:'暂停联络',id:'1'},
        ],
        tabIndex:0,
      }
    },
    watch:{
      _getPagination(val){
        this.loading = true;
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
          'page.limit':25,
        }
      }
    },
    mounted(){
      this.getList();
    },
    methods:{
      ...mapMutations(['COMMITS_PAGE','PAGINATION_PAGE']),
      async getList() {
        let { data } = { };
        if(this.tabIndex == 0){
          data = await findPaymentUser(this.params);
        }else if(this.tabIndex == 1){
          data = await findPaymentUserAll(this.params);
        }else{
          data = await findPaymentUserState0Mid0(this.params);
        }
        this.list = data.data.root;
        this.list.map((key)=>{
          key.paymentCreateTime = this.$forTime('YYYY-MM-DD HH:mm:ss', key.paymentCreateTime);
          key.paymenttype = key.paymenttype === 0 ? '华币' : '现金';
          key.paymentProcessstate = key.paymentProcessstate === 0 ? '未知' : '已知';
          key.iscontact_state = key.iscontact_state === 0 ? '未处理' : '已处理';
          key.last_contact_time = this.$forTime('YYYY-MM-DD HH:mm',key.last_contact_time)
          key.paymentState = key.paymentState === 1 ? '正常' : '不正常';
        });
        this.loading = false;
        this.COMMITS_PAGE({
          page:this.params['page.limit'],
          allPage:data.data.totalProperty
        })
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      getSearch(){
        let params = this.params;
        this.kfValue ? params.managerId = this.kfValue : delete params.managerId; //客服
        this.userId ? params.userid = this.userId : delete params.userid; //用户Id
        this.userName ? params.username = this.userName : delete params.username; //模糊查询姓名
        this.userPhone ? params.mobileOrPhone = this.userPhone : delete params.mobileOrPhone; //模糊查询姓名
        this.sfValue ? params.area_code = this.sfValue : delete params.area_code; //地区
        this.loginName ? params.paymentLoginName = this.loginName : delete params.paymentLoginName; //登录名
        this.czValue ? params.paymenttype = this.czValue : delete params.paymenttype; //充值
        this.ztValue ? params.paymentState = this.ztValue : delete params.paymentState; //状态
        this.kfztValue ? params.paymentProcessstate = this.kfztValue : delete params.paymentProcessstate; //客服处理
        this.companyName ? params.company = this.companyName : delete params.company; //公司名
        this.yhztValue ? params.flag = this.yhztValue : delete params.flag; //用户状态
        this.llztValue ? params.iscontact_state = this.llztValue : delete params.iscontact_state; //联络状态
        if(this.paginationPage === 1){
          this.getList();
        }else{
          this.PAGINATION_PAGE(1);
        }
      },
      delSearch(){
        [
          this.kfValue,
          this.userId,
          this.userName,
          this.userPhone,
          this.sfValue,
          this.loginName,
          this.czValue,
          this.ztValue,
          this.kfztValue,
          this.companyName,
          this.yhztValue,
          this.llztValue,
        ] = [''];
        delete this.params.managerId;
        delete this.params.userid;
        delete this.params.username;
        delete this.params.mobileOrPhone;
        delete this.params.area_code;
        delete this.params.paymentLoginName;
        delete this.params.paymenttype;
        delete this.params.paymentState;
        delete this.params.paymentProcessstate;
        delete this.params.company;
        delete this.params.flag;
        delete this.params.iscontact_state;
        if(this.paginationPage === 1){
          this.getList();
        }else{
          this.PAGINATION_PAGE(1);
        }
      },
      tabClick(e){
        this.tabIndex = e.index;
        this.loading = true;
        if(this.paginationPage === 1){
          this.getList();
        }else{
          this.PAGINATION_PAGE(1);
        }
      },
      shClick(){
        this.$message('这是一条消息提示');
      },
      async visibleChangeKf(val){
        let params = {
          _dc:new Date().getTime()
        };
        if(val && this.kfOption.length <= 0){
          let { data } = await getAllManagerList(params);
          this.kfOption = data;
        }
      },
      async visibleChangeSf(val){
        if(val  && this.sfOption.length <= 0){
          let { data } = await getProvince();
          this.sfOption = data;
        }
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
