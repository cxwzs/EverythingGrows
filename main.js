import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import emptyView from '@/components/emptyView/emptyView.vue'
import store from './store/index.js'
import { LoginIF } from '@/common/if_login.js'
import updateUserState from '@/common/updateUserState.js'
import WX_pay from '@/common/WX_pay.js'

Vue.component('EmptyView',emptyView)

Vue.use(uView)

Vue.prototype.$store = store

Vue.prototype.$LoginIF = LoginIF

Vue.prototype.$updateFUNC = updateUserState.updateFUNC

Vue.prototype.$WXPAY = WX_pay.WXPAY

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
