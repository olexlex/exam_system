<template>
  <header id="topbar">
    <el-row>
      <el-col :span="4" class="topbar-left">
        <span>在线考试系统B/S</span>
      </el-col>
      <el-col  class="topbar-right">
        <el-dropdown @command="handleCommand">
        <div class="user">
          <span >{{this.user.username}}</span>
          
        </div>

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="showInfo" >个人信息</el-dropdown-item>
                <el-dropdown-item command="logout" divided >退出登录</el-dropdown-item>
           
            </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
data() {
  return {
    user:{
      username:'',
      userID: '',
      password:''
    }
  }
},
mounted(){
  this.user.username=localStorage.username
  this.user.password=localStorage.password
},
computed:{
  username(){
    return  this.$store.state.username
  }
},
methods: {
  // showInfo(){

  // },
  // logout(){
  //   localStorage.username=''
  //   localStorage.password=''
  //   this.$router.push('/login')
  // }
   handleCommand(command){
    console.log(command)
    if(command==="showInfo"){
      this.$router.push('/personal')
    }
    else if(command==="logout"){
      this.$axios.post('/auth/logout')
      .then((response)=>{
        console.log(response)
        if(response.data.errno===0)
        {
          this.$router.push('/login')
          localStorage.token=''
        }
      })
      .catch((error)=>{
        console.log(error)
      })
    }
   }
},
}
</script>

<style>
#topbar{
  position: relative;
  z-index: 10;
  background-color: #1669dd;
  height: 80px;
  line-height: 80px;
  color: #fff;
  box-shadow: 5px 0px 10px rgba(7, 231, 231, 0.5);
  border:2px solid;
  border-radius:25px;
  background-image: linear-gradient(to right,#1669dd,rgba(7, 231, 231, 0.5));
}
#topbar .topbar-left {
  height: 80px;
  display: flex;
  justify-content: center;
  /* background: rgba(0, 0, 0, 0.05); */
  overflow: hidden;
}
.topbar-left  {
  font-size: 20px;
  cursor: pointer;
}
.topbar-right {
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 30px;
  margin-top: 15px;
  margin-left: 70%;
  cursor: pointer;
}

.user{
  font-size: 30px;
  color: #fff;
}
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
</style>