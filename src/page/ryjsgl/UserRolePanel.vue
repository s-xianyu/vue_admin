<template>
  <div :class="msg">
    <div class="content" style="width:100%" :style="{height:winHeight}">
      <div class="left">
        <el-tree
          :data="userInfo"
          show-checkbox
          draggable
          :props="defaultProps"
          @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="right">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane class="tables" label="角色" name="first">
            <ul :style="{height:rightHeight}">
              <li v-for="item in roleList" :key="item.id">
                <el-checkbox-group
                  v-model="checkedCities1">
                  <el-checkbox :label="item.text">{{item.text}}</el-checkbox>
                </el-checkbox-group>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="客户经理" name="last">
            <ul :style="{height:rightHeight}">
              <li v-for="item in managerList" :key="item.id">
                <el-checkbox-group
                  v-model="checkedCities1">
                  <el-checkbox :label="item.text">{{item.text}}</el-checkbox>
                </el-checkbox-group>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getOrgUserTree,
    getTreeNodeListRole,
    getTreeNodeListManager
  } from '../../config/ajax'
  export default {
    data() {
      return {
        msg: 'UserRolePanel',
        winHeight:document.documentElement.clientHeight-120+'px',
        rightHeight:document.documentElement.clientHeight-181+'px',
        userInfo:[],
        checkedCities1:[],
        roleList:[],
        managerList:[],
        activeName:'first',
        defaultProps:{
          label:'text',
          children:'children'
        },
        roleListProp:{
          label:'text'

        }
      }
    },
    computed:{
      params (){
        return {}
      }
    },
    created (){
      this.params.node ='xnode-857';
      this.getUser();
    },

    methods:{
      async getUser(){
        let [userInfo, roleList] = await Promise.all([
          getOrgUserTree(),
          getTreeNodeListRole()
        ]);
        this.userInfo = userInfo.data;
        this.roleList = roleList.data;
        this.handleNodeClick(this.userInfo[0].id);
      },
      // 获取id后获取下一级级菜单
      async handleNodeClick(id){
        this.params.org_id = this.userInfo[0].data.id;
        this.params.node = this.userInfo[0].id;
        let { data } = await getOrgUserTree(this.params);
        this.userInfo[0].children = data;
        console.log(this.userInfo);
      },
      handleNodeClickRIght(data){
        console.log(data);
      },
      async handleClick(){
        if(this.managerList.length <= 0){
          let { data } = await getTreeNodeListManager();
          this.managerList = data;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../../static/style/common";
ul,li{
  list-style: none;
}
  .content{
    @include flexCenter;
    align-items: flex-start;
    overflow: hidden;
    & .left{
      flex:1;
    }
    & .right{
      width:300px;
      border-left:1px solid #e1e1e1;
      border-bottom:1px solid #e1e1e1;
      padding-left: 10px;
      ul{
        overflow-y: scroll;
      }
      ul,li{
        list-style: none;
        text-align: left;
        margin:3px 0;
      }
    }
  }
</style>
