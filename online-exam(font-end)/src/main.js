import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _axios from './axios/axios.js'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.prototype.$axios = _axios
Vue.prototype.dayjs = require('dayjs')

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  beforeCreate () {
    Vue.prototype.$bus = this
  }
})
