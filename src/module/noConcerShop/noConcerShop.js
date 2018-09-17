import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
Vue.use(VueRouter)
const routes = [{
  path: '/',
  component: function (resolve) {
    require(['../../components/noConcerShop.vue'], resolve)
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