<template>
  <div class="main">
    <el-container>
      <el-aside width="250px"> <Left/></el-aside>
      <el-container>
        <el-header>
          <Header/>
        </el-header>
        <el-main>
          <!--<keep-alive>-->
            <router-view></router-view>
          <!--</keep-alive>-->
        </el-main>
        <el-footer>
          <Footer/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Left from '../components/left/left'
  import Header from '../components/header/header'
  import Footer from '../components/footer/footer'
  export default {
    data() {
      return {
        msg: 'index',
      }
    },
    components:{
      Header,
      Left,
      Footer
    },
  }
</script>

<style lang="scss" scoped>
  .main{
    min-width: 1200px;
  }
  .el-header,
  .el-main{
    padding:0;
  }
</style>
