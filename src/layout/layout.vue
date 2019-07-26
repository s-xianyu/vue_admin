<template>
 <div class="main">
   <el-row>
     <el-col :span="6">
       <div class="grid-content bg-purple">
         <Left/>
       </div>
     </el-col>
     <el-col :span="18">
       <div class="grid-content bg-purple-light"><Right/></div>
     </el-col>
   </el-row>
 </div>
</template>

<script>
  import Left from '../components/left/left'
  import Right from '../components/right/right'
  export default {
    data() {
      return {
        msg: 'layout'
      }
    },
    components:{
      Left,
      Right
    }
  }
</script>

<style scoped>
.main{
  min-width: 1200px;
}
</style>
