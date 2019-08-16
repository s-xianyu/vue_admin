<template>
  <div :class="msg">
    <div class="menu">
      <div class="content">
        <div class="left"></div>
        <div class="right">
          <el-input class="inputMin" v-model="userLogin" size="mini" placeholder="登录名"></el-input>
          <el-select
            class="inputMin"
            v-model="lxValue"
            size="mini"
            placeholder="类型">
            <el-option
              class="inputMin"
              v-for="(item,index) in lxOption"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select
            class="inputMin"
            v-model="clValue"
            size="mini"
            placeholder="处理状态">
            <el-option
              class="inputMin"
              v-for="(item,index) in clOption"
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
    <el-container style="border: 1px solid #eee">
      <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
        <el-main>
          <el-table
            v-loading="loading"
            :data="list" @selection-change="handleSelectionChange"
            style="width: 100%"
            :height="winHeight">
            <el-table-column align="center" type="selection" fixed sortable width="55"></el-table-column>
            <el-table-column align="center" type="index" prop="index" fixed label="..." width="55"></el-table-column>
            <el-table-column align="center" prop="login_name" sortable label="登录名" width="130"></el-table-column>
            <el-table-column align="center" prop="type" sortable label="类型" width="120"></el-table-column>
            <el-table-column align="center" prop="clear_money" sortable label="清空华币数" width="120"></el-table-column>
            <el-table-column align="center" prop="dj_money" sortable label="被冻结华币数" width="150"></el-table-column>
            <el-table-column align="center" prop="create_time" sortable label="创建时间" width="170"></el-table-column>
            <el-table-column align="center" prop="available_time" sortable label="到期时间" width="170"></el-table-column>
            <el-table-column align="center" prop="state" sortable label="处理状态" width="120"></el-table-column>
            <el-table-column align="center" prop="" sortable label="图片" width="120">
              <template slot-scope="scope">
                <div class="images" @click="lookImg(scope.row.image)">
                  <img :src="scope.row.image" alt="">
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="" sortable label="图片" width="100">
              <template slot-scope="scope">
                <!--<router-link class="ygcount" tag="span" to="/">审核</router-link>-->
                <el-button size="mini" type="primary" @click="shClick(scope.row)">上传图片</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-aside>
    </el-container>
    <el-dialog title="修改" class="tl" :visible.sync="dialogFormVisible">
      <div class="content">
        <el-input placeholder="请输入内容" v-model="uploadName">
          <template slot="prepend">用户账户</template>
        </el-input>
        <div class="upload">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="3"
            :on-exceed="handleExceed"
            :before-remove="beforeRemove"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleRemove">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看大图" :visible.sync="lookImgShow">
      <div class="lookImg">
        <img :src="thisLookImg" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getTcmoneyClearlogList } from '../../config/ajax'
  import { mapMutations, mapGetters,mapState } from 'vuex'
  export default {
    data() {
      return {
        msg: 'TcmoneyClearlogGridPanel',
        loading:true,
        list:[],
        multipleSelection:[],
        userLogin:'',
        winHeight:document.documentElement.clientHeight-185+'px',
        lxValue:'',
        lxOption:[
          {name:'所有',id:' '},
          {name:'赠送华币',id:'0'},
          {name:'华币',id:'1'}
        ],
        clValue:'',
        clOption:[
          {name:'所有',id:' '},
          {name:'未处理',id:'0'},
          {name:'已处理',id:'1'},
          {name:'难搞',id:'2'},
        ],
        dialogFormVisible:false,
        uploadName:'',
        fileList:[],
        lookImgShow:false,
        thisLookImg:'',
      }
    },
    mounted(){
      this.isPagination();
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
      params () {
        return {
          'page.start':0,
          'page.limit': 30
        }
      }
    },
     methods:{
       ...mapMutations(['COMMITS_PAGE','PAGINATION_PAGE']),
       isPagination(){
         this.paginationPage === 1 ? this.getList() :  this.PAGINATION_PAGE(1)
       },
       async getList (){
         let { data } = await getTcmoneyClearlogList(this.params);
         this.list = data.root;
         this.list.map(key=>{
           key.create_time = this.$forTime('YYYY-MM-DD HH:mm:ss',key.create_time);
           key.available_time = this.$forTime('YYYY-MM-DD HH:mm:ss',key.available_time);
           key.state = key.state ? '已处理' : '未处理';
           key.type = key.type === 0 ? '赠送华币' : '华币';
           key.image = key.image ? key.image.slice(2,key.image.length-2) : '';
           // if(key.image){
           //
           //   debugger
           //   console.log(key.image.length)
           //   key.image = key.image.slice(2,key.image.length-2);
           // }
         });
         this.loading = false;
         this.COMMITS_PAGE({
           page:this.params['page.limit'],
           allPage:data.totalProperty
         })
       },
       shClick(val){
         this.uploadName = val.login_name;
          this.dialogFormVisible = true;
       },
       getSearch(){
         let params = this.params;
         this.userLogin ? params['tcmoneyClearlog.login_name'] = this.userLogin : delete params['tcmoneyClearlog.login_name'];
         this.lxValue ? params['tcmoneyClearlog.type'] = this.lxValue : delete params['tcmoneyClearlog.type'];
         this.clValue ? params['tcmoneyClearlog.state'] = this.clValue : delete params['tcmoneyClearlog.state'];
         this.getList();
       },
       delSearch(){
        [ this.userLogin, this.lxValue, this.clValue] = ['']
         delete this.params['tcmoneyClearlog.login_name'];
         delete this.params['tcmoneyClearlog.type'];
         delete this. params['tcmoneyClearlog.state'];
         this.isPagination();
       },
       handleSelectionChange(val){
         console.log(val);
       },

       // 上传
       handleRemove(file, fileList) {
         this.dialogFormVisible = false;
         console.log(file, fileList);
         this.fileList = [];
       },
       handlePreview(file) {
         console.log(file);
       },
       handleExceed(files, fileList) {
         this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
       },
       beforeRemove(file, fileList) {
         return this.$confirm(`确定移除 ${ file.name }？`);
         console.log(fileList)
         console.log(this.fileList)
       },
       // 查看大图
       lookImg(img){
         if(img){
           this.thisLookImg = img;
           this.lookImgShow = true;
         }else{
           this.$message('暂时没有图片更新~')
         }
       }
     }
  }
</script>

<style lang="scss" scoped>
@import "../../../static/style/common";
  .upload{
    margin:30px auto 0;
  }
  .images{
    @include wh(30px,30px);
    margin:0 auto;
    img{
      @include wh(100%,100%);
      cursor: pointer;
    }
  }
  .lookImg{
    @include wh(100%,100%);
    img{
      @include wh(100%,100%);
    }
  }
</style>
