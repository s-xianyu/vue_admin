<template>
  <div :class="msg">
    <div class="content">
      <el-input class="mar10" disabled v-model="money.clear_money">
        <template slot="prepend">已处理金额:</template>
      </el-input>
      <el-input class="mar10" disabled v-model="money.clear_hb">
        <template slot="prepend">已处理华币:</template>
      </el-input>
    </div>
  </div>
</template>

<script>
  import { getMoney } from '../../config/ajax'
  export default {
    data() {
      return {
        msg: 'CaiwuConfirmMoneyFormPanel',
        money:{},
      }
    },
    mounted(){
      this.getList();
    },
    methods:{
      async getList(){
        let params = {
          _dc: new Date().getTime(),
        };
        let { data } = await getMoney(params);
        this.money = data;
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../../static/style/common";
  .content{
    @include wh(500px,auto);
    margin:200px auto 0;
  }
</style>
