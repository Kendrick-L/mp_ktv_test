import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from '@/App'
import store from '@/store'
import Fly from '@/api/fly'
import Api from '@/api/api'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
Vue.prototype.$fly = Fly;
Vue.prototype.$api = Api;
const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()
