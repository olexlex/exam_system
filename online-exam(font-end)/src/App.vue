<template>
  <div id="app">
    <router-view v-if="isShow"/>
  </div>
</template>

<script>
import login from './views/Login'
export default {
  components: {login},
  name: 'App',
   provide () {
    return {
      reload: this.reload
    }
  },
   data () {
    return {
      isShow: true
    }
  },
  methods: {
    reload () {
      this.isShow= false
      this.$nextTick(function () {
        this.isShow= true
      })
    }
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: "Microsoft YaHei", "Helvetica", "Tahoma", "Geneva", "Arial", sans-serif;
    /* background-color: #eee; */
  /* margin-top: 60px; */
}
/* h1{
  background-color: skyblue;
  transition: 0.5s linear;
} */
</style>
