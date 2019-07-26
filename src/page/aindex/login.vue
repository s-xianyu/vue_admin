<template>
  <div class="login">
    <div class="content">
      <div class="center">
        <div class="title">
          <p>后台管理系统</p>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-input
            placeholder="请输入用户名"
            class="userName"
            v-model="form.userName"
            clearable>
          </el-input>
          <el-input placeholder="请输入密码" v-model="form.userPsd" show-password></el-input>
        </el-form>
        <el-button class="btn" type="primary" @click="onSubmit">立即创建</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import { login } from '../../config/ajax'
  export default {
    data() {
      return {
        form:{
          userName:'',
          userPsd:''
        }
      }
    },
    created(){
    },
    methods:{
      ...mapMutations(['GETLOGIN']),
      async onSubmit(){
        let { data } = await login(this.form.userName,this.form.userPsd);
        debugger
        if(data.indexOf('不正确') !== 0){
          this.$message('密码不正确');
        }else{
          this.$router.push({path:'/'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/style/common";
  .login{
    @include wh(100%,100%);
    background: linear-gradient(top,#1073af,#152954);
    .content{
      .center{
        @include center;
        @include wh(480px,auto);
        background:#fff;
        border-radius: 8px;
        box-sizing: border-box;
        padding:50px;
        .title{
          position: absolute;
          width: 100%;
          top: -100px;
          left: 0;
          p{
            font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
            font-size: 32px;
            color:#fff;
          }
        }
        .userName{
          margin-bottom:20px;
        }
        .btn{
          @include wh(100%,50px);
          margin-top: 20px;
        }
      }
    }
  }
</style>
