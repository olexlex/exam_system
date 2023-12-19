<template>
  <div id="nav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="title">{{active.title}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="active.item1 != null">{{active.item1}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="active.item2 != null">{{active.item2}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="active.item3 != null">{{active.item3}}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view class="router_view"></router-view>
  </div>
</template>

<script>
import store from '@/store'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      active: [],
      index1: null,
    }
  },
  computed: mapState(["menu"]),
  methods: {
    getIndex() {
      this.$bus.$on('sendindex',(data)=>{
        this.index1 = data
        this.active = this.menu[data-1]
        // console.log(JSON.stringify(this.active)+'----')
      })
    }
  },
  created() {
    // this.getIndex()
  },
  mounted() {
    // this.getIndex()
  },
  beforeDestroy() {
    // this.bus.$off('sendindex') //销毁
  },
  store
}
</script>

<style scoped>
.el-breadcrumb {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
}
.el-breadcrumb {
  font-weight: bold;
}
.router_view{
  margin-left: 20px;
}
</style>
