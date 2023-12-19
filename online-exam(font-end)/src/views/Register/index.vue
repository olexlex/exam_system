登录界面
<!-- 用户登录界面 -->
<template>
  <div id="login">
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :md="10" :span="10">
        <div class="top">
          <h1 class="title">在线考试系统B/S</h1>
        </div>
          <div class="container">
            <div class="hello">
              <h2>欢迎注册</h2>
            </div>
              <el-input class="input" v-model="item.username" placeholder="请输入用户名"></el-input>
              <el-input class="input" placeholder="请输入密码" v-model="item.password" show-password></el-input>
              <el-input class="input" placeholder="请输入确认密码" v-model="item.password2" show-password></el-input>
              <el-button class="input" type="primary" @click="register">注册并登录</el-button><br>
          </div>
      </el-col>
    </el-row>
    <el-row class="footer">
      <el-col>
        <p class="msg2">版权所有 ©2022 8组 保留所有权利</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name: 'register',
  data () {
    return {
      item: {
        username: '',
        password: '',
        password2:'',
        userID:'',
        usertype:''
      }
    }
  },
  methods: {
      register () {
      const that=this
      console.log('logging..')
      if (!that.item.username) {
        this.$message.error('请输入用户名!')
      } else if (!that.item.password) {
        this.$message.error('请输入密码!')
      } else if (!that.item.password2) {
        this.$message.error('请输入确认密码!')
      } else if (that.item.password !== that.item.password2) {
        this.$message.error('两次密码必须一致!')
      } else {
        const that=this
         this.$axios.post('/user/user',{
          name:this.item.username,
          password:this.item.password,
          typeId:'2'
         })
            .then((response)=>{
              console.log(response)
              if(response.data.errno===0){
               this.$axios.post('/auth/login?name='+this.item.username+'&password='+this.item.password)
            .then(function (response) {
              if(response.data.errno===0){
              store.commit('setToken',JSON.stringify(response.data.data.token).substring(1,JSON.stringify(response.data.data.token).length-1))
              store.commit('setUsername',that.item.username)
              store.commit('setPassword',that.item.password)
              store.commit('setUserID',response.data.data.id)
              store.commit('setUserType',response.data.data.type)
              that.item.userID=response.data.data.id
              that.item.usertype=response.data.data.type
              console.log('success')
              if(response.data.data.type===1)
                that.$router.push('/admin')
              else if(response.data.data.type===2)
                that.$router.push('/student')
              }
              else
              {
                that.$message({
                  showClose: true,
                  type: 'error',
                  message: '用户名或密码错误'
                })
              }
            })
            .catch(function (error) {
              console.log(error);
            });
              }
              else if(response.data.errno===600)
              {
                that.$message({
                  showClose: true,
                  type: 'error',
                  message: '用户名已经存在'
                })
              }
              
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    },
  }
}
</script>
/*
<style  scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  background: url("./images/bg.jpg") center top / cover no-repeat;
  z-index: -1;
}
.main-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  margin: auto;
  /* width: 500px; */
  height: 350px; 
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* border:2px solid; */
  border-radius:10px;
}

.input{
  width: 300px;
  height: 40px;
  margin-top: 20px;
}
.register{
  margin-top: 20px;
}

</style>
