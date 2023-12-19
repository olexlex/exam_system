<template>
  <div>
    <el-descriptions title="个人信息">
    <el-descriptions-item label="用户名">{{this.name}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{this.phone}}</el-descriptions-item>
    <el-descriptions-item label="年龄">{{this.age}}</el-descriptions-item>
    <el-descriptions-item label="身份">
      <el-tag size="small">管理员</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="联系地址">{{this.address}}</el-descriptions-item>
</el-descriptions>
  </div>
</template>

<script>
export default {
    data(){
        return{
            name:'',
            phone:'',
            email:'',
            address:'',
            age:''
        }
    },
    mounted(){

   this.$axios.get('/user/name/'+localStorage.username)
  .then((response) =>{
              if(response.data.errno===0){
                  let value= response.data.data
                  if(value.typeId===1){
                  this.tableData=[]
                  this.$axios.get('user/profile/'+value.id)
                  .then((response)=>{
                    if(response.data.errno===0){
                    let data=response.data.data
                    this.name=data.name,
                    this.phone=data.phone,
                    this.email=data.email,
                    this.age=data.age,
                    this.address=data.address
                    }
                  })
                  .catch((error) =>{
                     console.log(error);
                     });
                  }
                
                }
             
            })
            .catch((error) =>{
            
             console.log(error)
            });
  },
    }


</script>

<style>

</style>