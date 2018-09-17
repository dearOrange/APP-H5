import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Toast from '../../config/base/test1.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'	
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Toast);
const routes = [{
  path: '/',
  component: function (resolve) {
    require(['../../components/aboutUs.vue'], resolve)
  }
}]
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')