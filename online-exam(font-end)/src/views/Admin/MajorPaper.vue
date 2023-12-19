<template>
  <!-- "judgementNum": 0,
  "multipleSelectionNum": 0,
  "name": "string",
  "shortAnswerNum": 0,
  "singleSelectionNum": 0 -->
  <div >
    <el-row :gutter="20">
    <el-col :span="6">
      <el-input v-model="majorInfo.name" placeholder="请输入专业名称"></el-input>
    </el-col>
    <el-col :span="4">      
      <el-input v-model="majorInfo.singleSelectionNum" placeholder="请输入单选题数量"></el-input>
   </el-col>
    <el-col :span="4">
      <el-input v-model="majorInfo.multipleSelectionNum" placeholder="请输入多选题数量"></el-input>
    </el-col>

    <el-col :span="4">
      <el-input v-model="majorInfo.judgementNum" placeholder="请输入判断题数量"></el-input>
    </el-col>
     <el-col :span="4">
      <el-input v-model="majorInfo.shortAnswerNum" placeholder="请输入简答题数量"></el-input>
    </el-col>
  </el-row>
  <el-row>
    <el-button type="primary" round class='add_btn' @click="add_major">增加专业</el-button>
    <el-button type="success" round class='search_btn' @click="search_major">查找专业</el-button>
          <el-button type="info" round @click="reset">重置</el-button>
  </el-row>

     <el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
    stripe
    style="width: 100%">
    <el-table-column
      prop="index"
      label="序号"
      >
      <template slot-scope="scope">
        {{scope.$index+1}}
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="专业名称"
      >
    </el-table-column>
    <el-table-column
      prop="singleSelectionNum"
      label="单选题数量"
     >
    </el-table-column>
    <el-table-column
      prop="multipleSelectionNum"
      label="多选题数量"
     >
    </el-table-column>
    <el-table-column
      prop="judgementNum"
      label="判断题数量">
    </el-table-column>
    <el-table-column
      prop="shortAnswerNum"
      label="简答题数量">
    </el-table-column>
    <el-table-column
      prop="operations"
      label="操作" >
      <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-edit" circle @click='modify_major(scope.row,scope.$index)'></el-button>
        <el-button type="danger" icon="el-icon-delete" circle  @click='delete_major(scope.$index)'></el-button>
      </template>
    </el-table-column>
  </el-table>
    <!-- 对话框 -->
      <el-dialog
      title="编辑信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <div style="margin: 20px;"></div>
        <el-form  label-width="90px" :model="editform">
          <el-form-item label="专业名称">
            <el-input v-model="editform.name"></el-input>
          </el-form-item>
          <el-form-item label="单选题数量">
            <el-input v-model="editform.singleSelectionNum"></el-input>
          </el-form-item>
          <el-form-item label="多选题数量">
            <el-input v-model="editform.multipleSelectionNum"></el-input>
          </el-form-item>
          <el-form-item label="判断题数量">
            <el-input v-model="editform.judgementNum"></el-input>
          </el-form-item>
          <el-form-item label="简答题数量">
            <el-input v-model="editform.shortAnswerNum"></el-input>
          </el-form-item>
         </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
     <div class="pagination">
            <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="currentPage" 
                :page-sizes="[5, 10, 20, 40]" 
                :page-size="pagesize" 
                layout="total, sizes,prev, pager, next" 
                :total="tableData.length" 
                prev-text="上一页" 
                next-text="下一页">
            </el-pagination>
        </div>
  </div>

  
</template>

<script>
import Vue from 'vue'
export default {
inject:['reload'],
data() {
  return {
    UserIndex:0,
    dialogVisible : false,
    majorInfo:{
      name:'',
      singleSelectionNum:'',
      multipleSelectionNum:'',
      judgementNum:'',
      shortAnswerNum:''

    },
     tableData: [],
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
    editform:{
      name:'',
      singleSelectionNum:0,
      multipleSelectionNum:0,
      judgementNum:0,
      shortAnswerNum:0
    }
  }
},
mounted(){
  this.reset()
},
methods: {
  reset(){
  this.tableData=[]  
  // this.handleSizeChange()
  this.handleCurrentChange(1)
  this.$axios.get('/major/list')
  .then((response) =>{
              if(response.data.errno===0){
                for(let i=0;i< response.data.data.length;i++)
                {
                  let value= response.data.data[i]
                  this.tableData.push(value)
                }
              }
            })
            .catch((error) =>{
              console.log(error);
            });
  },
  add_major(){
    if(!this.majorInfo.name)
    {
      this.$message({
        message:'请输入专业名称',
        type:'warning'
      })
      return;
    }
    if(!this.majorInfo.singleSelectionNum)
    {
      this.$message({
        message:'请输入单选题数量',
        type:'warning'
      })
      return;
    }
    if(!this.majorInfo.multipleSelectionNum)
    {
      this.$message({
        message:'请输入多选题数量',
        type:'warning'
      })
      return;
    }
    if(!this.majorInfo.judgementNum)
    {
      this.$message({
        message:'请输入判断题数量',
        type:'warning'
      })
      return;
    }
    if(!this.majorInfo.shortAnswerNum)
    {
      this.$message({
        message:'请输入简答题数量',
        type:'warning'
      })
      return;
    }
    if(!/^\d{1,}$/.test(this.majorInfo.singleSelectionNum)||
    !/^\d{1,}$/.test(this.majorInfo.multipleSelectionNum)||
    !/^\d{1,}$/.test(this.majorInfo.judgementNum)||
    !/^\d{1,}$/.test(this.majorInfo.shortAnswerNum))
    {
      this.$message({
        message:'请输入正确的题目数量',
        type:'warning'
      })
      return;
    }
    this.$axios.post('/major',{
     name:this.majorInfo.name,
     singleSelectionNum:this.majorInfo.singleSelectionNum,
     multipleSelectionNum:this.majorInfo.multipleSelectionNum,
     judgementNum:this.majorInfo.judgementNum,
     shortAnswerNum:this.majorInfo.shortAnswerNum
    })
    .then((response) =>{
              if(response.data.errno===0){
              this.tableData.push(this.majorInfo);
              this.majorInfo={
                name:'',
                singleSelectionNum:'',
                multipleSelectionNum:'',
                judgementNum:'',
                shortAnswerNum:''
              }
                 this.$message({
                  showClose: true,
                  type: 'success',
                  message: '添加成功！'
                })
                this.reload()
              }
              else
              {
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '添加失败!'
                })
              }
            })
            .catch(function (error) {
              console.log(error);
            });
   


  },
  modify_major(item,idx){
    this.UserIndex=idx+this.pagesize*(this.currentPage-1)
    this.editform={
      name:item.name,
      singleSelectionNum:item.singleSelectionNum,
      multipleSelectionNum:item.multipleSelectionNum,
      judgementNum:item.judgementNum,
      shortAnswerNum:item.shortAnswerNum
    }
      this.dialogVisible=true
  },
  handleClose(){
    this.dialogVisible=false;
  },
  confirm(){
    this.dialogVisible=false;
    if(!/^\d{1,}$/.test(this.editform.singleSelectionNum)||
    !/^\d{1,}$/.test(this.editform.multipleSelectionNum)||
    !/^\d{1,}$/.test(this.editform.judgementNum)||
    !/^\d{1,}$/.test(this.editform.shortAnswerNum))
    {
      this.$message({
        message:'请输入正确的题目数量',
        type:'warning'
      })
      return;
    }
    this.$axios.put('/major/'+this.tableData[this.UserIndex].id,{
     id:this.tableData[this.UserIndex].id,
     name:this.editform.name,
     singleSelectionNum:parseInt(this.editform.singleSelectionNum) ,
     multipleSelectionNum:parseInt(this.editform.multipleSelectionNum),
     judgementNum:parseInt(this.editform.judgementNum),
     shortAnswerNum:parseInt(this.editform.shortAnswerNum)
    })
    .then((response) =>{
              if(response.data.errno===0){
                 this.$message({
                  showClose: true,
                  type: 'success',
                  message: '修改成功！'
                })
                   this.reload()
              }
              else
              {
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '修改失败!'
                })
              }
            })
            .catch(function (error) {
              console.log(error);
            });

    Vue.set(this.tableData,this.UserIndex,this.editform)
  },
  delete_major(idx){
    this.$confirm('确认删除?').then(
      _=>{
    console.log(idx+this.pagesize*(this.currentPage-1))
    this.$axios.delete('/major/'+this.tableData[idx+this.pagesize*(this.currentPage-1)].id)
    .then((response) =>{
              if(response.data.errno===0){
                this.tableData.splice(idx,1)
                 this.$message({
                  showClose: true,
                  type: 'success',
                  message: '删除成功！'
                })
                   this.reload()
              }
              else
              {
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '删除失败!'
                })
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    ).catch(_=>{});
    
  },
  search_major(){
  if(!this.majorInfo.name)
    {
      this.$message({
        message:'请输入专业名称',
        type:'warning'
      })
      return;
    }
   this.$axios.get('/major/name/'+this.majorInfo.name)
  .then((response) =>{
              if(response.data.errno===0){
                this.tableData=[]
                for(let i=0;i< response.data.data.length;i++)
                {
                  let value= response.data.data[i]
                  this.tableData.push(value)
                }
              }
            })
            .catch((error) =>{
              console.log(error);
            });
  },
   handleSizeChange(size) {
  this.pagesize = size;
  },
  handleCurrentChange(currentPage) {
  this.currentPage = currentPage;
  },
}
}
</script>

<style scoped>
 .el-row {
    margin-bottom: 20px;
  } 
   .el-col {
    border-radius: 4px;
  }
  .add_btn{
    margin-left: -80px;
    margin-top: 10px;
    width: 40%;
  }
.search_btn{
  width: 40%;
}
.pagination{
  margin-left: -150px;
}
</style>