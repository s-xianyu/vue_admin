<template>
  <div :class="msg">
    <!--header-->
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
    <!--tab-->
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="付费用户管理-当年付费（25）">
        <el-container style="border: 1px solid #eee">
          <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
            <el-main>
              <el-table
                v-loading="loading"
                :data="list[0]" @selection-change="handleSelectionChange"
                style="width: 100%"
                :height="winHeight">
                <el-table-column align="center" type="selection" fixed sortable width="55">
                </el-table-column>
                <el-table-column align="center" type="index" fixed label="..." width="55">
                </el-table-column>
                <el-table-column align="center" prop="createTime" sortable label="日期" width="150">
                </el-table-column>
                <el-table-column align="center" prop="payone" sortable label="大于等于3万用户" width="160">
                </el-table-column>
                <el-table-column align="center" prop="paytwo" sortable label="大于等于1万小于3万用户" width="210">
                </el-table-column>
                <el-table-column align="center" prop="paythree" sortable label="大于等于5000万小于1万用户" width="230">
                </el-table-column>
                <el-table-column align="center" prop="payfour" sortable label="大于等于1000小于5000用户" width="230">
                </el-table-column>
                <el-table-column align="center" prop="payfive" sortable label="大于0小于1000用户" width="180">
                </el-table-column>
              </el-table>
            </el-main>
          </el-aside>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="付费用户管理-最近12个月（25）">
        <el-container style="border: 1px solid #eee">
          <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
            <el-main>
              <el-table
                v-loading="loading"
                :data="list[1]" @selection-change="handleSelectionChange"
                style="width: 100%"
                :height="winHeight">
                <el-table-column align="center" type="selection" fixed sortable width="55">
                </el-table-column>
                <el-table-column align="center" type="index" fixed label="..." width="55">
                </el-table-column>
                <el-table-column align="center" prop="createTime" sortable label="日期" width="150">
                </el-table-column>
                <el-table-column align="center" prop="dnpayone" sortable label="大于等于3万用户" width="160">
                </el-table-column>
                <el-table-column align="center" prop="dnpaytwo" sortable label="大于等于1万小于3万用户" width="210">
                </el-table-column>
                <el-table-column align="center" prop="dnpaythree" sortable label="大于等于5000万小于1万用户" width="230">
                </el-table-column>
                <el-table-column align="center" prop="dnpayfour" sortable label="大于等于1000小于5000用户" width="230">
                </el-table-column>
                <el-table-column align="center" prop="dnpayfive" sortable label="大于0小于1000用户" width="180">
                </el-table-column>
              </el-table>
            </el-main>
          </el-aside>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="发车用户管理（25）">
        <el-container style="border: 1px solid #eee">
          <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
            <el-main>
              <el-table
                v-loading="loading"
                :data="list[2]" @selection-change="handleSelectionChange"
                style="width: 100%"
                :height="winHeight">
                <el-table-column align="center" type="selection" fixed sortable width="55">
                </el-table-column>
                <el-table-column align="center" type="index" fixed label="..." width="55">
                </el-table-column>
                <el-table-column align="center" prop="createTime" sortable label="日期" width="150">
                </el-table-column>
                <el-table-column align="center" prop="departone" sortable label="T<7有发车" width="160">
                </el-table-column>
                <el-table-column align="center" prop="departtwo" sortable label="T<=T<30有发车" width="210">
                </el-table-column>
                <el-table-column align="center" prop="departthree" sortable label="30<=T<90有发车" width="230">
                </el-table-column>
                <el-table-column align="center" prop="departfour" sortable label="90<=T<180有发车" width="230">
                </el-table-column>
                <el-table-column align="center" prop="departfive" sortable label="180<=T有发车" width="180">
                </el-table-column>
              </el-table>
            </el-main>
          </el-aside>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="消费用户管理（25）">
        <el-container style="border: 1px solid #eee">
          <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
            <el-main>
              <el-table
                v-loading="loading"
                :data="list[3]" @selection-change="handleSelectionChange"
                style="width: 100%"
                :height="winHeight">
                <el-table-column align="center" type="selection" fixed sortable width="55">
                </el-table-column>
                <el-table-column align="center" type="index" fixed label="..." width="55">
                </el-table-column>
                <el-table-column align="center" prop="createTime" sortable label="日期" width="150">
                </el-table-column>
                <el-table-column align="center" prop="costone" sortable label="7天内有消费" width="160">
                </el-table-column>
                <el-table-column align="center" prop="costtwo" sortable label="7<=T<30有消费" width="210">
                </el-table-column>
                <el-table-column align="center" prop="costthree" sortable label="30<=T<90有消费" width="230">
                </el-table-column>
                <el-table-column align="center" prop="costfour" sortable label="90<=T<180有消费" width="230">
                </el-table-column>
                <el-table-column align="center" prop="costfive" sortable label="90<=T<180有消费" width="180">
                </el-table-column>
              </el-table>
            </el-main>
          </el-aside>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { payRfmModelList } from '../../config/ajax'
  import { mapMutations, mapGetters, mapState } from 'vuex'
  export default {
    data() {
      return {
        msg:'PayRfmModelTabPanel',
        loading:true,
        winHeight:document.documentElement.clientHeight-222+'px',
        list:{
          0:[],
          1:[],
          2:[],
          3:[],
        },
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
      this.isPagination();
    },
    methods:{
      ...mapMutations(['COMMITS_PAGE','PAGINATION_PAGE']),
      isPagination(){
        this.paginationPage === 1 ? this.getList() :  this.PAGINATION_PAGE(1)
      },
      async getList() {
        let { data } = await payRfmModelList(this.params);
        this.list[this.tabIndex] = data.root;
        this.list[this.tabIndex].map((key)=>{
          key.createTime = this.$forTime('YYYY-MM-DD', key.createTime);
          key.verification_state = key.verification_state === 0 ? '未认证' : '验证成功';
        });
        this.loading = false;
        this.COMMITS_PAGE({
          page:this.params['page.limit'],
          allPage:data.totalProperty
        })
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      getSearch(){
        this.params.searchtime = this.thisTime;
        this.isPagination();
      },
      delSearch(){
        this.thisTime = '';
        delete this.params.searchtime;
        this.isPagination();
      },
      tabClick(e){
        this.tabIndex = e.index;
        this.isPagination();
        console.log(e.index);
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
