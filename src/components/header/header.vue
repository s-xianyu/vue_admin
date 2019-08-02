<template>
  <div :class="msg">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.name" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="fr">
      <span>您好，</span>
      <router-link to="/password">后台开发</router-link>
      <router-link class="outLogin" to="/login">退出</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'header'
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/style/common";
  .header{
    @include wh(100%,60px);
    background:#e1e1e1;
    position: relative;
    .breadcrumb{
      @include wh(auto,100%);
      @include flexCenter;
      justify-content: flex-start;
      padding-left:20px;
      font-size: 14px;
    }
    .fr{
      @include flexCenter;
      @include wh(200px,100%);
      position: absolute;
      font-size: 14px;
      right:0;
      top:0;
      .outLogin{
        margin-left:30px;
      }
    }
  }

</style>
