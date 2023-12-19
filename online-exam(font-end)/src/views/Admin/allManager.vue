<template>
  <!-- "judgementNum": 0,
  "multipleSelectionNum": 0,
  "name": "string",
  "shortAnswerNum": 0,
  "singleSelectionNum": 0 -->
  <div >
    <el-row :gutter="20" class="row">
    <el-col :span="6">
      <el-input v-model="ManagerInfo.name" placeholder="请输入管理员账号"></el-input>
    </el-col>
    <el-col :span="16">      
       <el-button type="success" round class='search_btn' @click="search_manager">查找管理员</el-button>
          <el-button type="info" round @click="reset">重置</el-button>
   </el-col>

   
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
      label="管理员名称"
      >
    </el-table-column>
    <el-table-column
      prop="age"
      label="管理员年龄"
     >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="管理员电话"
     >
    </el-table-column>
    <el-table-column
      prop="email"
      label="管理员邮箱">
    </el-table-column>
    <el-table-column
      prop="address"
      label="管理员地址">
    </el-table-column>
    <el-table-column
      prop="operations"
      label="操作" >
      <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-edit" circle @click='modify_manager(scope.row,scope.$index)'></el-button>
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
          <el-form-item label="管理员名称">
            <el-input v-model="editform.name"></el-input>
          </el-form-item>
          <el-form-item label="管理员年龄">
            <el-input v-model="editform.age"></el-input>
          </el-form-item>
          <el-form-item label="管理员电话">
            <el-input v-model="editform.phone"></el-input>
          </el-form-item>
          <el-form-item label="管理员邮箱">
            <el-input v-model="editform.email"></el-input>
          </el-form-item>
          <el-form-item label="管理员地址">
            <el-input v-model="editform.address"></el-input>
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
    ManagerInfo:{
      name:'',
      phone:'',
      email:'',
      address:'',
      age:''

    },
     tableData: [],
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
    editform:{
       name:'',
      phone:'',
      email:'',
      address:'',
      age:''
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
  this.$axios.get('/user/profile/list')
  .then((response) =>{
              if(response.data.errno===0){
                console.log(response)
                for(let i=0;i< response.data.data.length;i++)
                {
                  let value= response.data.data[i]
                  if(value.typeId===1)
                  this.tableData.push(value)
                }
              }
            })
            .catch((error) =>{
              console.log(error);
            });
  },
  modify_manager(item,idx){
    this.UserIndex=idx+this.pagesize*(this.currentPage-1)
    this.editform={
      name:item.name,
      phone:item.phone,
      email:item.email,
      age:item.age,
      address:item.address
    }
      this.dialogVisible=true
  },
  handleClose(){
    this.dialogVisible=false;
  },
  confirm(){
    // this.dialogVisible=false;
    // if(!/^\d{1,}$/.test(this.editform.singleSelectionNum)||
    // !/^\d{1,}$/.test(this.editform.multipleSelectionNum)||
    // !/^\d{1,}$/.test(this.editform.judgementNum)||
    // !/^\d{1,}$/.test(this.editform.shortAnswerNum))
    // {
    //   this.$message({
    //     message:'请输入正确的题目数量',
    //     type:'warning'
    //   })
    //   return;
    // }
    this.$axios.put('/user/profile/'+this.tableData[this.UserIndex].userId,{
     userId:this.tableData[this.UserIndex].userId,
     name:this.editform.name,
     phone:this.editform.phone,
     email:this.editform.email,
     address:this.editform.address,
     age:this.editform.age,
     typeId:1
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

  search_manager(){
  if(!this.ManagerInfo.name)
    {
      this.$message({
        message:'请输入管理员账号',
        type:'warning'
      })
      return;
    }
   this.$axios.get('/user/name/'+this.ManagerInfo.name)
  .then((response) =>{
              if(response.data.errno===0){
                  let value= response.data.data
                  if(value.typeId===1){
                  this.tableData=[]
                  this.$axios.get('user/profile/'+value.id)
                  .then((response)=>{
                    if(response.data.errno===0){
                    this.tableData.push(response.data.data)
                    this.$message({
                    message:'查找成功!',
                    type:'success'})
                    }
                  })
                  .catch((error) =>{
                     console.log(error);
                     });
                  }
                  else
                  {
                    this.$message({
                    message:'不存在此管理员账号!',
                    type:'warning'
                })
                  }
                }
               else
               {
                  this.$message({
                    message:'不存在此管理员账号!',
                    type:'warning'
                })
               }
            })
            .catch((error) =>{
             this.$message({
                    message:'不存在此管理员账号!',
                    type:'warning'
                })
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
  width: 20%;
  margin-left: -500px;
}
.pagination{
  margin-left: -150px;
}
.row{
    width: 1100px;
}
</style>