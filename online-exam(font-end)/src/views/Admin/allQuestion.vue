<template>
  <!-- "judgementNum": 0,
  "multipleSelectionNum": 0,
  "name": "string",
  "shortAnswerNum": 0,
  "singleSelectionNum": 0 -->
  <div >
    <el-row :gutter="10" class="row">
    <el-col :span="6">
      <el-input v-model="input_major" placeholder="请输入专业名称"></el-input>
    </el-col>
    <el-col :span="10">      
  <el-select v-model="value" placeholder="所有题型">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
       <el-button type="success" round  @click="search_manager">查找题库</el-button>
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
      prop="description"
      label="题目描述"
      >
    </el-table-column>
    <el-table-column
      prop="major"
      label="所属专业"
     >
    </el-table-column>
    <el-table-column
      prop="type"
      label="题目类别"
     >
    </el-table-column>
  
    <el-table-column
      prop="operations"
      label="操作" >
      <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-edit" circle @click='modify_manager(scope.row,scope.$index)'></el-button>
        <el-button type="danger" icon="el-icon-delete" circle  @click='delete_manager(scope.$index)'></el-button>
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
          <el-form-item label="题目描述">
            <el-input v-model="editform.description"></el-input>
          </el-form-item>
          <el-form-item label="所属专业">
            <el-input v-model="editform.major"></el-input>
          </el-form-item>
          <el-form-item label="题目类别">
            <el-input v-model="editform.type"></el-input>
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
import store from '@/store'
import Vue from 'vue'
export default {
inject:['reload'],
data() {
  return {
    options: [{
          value: '1',
          label: '所有题型'
        }, {
          value: '2',
          label: '单选题'
        }, {
          value: '3',
          label: '多选题'
        }, {
          value: '4',
          label: '判断题'
        }, {
          value: '5',
          label: '简答题'
        }],
        value: '1',
     input_major:'',
    UserIndex:0,
    dialogVisible : false,
    ManagerInfo:{
      description:'',
      major:'',
      type:''

    },
     tableData: [],
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
    editform:{
        description:'',
      major:'',
      type:''
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
  this.$axios.get('/quest/list')
  .then((response) =>{
              if(response.data.errno===0){
                console.log(response)
                for(let i=0;i< response.data.data.length;i++)
                {
                  let value= response.data.data[i]
                  let typeName=''
                  this.$axios.get('/major/'+value.majorId)
                  .then((res)=>{
                    if(res.data.errno===0)
                    {
                        this.ManagerInfo.major=res.data.data.name
                            switch (value.typeId) {
                        case 1:
                            typeName='单选题'
                            break;
                        case 2:
                            typeName='多选题'
                            break;
                        case 3:
                            typeName='判断题'
                            break;
                        case 4:
                            typeName='简答题'
                            break;
                        default:
                            break;
                    }
                    console.log(this.ManagerInfo.major)
                    this.tableData.push({
                        id:value.id,
                        description:value.description,
                        major:this.ManagerInfo.major,
                        type:typeName

                  })
                    }

                  })
                  .catch((error) =>{
                    console.log(error);
                    });
                 
                }
              }
            })
            .catch((error) =>{
              console.log(error);
            });
  },
  modify_manager(item,idx){
    this.UserIndex=idx+this.pagesize*(this.currentPage-1)
    // this.editform={
    //   description:item.description,
    //   major:item.major,
    //   type:item.type
    // }
    //   this.dialogVisible=true
    this.$axios.get('/quest/'+item.id)
    .then((response)=>{
      console.log(response)
      if(response.data.errno===0)
      {
        store.commit('setQuestion',response.data.data)
        this.$router.push('/modifyQuestion')
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  },
  handleClose(){
    this.dialogVisible=false;
  },
  confirm(){
   

    Vue.set(this.tableData,this.UserIndex,this.editform)
  },

  search_manager(){
    this.tableData=[]  
  // this.handleSizeChange()
  this.handleCurrentChange(1)
  this.$axios.get('/quest/list')
  .then((response) =>{
              if(response.data.errno===0){
                console.log(response)
                for(let i=0;i< response.data.data.length;i++)
                {
                  let value= response.data.data[i]
                  let typeName=''
                        switch (value.typeId) {
                        case 1:
                            typeName='单选题'
                            break;
                        case 2:
                            typeName='多选题'
                            break;
                        case 3:
                            typeName='判断题'
                            break;
                        case 4:
                            typeName='简答题'
                            break;
                        default:
                            break;
                    }
                    if((this.input_major===value.majorName||this.input_major==='')
                    &&(value.typeId+1===parseInt(this.value)||this.value==='1'))
                    this.tableData.push({
                        id:value.id,
                        description:value.description,
                        major:value.majorName,
                        type:typeName

                  })
                    }
               
              }
            })
            .catch((error) =>{
              console.log(error);
            });
  },
    delete_manager(idx){
this.$confirm('确认删除?').then(
      _=>{
    console.log(idx)
    console.log(this.tableData[idx+this.pagesize*(this.currentPage-1)].id)
    this.$axios.delete('/quest/'+this.tableData[idx+this.pagesize*(this.currentPage-1)].id)
    .then((response) =>{
              console.log(response)
              if(response.data.errno===0){
                this.tableData.splice(idx,1)
                 this.$message({
                  showClose: true,
                  type: 'success',
                  message: '删除成功！'
                })
                   this.reload()
              }
              else if(response.data.errno===800)
              {
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '删除失败，题目已被现有的试卷包含！'
                })
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    ).catch(_=>{});
    
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