<template>
  <div :style="{height:winHeight}" class="lefts">
    <el-col :span="24">
      <el-menu
        :default-active="defaultActive"
        router
        unique-opened
        class="el-menu-vertical-demo"
        background-color="#545c64"
        active-text-color="#ff6600"
        text-color="#fff">
        <el-menu-item class="tl wid" index="index"><i class="el-icon-menu"></i>首页</el-menu-item>
        <el-submenu
          class="tl wid"
          v-for="(item,index) in list"
          :index="index+''"
          open="handleOpen"
          :key="index">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{item.text}}</span>
          </template>
          <el-menu-item
            :data-children="li.children"
            class="font12"
            v-for="(li,index) in item.children"
            :index="li.url+li.data.parent_id"
            :key="index">{{li.text}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
  import { getUserTreeNodeList } from '../../config/ajax'
  export default {
    data() {
      return {
        list:[],
        winHeight:document.documentElement.clientHeight+'px',
        activeIndex:'0',
      }
    },
    mounted(){
      this.getLeft();
    },
    computed: {
      defaultActive: function(){
        return this.$route.path.replace('/', '');
      }
    },
    methods:{
      async getLeft(){
        let params = {
          _dc:new Date().getTime()
        };
        let { data } = await getUserTreeNodeList(params);
        this.list = data;
        if(data.msg === '未登录'){
          this.$router.push({path:'/login'});
        }
      },
      handleOpen(key, keyPath){
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/style/common";
  .lefts{
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: #F5F5F5;
    }
    &::-moz-scrollbar {
      width: 0;
      height: 0;
      background-color: #F5F5F5;
    }
    .wid{
      font-weight: bold;
    }
    .font12{
      font-weight: normal;
    }
  }
</style>
