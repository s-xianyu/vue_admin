<template>
  <div :class="msg">
    <div class="menu">
      <div class="content">
        <div class="left">
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
          <el-select
            class="inputMin"
            v-model="pxValue"
            size="mini"
            placeholder="排序方式">
            <el-option
              class="inputMin"
              v-for="(item,index) in pxOption"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input class="inputMin" v-model="userId" size="mini" placeholder="用户ID"></el-input>
          <el-input class="inputMax" v-model="userName" size="mini" placeholder="模糊查询姓名"></el-input>
          <el-input class="inputMax" v-model="userPhone" size="mini" placeholder="电话或手机"></el-input>
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
          <el-input class="inputMin" v-model="userLogin" size="mini" placeholder="登录名"></el-input>
          <el-select
            class="inputMin"
            v-model="flValue"
            size="mini"
            placeholder="分类">
            <el-option
              class="inputMin"
              v-for="(item,index) in flOption"
              :key="index"
              :label="item.name"
              :value="item.value">
              </el-option>
            </el-select>
            <el-input class="inputMin" v-model="userComp" size="mini" placeholder="公司名"></el-input>
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
            <el-table-column align="center" prop="login_name" sortable label="登录名" width="150">
            </el-table-column>
            <el-table-column align="center" prop="state" sortable label="用户分类" width="100">
            </el-table-column>
            <el-table-column align="center" prop="lastcontacttime" sortable label="最近联系时间" width="150">
            </el-table-column>
            <el-table-column align="center" prop="last_publish_time" sortable label="最后一次发车时间" width="180">
            </el-table-column>
            <el-table-column align="center" prop="last_pay_time" sortable label="最后一次消费时间" width="180">
            </el-table-column>
            <el-table-column align="center" prop="hxmoney" sortable label="华币余额" width="100">
            </el-table-column>
            <el-table-column align="center" prop="real_name" sortable label="工号" width="140">
            </el-table-column>
            <el-table-column align="center" prop="company" sortable label="公司名" width="200">
            </el-table-column>
            <el-table-column align="center" prop="city" sortable label="省份" width="120">
            </el-table-column>
            <el-table-column align="center" prop="contactcount" sortable label="联络次数" width="100">
            </el-table-column>
            <el-table-column align="center" prop="contact_info" sortable label="联络描述" width="300">
            </el-table-column>
            <el-table-column align="center" prop="contact_type" sortable label="联系方式" width="100">
            </el-table-column>
            <el-table-column align="center" prop="contact_name" sortable label="联系人" width="100">
            </el-table-column>
            <el-table-column align="center" prop="selectState" sortable label="勾选状态" width="200">
            </el-table-column>
            <el-table-column align="center" prop="promotion_count" sortable label="促销次数" width="120">
            </el-table-column>
            <el-table-column align="center" prop="give_count" sortable label="QQ赠送次数" width="150">
            </el-table-column>
            <el-table-column align="center" prop="summoney" sortable label="付费总额" width="120">
            </el-table-column>
            <el-table-column align="center" prop="rechargecount" sortable label="付费次数" width="120">
            </el-table-column>
            <el-table-column align="center" prop="last_recharge_time" sortable label="付费时间" width="170">
            </el-table-column>
            <el-table-column align="center" prop="star" sortable label="星级" width="140">
            </el-table-column>
            <el-table-column align="center" prop="clicknumthis" sortable label="用户类型" width="140">
            </el-table-column>
          </el-table>
        </el-main>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import {
    moneyfivehfifteennopay,
    getAllManagerList,
    getProvince
  } from '../../config/ajax'
  import { mapMutations, mapGetters,mapState } from 'vuex'
  export default {
    data() {
      return {
        msg:'MoneyFiveHFifteenNopayUserGridPanel',
        loading:true,
        winHeight:document.documentElement.clientHeight-185+'px',
        list:[],  //传值给子级
        multipleSelection:[],
        kfValue:'',
        kfOption:[],
        pxValue:'',
        pxOption:[
          {name:'根据发车情况',value:'1'},
          {name:'根据消费情况',value:'2'}
          ],
        flValue:'',
        flOption:[
          {name:'所有',value:' '},
          {name:'A类用户',value:'1'},
          {name:'B类用户',value:'2'},
          {name:'C类用户',value:'3'},
          {name:'D类用户',value:'4'},
          {name:'E类用户',value:'5'}
          ],
        userId:'',
        userName:'',
        userPhone:'',
        sfValue:'',
        sfOption:'',
        userLogin:'',
        userComp:'',
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
        let { data } = await moneyfivehfifteennopay(this.params);
        this.list = data.root;
        let stateArr = ['','A类用户','B类用户','C类用户','D类用户','E类用户','F类用户'];
        this.list.map((key,index)=>{
          key.last_publish_time = this.$forTime('YYYY-MM-DD HH:mm:ss', key.last_publish_time);
          key.last_pay_time = this.$forTime('YYYY-MM-DD HH:mm:ss', key.last_pay_time);
          key.last_recharge_time = this.$forTime('YYYY-MM-DD HH:mm:ss', key.last_recharge_time);
          key.state = stateArr[key.state];
          key.listIndex = index;
          key.modtime = this.$forTime('YYYY-MM-DD',key.modtime);
          key.verification_state = key.verification_state === 0 ? '未验证' : '验证成功';
          key.clicknumthis = key.clicknumthis === 0 ? '个人' : '商家';
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
      // 选择客服
      async visibleChangeKf(val){
        let params = {
          _dc:new Date().getTime()
        };
        if(val && this.kfOption.length <= 0){
          let { data } = await getAllManagerList(params);
          this.kfOption = data;
        }
      },
      // 选择省份
      async visibleChangeSf(val){
        if(val  && this.sfOption.length <= 0){
          let { data } = await getProvince();
          this.sfOption = data;
        }
      },
      getSearch(){
        let params = this.params;
        this.loading = true;
        this.kfValue ? params.managerId = this.kfValue : delete params.managerId; //客服
        this.pxValue ? params.sortType = this.pxValue : delete params.sortType; //排序
        this.userId ? params.userid = this.userId : delete params.userid;  //用户Id
        this.userName ? params.username = this.userName : delete params.username; //魔化查询姓名
        this.userPhone ? params.mobileOrPhone = this.userPhone : delete params.mobileOrPhone; //电话或手机
        this.sfValue ? params.area_code = this.sfValue : delete params.area_code; //省份
        this.userLogin ? params.login_name = this.userLogin : delete params.login_name; //登录名
        this.flValue ? params.state = this.flValue : delete params.state; //用户分类
        this.userComp ? params.company = this.userComp : delete params.company; //公司名
        this.getList();
      },
      delSearch(){
        [
          this.kfValue,
          this.pxValue,
          this.userId,
          this.userName,
          this.userPhone,
          this.sfValue,
          this.userLogin,
          this.flValue,
          this.userComp,
        ] = [''];
        delete this.params.managerId;
        delete this.params.sortType;
        delete this.params.userid;
        delete this.params.username;
        delete this.params.mobileOrPhone;
        delete this.params.area_code;
        delete this.params.login_name;
        delete this.params.company;
        console.log(this.params);
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
  @import "../../../static/style/common";
  .ygcount{
    color:blue;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
</style>
