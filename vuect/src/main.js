import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from "./mixins/index"

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

const toastOptions = {
	position: "top-center",
	timeout: 2500,
	closeOnClick: true,
	pauseOnFocusLoss: false,
	pauseOnHover: false,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: true,
	hideProgressBar: true,
	closeButton: "button",
	icon: true,
	rtl: false,

	transition: "Vue-Toastification__fade",
	maxToasts: 6,
	newestOnTop: true
}
Vue.use(Toast, toastOptions);

Vue.config.productionTip = false

Vue.mixin({
	methods: {
		handleError: mixins.handleError
	}
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

