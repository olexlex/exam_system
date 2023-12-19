<template>
  <div id="leftlist">
       <el-aside>
        <el-menu 
        class="el-menu-vertical-demo"
        :default-active="this.$route.path"
        menu-trigger="click" 
        router>
          <el-submenu v-for="(item,index) in menu" :index='item.index' :key="index" >
             <template slot="title">
              <div class="left-width" >
                <span slot="title" class="title">{{item.title}}</span>
              </div>
            </template>
            <el-menu-item-group v-for="(list,index1) in item.content" :key="index1" class="submenu">
                <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item1 != null">{{list.item1}}</el-menu-item>
                <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item2 != null">{{list.item2}}</el-menu-item>
                <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item3 != null">{{list.item3}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
       </el-aside>
  </div>
</template>

<script>
import store from '@/store'
import {mapState} from 'vuex'
export default {
  name:'leftlist',
  data() {
    return {
      
    }
  },
  computed:mapState(["menu"]),
  created()
  {

  },
  methods:{
    handleTitle(index){
      this.$bus.$emit('sendindex',index)
    }
  },
  store
}
</script>

<style>
.el-menu-vertical-demo {
  box-shadow: 10px 10px 5px #888888;
  overflow: hidden;
}
.title{
   font-weight:bold;
}


#leftlist .el-menu-vertical-demo .title {
  color: rgb(19, 174, 236);
  font-size: 16px;
  font-weight: bold;
  margin-left: auto;
}

.submenu{
  margin-left: 40px;
}


</style>